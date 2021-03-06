<template>
  <div class="create-container">
    <el-breadcrumb separator="/" class="mb">
      <el-breadcrumb-item to="/admin/navigation/">Навигация</el-breadcrumb-item>
      <el-breadcrumb-item
        >Пункт навигации ID-{{ navigation._id }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <h2>Редактор пункта меню</h2>
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
              v-for="item in this.$route.params.navigation"
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
              >Обновить</el-button
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
export default {
  layout: "admin",
  head: {
    title: "OSIS"
  },
  middleware: ["adminAuth"],
  data() {
    return {
      navigation: this.$store.getters["navigation/getNavigationId"](this.$route.params.id),
      loading: false,
      controls: {
        title: "",
        parent: null,
        typeLink: null,
        currentFile: null,
        newFile: null
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
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;

          // Формирование объекта для отправки в store
          const formData = {
            id: this.navigation._id,
            title: this.$options.filters.firstLetter(this.controls.title).trim(),
            parent: this.controls.parent === null ? null : this.controls.parent,
            typeLink: this.controls.typeLink,
            oldFile: this.controls.currentFile,
            newFile: this.controls.newFile
          };
          
          // Отправка объекта с данными формы в store/navigation.js и вызов Action update()
          try {
            await this.$store.dispatch("navigation/update", formData);
          } catch (e) {
          } finally {
            this.$message.success("Изменения сохранены");
            this.loading = false;
          }
        } else {
          this.$message.warning("Форма не валидна");
        }
      });
    },
    fileUpload(file) {
      this.controls.newFile = file.raw;
    },
    // Очистка данных формы
    clearForm() {
      this.controls.title = "";
      this.controls.parent = null;
      this.loading = false;
      this.controls.currentFile = null;
      this.controls.newFile = null;
    }
  },
  mounted() {
    // Подгрузка данных объявления в поля формы
    this.controls.title = this.navigation.title;
    this.controls.parent = this.navigation.parent;
    this.controls.typeLink = this.navigation.typeLink;
    this.controls.currentFile = this.navigation.pathFile;
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
</style>
