<template>
  <div>
    <h1>Все подразделения</h1>
    <div class="table">
      <el-table :data="departments" style="width: 100%" height="calc(100vh - 120px)">
        <el-table-column label="Изображение подразделения">
          <template slot-scope="scope">
            <div>
              <div class="block">
                <el-avatar
                  shape="square"
                  :size="40"
                  fit="cover"
                  :src="require(`../../../static/departments${scope.row.imageUrl}`)"
                ></el-avatar>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="Название подразделения"></el-table-column>
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
              @click="remove(scope.row._id, scope.row.imageUrl)"
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
  components: {},
  middleware: ["adminAuth"],
  // Запрос всех подразделений из store/department.js в Action fetchAdmin()
  async asyncData({ store }) {
    const departments = await store.dispatch("department/fetchAdmin");
    return { departments };
  },
  data() {
    return {};
  },
  methods: {
    // Переход на страницу редактирования подразделения
    edit(id) {
      this.$router.push(`/admin/department/${id}`);
    },
    // Удаление подразделения
    async remove(id, imageUrl) {
      // Вызов диалогового окна
      try {
        await this.$confirm("Удалить подразделение?", "Внимание!", {
          confirmButtonText: "Удалить",
          cancelButtonText: "Отмена",
          cancelButtonClass: "el-button--danger",
          showClose: false,
          type: "warning"
        });
        // Вызов Action remove() из store/department.js с передачей id выбранного подразделения
        const img = {
          id: id,
          imageUrl: imageUrl
        };
        await this.$store.dispatch("department/remove", img);
        this.departments = this.departments.filter(d => d._id !== id);
        this.$message({
          message: "Подразделение удалено",
          type: "success"
        });
      } catch (e) {}
    },
    // Переход на страницу создания подразделения
    create() {
      this.$router.push(`/admin/department/create`);
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

  @include hd-plus {
  }

  @include wsx {
    width: 40px;
    height: 40px;
  }

  @include hd {
  }
}

.table {
  position: relative !important;
}
</style>
