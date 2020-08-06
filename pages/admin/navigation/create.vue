<template>
  <div class="create-container">
    <el-breadcrumb separator="/" class="mb">
      <el-breadcrumb-item to="/admin/navigation/">Навигация</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
      class="navigation-form"
      enctype="multipart/form-data"
    >
      <h2>Создать пункт меню</h2>
      <el-form-item prop="title">
        <el-input placeholder="Название" v-model="controls.title" maxlength="60" show-word-limit></el-input>
      </el-form-item>

      <div class="controls">
        <el-form-item>
          <el-button type="warning" @click="clearForm">Очистить</el-button>
          <el-button type="primary" native-type="submit" :loading="loading">Создать</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
const cyrillicToTranslit = require("cyrillic-to-translit-js")
export default {
  layout: "admin",
  middleware: ["adminAuth"],
  data() {
    return {
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
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;

          // Формирование объекта для отправки в store
          const formData = {
            title: this.controls.title.toLowerCase(),
            link: cyrillicToTranslit().transform(this.controls.title, "_").toLowerCase()
          };

          // Отправка объекта с данными формы в store/department.js и вызов Action create()
          try {
            await this.$store.dispatch("navigation/create", formData);
          } catch (e) {
          } finally {
            this.$message.success("Пункт меню создан");
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
    }
  }
};
</script>

<style lang="scss" scoped>
.create-container {
  display: block;
  min-height: 100%;
}

.navigation-form {
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
