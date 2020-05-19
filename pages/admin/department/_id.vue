<template>
  <div class="create-container">
    <el-breadcrumb separator="/" class="mb">
      <el-breadcrumb-item to="/admin/department/">Все подразделения</el-breadcrumb-item>
      <el-breadcrumb-item>Подразделение ID-{{ department._id }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
      class="department-form"
      enctype="multipart/form-data"
    >
      <h2>Редактор подразделения</h2>
      <el-form-item prop="title">
        <el-input placeholder="Заголовок" v-model="controls.title" maxlength="40" show-word-limit></el-input>
      </el-form-item>

      <el-form-item class="mb-0">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/admin"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="currentImagePreview"
            :src="require(`../../../static/images/departments${currentImagePreview}`)"
            class="avatar"
          />
          <img v-else-if="newImagePreview" :src="newImagePreview" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <div class="controls">
        <el-form-item>
          <el-button type="warning" @click="clearForm">Очистить</el-button>
          <el-button type="primary" native-type="submit" :loading="loading">Обновить</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["adminAuth"],
  async asyncData({ store, params }) {
    const department = await store.dispatch(
      "department/fetchAdminById",
      params.id
    );
    
    return { department };
  },
  data() {
    return {
      currentImageFile: null,
      newImageFile: null,
      currentImagePreview: null,
      newImagePreview: null,
      loading: false,
      controls: {
        title: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "Заголовок не должен быть пустым",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.currentImagePreview = null;
      this.newImagePreview = URL.createObjectURL(file.raw);
      this.newImageFile = file.raw;
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
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;

          // Формирование объекта для отправки в store
          const formData = {
            id: this.department._id,
            title: this.controls.title,
            newImageFile: this.newImageFile,
            pathOldImage: this.currentImageFile
          };

          console.log(formData);

          // Отправка объекта с данными формы в store/department.js и вызов Action update()
          try {
            await this.$store.dispatch("department/update", formData);
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
    // Очистка данных формы
    clearForm() {
      this.controls.title = "";
      this.loading = false;
      this.currentImageFile = null;
      this.newImageFile = null;
      this.currentImagePreview = null;
      this.newImagePreview = null;
    }
  },
  mounted() {
    // Подгрузка данных объявления в поля формы
    this.controls.title = this.department.title;
    this.currentImagePreview = this.department.imageUrl;
    this.currentImageFile = this.department.imageUrl;
    console.log(this.department);
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
