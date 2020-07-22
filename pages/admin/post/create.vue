<template>
  <div class="create-container">
    <el-breadcrumb separator="/" class="mb">
      <el-breadcrumb-item to="/admin/post/">Все объявления</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="onSubmit">
      <h2>Создать объявление</h2>
      <el-form-item prop="title">
        <el-input placeholder="Заголовок" v-model="controls.title" maxlength="60" show-word-limit></el-input>
      </el-form-item>
      <div class="controls-text">
        <div class="el-upload el-upload--text">
          <el-tooltip class="item" effect="dark" content="Добавить абзац" placement="bottom-start">
            <el-button @click="addParagraphPreview" type="primary" class="controls-text__add-paragraph">
              <font-awesome-icon icon="paragraph"/>
            </el-button>
          </el-tooltip>
        </div>
        <el-upload action="http://localhost:3000/admin" :show-file-list="false" :on-success="addImagePreview" :before-upload="beforeAvatarUpload">
          <el-tooltip class="item" effect="dark" content="Добавить картинку слева" placement="bottom-start">
            <el-button @click="imageClass = 'img-left'" type="primary" class="controls-text__add-image">
              <font-awesome-icon icon="image"/>
              <font-awesome-icon icon="align-justify"/>
            </el-button>
          </el-tooltip>
        </el-upload>

        <el-upload action="http://localhost:3000/admin" :show-file-list="false" :on-success="addImagePreview" :before-upload="beforeAvatarUpload">
          <el-tooltip class="item" effect="dark" content="Добавить картинку справа" placement="bottom-start">
            <el-button @click="imageClass = 'img-right'" type="primary" class="controls-text__add-image">
              <font-awesome-icon icon="align-justify"/>
              <font-awesome-icon icon="image"/>
            </el-button>
          </el-tooltip>
        </el-upload>
      </div>
      <el-form-item prop="text">
        <el-input contenteditable="true" ref="ta" type="textarea" resize="none" :rows="15" placeholder="Текст в формате .md или .html" v-model="controls.text">
          <font-awesome-icon class="icon" slot="prefix" icon="user" size="1x"  />
        </el-input>
      </el-form-item>
      <el-dialog class="post-preview" :visible.sync="previewDialog">
        <h2 class="post-preview__title">{{ controls.title }}</h2>
        <div class="post-preview__text" :key="controls.text">
          <vue-markdown :key="controls.text">{{controls.text}}</vue-markdown>
        </div>
        <span class="post-preview__department">Отдел воспитательной работы</span>
        <span class="post-preview__date">{{ $moment().format("LL") }}</span>
      </el-dialog>
      <div class="controls-post">
        <el-form-item label prop="status">
          <el-checkbox v-model="controls.status" label="Опубликовать" border></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="previewDialog = true">Предпросмотр</el-button>
          <el-button type="warning" @click="clearForm">Очистить</el-button>
          <el-button type="primary" native-type="submit" :loading="loading">Создать</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import insertTextAtCursor from 'insert-text-at-cursor';
export default {
  layout: "admin",
  middleware: ["adminAuth"],
  components: {},
  data() {
    return {
      loading: false,
      previewDialog: false,
      image: null,
      imagePreview: null,
      imageClass: null,
      paragraphClass: null,
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
    addImagePreview(res, file, event) {
      this.imagePreview = URL.createObjectURL(file.raw);
      this.image = file.raw;
      insertTextAtCursor(this.$refs.ta, `<img class="${this.imageClass}" src="${this.imagePreview}">`);
    },
    addParagraphPreview() {
      this.paragraphClass = 'paragraph';
      insertTextAtCursor(this.$refs.ta, `<p class="${this.paragraphClass}"></p>`);
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
    },
  }
};
</script>

<style lang="scss" scoped>

.left {
  border: 5px solid red;
}

.create-container {
  display: block;
  min-height: 100%;
  max-width: 50%;
}

.post-preview {

  &__title {
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

  &__text {
    text-align: justify;
    font-size: 1.5rem;
    overflow-y: scroll;
    max-height: 450px;
    padding: 0rem 1rem 0rem 0rem;
    margin-bottom: 2rem;
    white-space: pre-line;
    word-break: keep-all;

    p {
      text-align: justify;
      font-size: 1.5rem;
      overflow-y: scroll;
      max-height: 450px;
      padding-right: 1rem;
    }
  }

  &__markdown {
    p {
      padding: 0;
      margin: 0;
    }
  }

  &__department {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    font-size: 1rem;
    color: $color-info;
    font-weight: bold;
  }

  &__date {
    font-size: 1rem;
    position: absolute;
    right: 2rem;
    bottom: 1.5rem;
    color: $color-info;
    font-weight: bold;
  }
}


.controls-post {
  display: flex;
  justify-content: space-between;

  .el-form-item {
    margin-bottom: 0;
  }
}

.controls-text {
  margin-bottom: 5px;

  &__add-image, &__add-paragraph {
    border: 1px solid $color-primary;
    border-radius: 5px;
    outline: none;
    color: $color-second;
    background: $color-primary;
    padding: 8px !important;
  }

  div {
    display: inline-block !important;
    width: auto;
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
