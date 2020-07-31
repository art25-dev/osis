<template>
  <div>
    <h1>Все объявления</h1>
    <div class="table">
      <el-table :data="posts" style="width: 100%" height="calc(100vh - 120px)">
        <el-table-column prop="title" label="Заголовок" />

        <el-table-column prop="department" label="Подразделение" />

        <el-table-column label="Дата публикации">
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.date).format("LLL") }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Статус публикации">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === true ? 'primary' : 'danger'"
              disable-transitions
              >{{ scope.row.status }}</el-tag
            >
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
              @click="remove(scope.row._id, scope.row.imageList)"
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
  // Запрос всех объявлений из store/post.js в Action fetchAdmin()
  async asyncData({ store }) {
    const posts = await store.dispatch("post/fetchAdmin");
    return { posts };
  },
  data() {
    return {};
  },
  methods: {
    // Переход на страницу редактирования объявления
    edit(id) {
      this.$router.push(`/admin/post/${id}`);
    },
    // Удаление объявления
    async remove(id, imageList) {
      // Вызов диалогового окна
      try {
        await this.$confirm("Удалить объявление?", "Внимание!", {
          confirmButtonText: "Удалить",
          cancelButtonText: "Отмена",
          cancelButtonClass: "el-button--danger",
          showClose: false,
          type: "warning"
        });
        const images = {
          id: id,
          imageList: imageList
        };
        // Вызов Action remove() из store/post.js с передачей id выбранного объявления
        await this.$store.dispatch("post/remove", images);
        this.posts = this.posts.filter(p => p._id !== id);
        this.$message({
          message: "Объявление удалено",
          type: "success"
        });
      } catch (e) {}
    },
    // Переход на страницу создания объявления
    create() {
      this.$router.push(`/admin/post/create`);
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
