<template>
  <div>
    <h1>Навигация</h1>
    <div class="table">
      <el-table
        :data="navigation"
        style="width: 100%"
        height="calc(100vh - 120px)"
      >
        <el-table-column prop="title" label="Название пункта меню">
        </el-table-column>
        <el-table-column prop="parent" label="Родительское меню">
        </el-table-column>
        <el-table-column prop="views" label="Кол-во просмотров">
          <template slot-scope="{ row: { views } }">
            <i class="el-icon-view"></i>
            <span style="margin-left: 10px">{{ views }}</span>
          </template>
        </el-table-column>
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
  middleware: ["adminAuth"],
  computed: {
    // Запрос навигации из store
    navigation() {
      return this.$store.getters["navigation/getNavigation"];
    }
  },
  methods: {
    create() {
    // Переход на страницу создания пункта навигации
      this.$router.push(`/admin/navigation/create`);
    },
    // Переход на страницу редактирования пункта навигации
    edit(id) {
      this.$router.push(`/admin/navigation/${id}`);
    },
    async remove(id, title, pathFile) {
      // Вызов диалогового окна
      try {
        await this.$confirm(`Удалить пункт меню "${title}"?`, "Внимание!", {
          confirmButtonText: "Удалить",
          cancelButtonText: "Отмена",
          cancelButtonClass: "el-button--danger",
          showClose: false,
          type: "warning"
        });
        // Вызов Action remove() из store/navigation.js с передачей id выбранного пункта меню
        const file = {
          id: id,
          pathFile: pathFile
        };
        await this.$store.dispatch("navigation/remove", file);
        await this.$store.dispatch("navigation/getNavigation");
        this.$message({
          message: "Пункт меню удален",
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
