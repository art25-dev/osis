<template>
  <el-form
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
    class="login"
  >
    <h2>Вход в систему</h2>
    <el-form-item prop="login">
      <el-input placeholder="Логин" v-model.trim="controls.login">
        <font-awesome-icon class="icon" slot="prefix" icon="user" size="1x" />
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input placeholder="Пароль" v-model.trim="controls.password" show-password>
        <font-awesome-icon class="icon" slot="prefix" icon="key" size="1x" />
      </el-input>
    </el-form-item>
    <el-form-item class="btns">
      <el-button type="danger" @click="$router.push('/')">Отмена</el-button>
      <el-button type="primary" native-type="submit" :loading="loading">Войти</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  layout: "empty",
  data() {
    return {
      loading: false,
      controls: {
        login: "root",
        password: "root"
      },
      rules: {
        login: [
          {
            required: true,
            message: "Введите логин",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Введите пароль",
            trigger: "blur"
          },
          {
            min: 3,
            message: "Пароль должен быть не менее 3 символов",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      // Проверка валидности формы
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;
          // Формирование объекта для отправки в store
          try {
            const formData = {
              login: this.controls.login,
              password: this.controls.password
            };
            // Отправка объекта с данными формы в store/auth.js и вызов Action login()
            await this.$store.dispatch("auth/login", formData);
            this.$router.push("/admin");
          } catch (e) {
            this.loading = false;
          }
        }
      });
    }
  },
  mounted() {
    const { message } = this.$route.query;

    switch (message) {
      case "login":
        this.$message({
          message: "Вам необходимо войти в систему",
          type: "info"
        });
        break;
      case "logout":
        this.$message({
          message: "Вы вышли из системы",
          type: "info"
        });
        break;
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  user-select: none;
}

h2 {
  margin-bottom: 1rem;
  color: $color-primary;
}

.login {
  margin: 0 auto;
  margin-top: 10rem;
  padding: 2rem;
  border-radius: 4px;
  border: none;
  background: rgba($color-second, 0.8);
  color: $color-primary;
  width: 500px;
}

.el-form-item:last-child {
  margin-bottom: 0;
}

.btns {
  display: flex !important;
  justify-content: flex-end !important;
}

.icon {
  margin-left: 5px;
}
</style>

