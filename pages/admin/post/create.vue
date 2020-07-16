<template>
  <div class="create-container">
    <el-breadcrumb separator="/" class="mb">
      <el-breadcrumb-item to="/admin/post/">Все объявления</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
      class="post-form"
    >
      <h2>Создать объявление</h2>
      <el-form-item prop="title">
        <el-input
          placeholder="Заголовок"
          v-model="controls.title"
          maxlength="60"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item prop="text">
        <el-input
          type="textarea"
          resize="none"
          :rows="15"
          placeholder="Текст в формате .md или .html"
          v-model="controls.text"
        >
          <font-awesome-icon class="icon" slot="prefix" icon="user" size="1x" />
        </el-input>
      </el-form-item>

      <el-dialog class="post" :visible.sync="previewDialog">
        <h2>{{ controls.title }}</h2>
        <div class="text" :key="controls.text">
          <vue-markdown>{{controls.text}}</vue-markdown>
        </div>
        <span class="department">Отдел воспитательной работы</span>
        <span class="date">{{ $moment().format("LL") }}</span>
      </el-dialog>

      <div class="controls">
        <el-form-item label prop="status">
          <el-checkbox
            v-model="controls.status"
            label="Опубликовать"
            border
          ></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="previewDialog = true">Предпросмотр</el-button>
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
  middleware: ["adminAuth"],
  data() {
    return {
      loading: false,
      previewDialog: false,
      controls: {
        title: "",
        text: "",
        status: false
      },
      rules: {
        title: [
          {
            required: true,
            message: "Заголовок не должен быть пустым",
            trigger: "blur"
          }
        ],
        text: [
          {
            required: true,
            message: "Текст не должен быть пустым",
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
            title: this.controls.title,
            text: this.controls.text,
            status: this.controls.status
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
          this.$message.warning("Форма не валидна");
        }
      });
    },
    clearForm() {
      this.controls.title = "";
      this.controls.text = "";
      this.controls.status = false;
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.create-container {
  display: block;
  min-height: 100%;
  max-width: 50%;
}

.post {
  min-height: 100%;
  overflow: hidden;


  h2 {
    display: block;
    padding-bottom: 0.3rem;
    margin-bottom: 1rem;
    color: $color-primary;
    position: relative;
    font-size: 2rem;
    min-height: 48px;

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

  & .text {
    text-align: justify;
    font-size: 1.5rem;
    overflow-y: scroll;
    max-height: 500px;
    padding: 0rem 1rem 0rem 0rem;
    margin-bottom: 2.5rem;
  }
}

.department {
  position: absolute;
  bottom: 1.5rem;
  left: 2rem;
  font-size: 1.1rem;
  color: $color-info;
  font-weight: bold;
}

.date {
  font-size: 1.1rem;
  position: absolute;
  right: 2rem;
  bottom: 1.5rem;
  color: $color-info;
  font-weight: bold;
}

.controls {
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
