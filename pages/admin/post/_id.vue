<template>
  <div class="create-container">
    <el-breadcrumb separator="/" class="mb">
      <el-breadcrumb-item to="/admin/post/">Все объявления</el-breadcrumb-item>
      <el-breadcrumb-item
        >Объявление ID-{{ post._id }} от
        {{ $moment(post.date).format("LL") }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
    >
      <h2>Редактор объявления</h2>
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
          placeholder="Текст объявления"
          v-model="controls.text"
        >
          <font-awesome-icon class="icon" slot="prefix" icon="user" size="1x" />
        </el-input>
      </el-form-item>
            <el-form-item prop="departmentId">
        <el-select
          @change="getNameDepartment()"
          ref="select1"
          v-model="controls.departmentId"
          placeholder="Подразделение"
        >
          <el-option
            v-for="item in departments"
            :key="item._id"
            :label="item.title"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-dialog class="post-preview" :visible.sync="previewDialog">
        <h2 class="post-preview__title">{{ controls.title }}</h2>
        <div class="post-preview__text" :key="controls.text">
          <vue-markdown :breaks="false" :key="controls.text">{{
            controls.text
          }}</vue-markdown>
        </div>
        <span class="post-preview__department">{{
          controls.departmentName
        }}</span>
        <span class="post-preview__date">{{ $moment().format("LL") }}</span>
      </el-dialog>
      <div class="controls-post">
        <el-form-item label prop="status">
          <el-checkbox
            v-model="controls.status"
            label="Опубликовать"
            border
          ></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="test">тест</el-button>
          <el-button type="info" @click="openPreview">Предпросмотр</el-button>
          <el-button type="warning" @click="clearForm">Очистить</el-button>
          <el-button type="primary" native-type="submit" :loading="loading"
            >Сохранить</el-button
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
  async asyncData({ store, params }) {
    const post = await store.dispatch("post/fetchAdminById", params.id);
     const departments = await store.dispatch("department/fetchAdmin");
    return { post, departments };
  },
  data() {
    return {
      loading: false,
      previewDialog: false,
      controls: {
        title: "",
        text: "",
        status: false,
        departmentId: "",
        departmentName: ""
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
    test() {
      let str = this.post.text
      let arrImg = this.post.imageList
    
      let result = str.match(/blob.*"/g);
      

      for(let i = 0; i < result.length; i++) {
        result[i].slice(0, -1);
      }


    },
    getNameDepartment() {
      this.controls.departmentName = event.target.innerText;
    },
    openPreview() {
      this.previewDialog = true;
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;

          // Формирование объекта для отправки в store
          const formData = {
            id: this.post._id,
            title: this.controls.title,
            text: this.controls.text,
            status: this.controls.status
          };
          // Отправка объекта с данными формы в store/post.js и вызов Action update()
          try {
            await this.$store.dispatch("post/update", formData);
          } catch (e) {
          } finally {
            this.$message.success("Изменения сохранены");
            this.loading = false;
          }
        }
      });
    },
    // Очистка данных формы
    clearForm() {
      this.controls.title = "";
      this.controls.text = "";
      this.controls.status = false;
    }
  },
  mounted() {
    // Подгрузка данных объявления в поля формы
    this.controls.title = this.post.title;
    this.controls.text = this.post.text;
    this.controls.status = this.post.status;
  }
};
</script>

<style lang="scss" scoped>
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
    bottom: 2rem;
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

  &__add-image,
  &__add-paragraph,
  &__add-template,
  &__add-subtitle {
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
