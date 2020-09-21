<template>
  <div class="create-container">
    <el-breadcrumb separator="/" class="mb">
      <el-breadcrumb-item to="/admin/post/">Все объявления</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <h2>Создать объявление</h2>
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
      class="post-form"
      enctype="multipart/form-data"
    >
      <div class="form-row">
        <el-form-item prop="title">
          <el-input placeholder="Заголовок" v-model="controls.title" maxlength="60" show-word-limit></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
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
        </el-form-item>
        <div class="controls">
          <el-checkbox v-model="status" label="Опубликовать" border></el-checkbox>
          <el-form-item>
            <el-button type="warning" @click="clearForm">Очистить</el-button>
            <el-button type="primary" native-type="submit" :loading="loading">Создать</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: "admin",
  head: {
    title: "OSIS",
  },
  middleware: ["adminAuth"],
  data() {
    return {
      loading: false,
      status: false,
      controls: {
        title: "",
        file: null,
      },
      rules: {
        title: [
          {
            required: true,
            message: "Заголовок не должен быть пустым",
            trigger: "blur",
          },
        ],
        file: [
          {
            required: true,
            message: "Нет файла",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid && this.controls.file) {
          this.loading = true;

          // Формирование объекта для отправки в store
          const formData = {
            title: this.firstLetter(this.controls.title),
            status: this.status,
            file: this.controls.file,
          };

          // Отправка объекта с данными формы в store/post.js и вызов Action create()
          try {
            await this.$store.dispatch("post/create", formData);
          } catch (e) {
          } finally {
            this.$message.success("Объявление создано");
            this.clearForm();
          }
        } else {
          this.$message.warning("Объявление должно иметь заголовок и файл .pdf");
        }
      });
    },
    fileUpload(file) {
      this.controls.file = file.raw;
    },
    clearForm() {
      this.controls.title = "";
      this.controls.file = null;
      this.loading = false;
    },
    firstLetter(str) {
      if (!str) {
        return str;
      }

      return str[0].toUpperCase() + str.slice(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.create-container {
  display: block;
  min-height: 100%;
}

.post-form {
  position: relative;
  display: grid;
  grid-template-columns: 40% 47%;
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
  margin-top: -12px;
  display: flex;
  justify-content: space-between;

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
