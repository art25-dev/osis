<template>
  <div>
    <h1>Объявления</h1>
    <div class="table">
      <el-table
        :data="postList"
        style="width: 100%"
        height="calc(100vh - 120px)"
      >
        <el-table-column prop="title" label="Заголовок объявления">
        </el-table-column>
        <el-table-column prop="date" label="Дата создания">
          <template slot-scope="{ row: { date } }">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{
              $moment(date).format("DD.MM.YYYY")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Статус"> </el-table-column>
        <el-table-column label="Действия">
          <template slot-scope="scope">
            <el-button
              circle
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="edit(scope.row._id)"
            ></el-button>
            <el-button
              circle
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="
                remove(scope.row._id, scope.row.title, scope.row.pathFile)
              "
            ></el-button>
          </template>
        </el-table-column>
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
  head: {
    title: "OSIS"
  },
  components: {},
  middleware: ["adminAuth"],
  data() {
    return {};
  },
  computed: {
    // Запрос навигации из store
    postList() {
      return this.$store.getters["post/getPost"];
    }
  },
  mounted() {},
  methods: {
    // Переход на страницу создания объявления
    create() {
      this.$router.push({
        name: "admin-post-create",
        params: { post: this.post }
      });
    },
    // Переход на страницу редактирования объявления
    edit(id) {
      this.$router.push({
        name: `admin-post-id`,
        params: { id: id, post: this.post }
      });
    },
    async remove(id, title, pathFile) {
      // Вызов диалогового окна
      try {
        await this.$confirm(`Удалить объявление "${title}"?`, "Внимание!", {
          confirmButtonText: "Удалить",
          cancelButtonText: "Отмена",
          cancelButtonClass: "el-button--danger",
          showClose: false,
          type: "warning"
        });
        // Вызов Action remove() из store/post.js с передачей id выбранного объявления
        const file = {
          id: id,
          pathFile: pathFile
        };
        await this.$store.dispatch("post/remove", file);
        this.post = this.post.filter(d => d._id !== id);
        this.$message({
          message: "Объявление удалено",
          type: "success"
        });
      } catch (e) {}
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
.label {
  margin-right: 30%;
}
</style>
