<template>
  <div class="create-container">
    <el-breadcrumb separator="/" class="mb">
      <el-breadcrumb-item to="/admin/navigation/">Навигация</el-breadcrumb-item>
      <el-breadcrumb-item
        >Пункт навигации ID-{{ navigation._id }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
      class="navigation-form"
      enctype="multipart/form-data"
    >
      <h2>Редактор пункта меню</h2>
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
          >
          </el-option>
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
    </el-form>
  </div>
</template>

<script>
const cyrillicToTranslit = require("cyrillic-to-translit-js");
export default {
  layout: "admin",
  middleware: ["adminAuth"],
  async asyncData({ store, params }) {
    const navigation = await store.dispatch(
      "navigation/fetchAdminById",
      params.id
    );

    return { navigation };
  },
  data() {
    return {
      loading: false,
      controls: {
        title: "",
        parent: null
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
            _id: this.navigation._id,
            title: this.firstLetter(this.controls.title),
            parent: this.controls.parent
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
    firstLetter(str) {
      if (!str) {
        return str;
      }
      str = str.toLowerCase();
      return str[0].toUpperCase() + str.slice(1);
    },
    // Очистка данных формы
    clearForm() {
      this.controls.title = "";
      this.controls.parent = null;
      this.loading = false;
    }
  },
  mounted() {
    // Подгрузка данных объявления в поля формы
    this.controls.title = this.navigation.title;
    this.controls.parent = this.navigation.parent;
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
