<template>
  <div>
    <h1>Навигация</h1>
    <div class="table">
      <el-table style="width: 100%" height="calc(100vh - 120px)">
        
      </el-table>

      <el-button type="success" circle class="btnCreate" @click="create()">
        <font-awesome-icon class="icon" icon="plus" size="1x" />
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  components: {},
  middleware: ["adminAuth"],
  // Запрос всех пунктов меню из store/navigation.js в Action fetchAdmin()
  async asyncData({ store }) {
    const navigation = await store.dispatch("navigation/fetchAdmin");
    return { navigation };
  },
  data() {
    return {};
  },
  methods: {
    create() {
      console.log("create navItem");
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
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

.btnCreate {
  position: absolute;
  width: 45px;
  height: 45px;
  right: 2rem;
  bottom: 2rem;
}

.table {
  position: relative !important;
}
</style>
