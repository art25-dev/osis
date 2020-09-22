<template>
  <div class="create-container">
    <el-breadcrumb separator="/" class="mb">
      <el-breadcrumb-item to="/admin/navigation/">Навигация</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <h2>Создать пункт меню</h2>
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
      class="navigation-form"
      enctype="multipart/form-data"
    >
      <div class="form-row">
        <el-form-item prop="title">
          <el-input
            placeholder="Название"
            v-model="controls.title"
            maxlength="60"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            prop="parent"
            v-model="controls.parent"
            clearable
            placeholder="Родительское меню (по умолчанию - Главное меню)"
          >
            <el-option
              v-for="item in this.select"
              :key="item.value"
              :label="item.title"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="controls.typeLink"
            clearable
            placeholder="Тип пункта меню (по умолчанию - Ссылка)"
          >
            <el-option label="Ссылка" value="link"></el-option>
            <el-option label="Pdf-файл" value="pdf"></el-option>
          </el-select>
        </el-form-item>
        <div class="controls">
          <el-form-item>
            <el-button type="warning" @click="clearForm">Очистить</el-button>
            <el-button type="primary" native-type="submit" :loading="loading"
              >Создать</el-button
            >
          </el-form-item>
        </div>
      </div>
      <div class="form-row">
        <el-form-item>
          <transition name="fade" mode="out-in">
            <el-upload
              v-if="controls.typeLink === 'pdf'"
              class="avatar-uploader"
              drag
              action="http://localhost:3000/admin"
              :on-change="fileUpload"
              :auto-upload="false"
              :limit="1"
              :show-file-list="true"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                Перенесите файл .pdf
                <em>или нажмите</em>
              </div>
            </el-upload>
          </transition>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
const cyrillicToTranslit = require("cyrillic-to-translit-js");
export default {
  layout: "admin",
  head: {
    title: "OSIS"
  },
  middleware: ["adminAuth"],
  data() {
    return {
      loading: false,
      select: [],
      controls: {
        title: "",
        parent: null,
        typeLink: null,
        file: null
      },
      rules: {
        title: [
          {
            required: true,
            message: "Название не должно быть пустым",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.select = this.$route.params.navigation
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;

          // Формирование объекта для отправки в store
          const formData = {
            _id: cyrillicToTranslit()
              .transform(this.controls.title.trim(), "_")
              .toLowerCase(),
            title: this.firstLetter(this.controls.title).trim(),
            parent: this.controls.parent,
            typeLink: this.controls.typeLink,
            file: this.controls.file
          };

          // Отправка объекта с данными формы в store/navigation.js и вызов Action create()
          try {
            await this.$store.dispatch("navigation/create", formData);
          } catch (e) {
          } finally {
            this.$message.success("Пункт меню создан");
            this.clearForm();
            this.$route.params.navigation.push(formData);
            this.select = this.sortArray(this.$route.params.navigation)
          }
        } else {
          this.$message.warning("Форма не валидна");
        }
      });
    },
    fileUpload(file) {
      this.controls.file = file.raw;
    },
    clearForm() {
      this.controls.title = "";
      this.controls.parent = null;
      this.controls.typeLink = null;
      this.controls.file = null;
      this.loading = false;
    },
    firstLetter(str) {
      if (!str) {
        return str;
      }
      return str[0].toUpperCase() + str.slice(1);
    },
    sortArray(arr) {
      return arr.sort((a, b) => (a.title > b.title ? 1 : -1));
    },
  }
};
</script>

<style lang="scss" scoped>
.create-container {
  display: block;
  min-height: 100%;
}

.navigation-form {
  position: relative;
  display: grid;
  grid-template-columns: 53% 47%;
}

.form-row {
  margin-right: 2rem;
  position: relative;

  &:last-child {
    margin-right: 0;
    padding-right: 0;
  }
}

.controls {
  display: flex;
  justify-content: flex-end;

  .el-form-item {
    margin-bottom: 0;
  }
}

h2 {
  display: inline-block;
  padding-bottom: 0.3rem;
  margin-bottom: 1rem;
  color: $color-primary;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 5px;
    background: $color-danger;
    display: block;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
