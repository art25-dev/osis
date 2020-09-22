<template>
  <div class="create-container">
    <el-breadcrumb separator="/" class="mb">
      <el-breadcrumb-item to="/admin/department/"
        >Все подразделения</el-breadcrumb-item
      >
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
      class="department-form"
      enctype="multipart/form-data"
    >
      <h2>Создать подразделение</h2>
      <el-form-item prop="title">
        <el-input
          placeholder="Название"
          v-model="controls.title"
          maxlength="60"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item class="mb-0">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/admin"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imagePreview" :src="imagePreview" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <div class="controls">
        <el-form-item>
          <el-button type="warning" @click="clearForm">Очистить</el-button>
          <el-button type="primary" native-type="submit" :loading="loading"
            >Создать</el-button
          >
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
      image: null,
      imagePreview: null,
      loading: false,
      controls: {
        title: ""
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
    handleAvatarSuccess(res, file) {
      this.imagePreview = URL.createObjectURL(file.raw);
      this.image = file.raw;
    },
    beforeAvatarUpload(file) {
      const format = file.type === "image/jpeg" || file.type === "image/png";
      const size = file.size / 1024 / 1024 < 2;

      if (!format) {
        this.$message.error("Формат изображения должен быть JPEG или PNG");
      }
      if (!size) {
        this.$message.error("Размер изображения должен быть не более 2 МБ");
      }
      return format && size;
    },
    /////////////////////////////////////////////////
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid && this.image) {
          this.loading = true;

          // Формирование объекта для отправки в store
          const formData = {
            title: this.firstLetter(this.controls.title.trim()),
            image: this.image
          };

          // Отправка объекта с данными формы в store/department.js и вызов Action create()
          try {
            await this.$store.dispatch("department/create", formData);
          } catch (e) {
          } finally {
            this.$message.success("Подразделение создано");
            this.clearForm();
          }
        } else {
          this.$message.warning("Форма не валидна");
        }
      });
    },
    clearForm() {
      this.controls.title = "";
      this.loading = false;
      this.image = null;
      this.imagePreview = null;
    },
    firstLetter(str) {
      if (!str) {
        return str;
      }
      str = str.toLowerCase();
      return str[0].toUpperCase() + str.slice(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.create-container {
  display: block;
  min-height: 100%;
}

.department-form {
  padding-right: 2rem;
  position: relative;
  width: 40%;
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
