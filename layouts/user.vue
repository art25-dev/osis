<template>
  <div class="container">
    <div class="bg"></div>
    <span class="version">Версия - {{version}}</span>
    <el-container>
      <el-main>
        <nuxt></nuxt>
      </el-main>
      <el-aside>
        <div class="el-aside__navigation">
          <app-calendar></app-calendar>
          <app-navigation></app-navigation>
        </div>
        <div class="el-aside__tray">Антивирусные базы недоступны</div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import {version} from '@/package.json';
import AppCalendar from "@/components/common/Calendar";
import AppNavigation from "@/components/user/Navigation";
export default {
  components: {
    AppCalendar,
    AppNavigation
  },
  data() {
    return {
      version: version
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
 
  },
  watch: {
    error(value) {
      this.$message.error(value.response.data.message);
    }
  },
  mounted() {
    // Запрос навигации из БД
    this.$store.dispatch("navigation/getNavigation")
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.el-main {
  margin: 3rem 2rem;
  border-radius: 5px;

  @include hd-plus {
  }

  @include wsx {
    margin: 2.2rem 1.5rem;
  }

  @include hd {
    margin: 2.2rem 1.5rem;
  }
}
.el-aside {
  width: 30% !important;
  display: flex;
  flex-direction: column;
  user-select: none;
  box-shadow: 0 16px 24px 2px rgba(0,0,0, 0.14), 0 6px 30px 5px rgba(0,0,0, 0.12), 0 8px 10px 0 rgba(0,0,0, 0.2);

  &__navigation {
    padding: 2rem;
    background: rgba($color-primary, 0.8);
    flex: 1;
    display: flex;
    flex-direction: column;

    @include hd-plus {
    }

    @include hd {
      padding: 1.5rem;
    }

    @include wsx {
      padding: 1.5rem;
    }
  }

  &__tray {
    background: rgba($color-second, 0.8);
    padding: 1rem 2rem;
    text-align: right;
    color: $color-primary;
    font-family: "Roboto-Bold", "Arial", sans-serif;
    font-size: 1rem;

    @include hd-plus {
    }

    @include wsx {
      padding: 0.7rem 1.5rem;
      font-size: 0.8rem;
    }

    @include hd {
      padding: 0.7rem 1.5rem;
      font-size: 0.8rem;
    }
  }

  @include hd-plus {
  }

  @include wsx {
  }

  @include hd {
    width: 29% !important;
  }
}

.version {
  font-size: 12px;
  color: rgba($color-second, .3);
  padding: 10px;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
