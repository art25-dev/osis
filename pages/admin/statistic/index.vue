<template>
  <div class="wrap-statistic">
    <div class="wrap-title">
      <h1>Статистика просмотров</h1>
    </div>
    
    <div class="wrap-filter">
      <el-select
        @change="getStatistic"
        prop="id"
        placeholder="Фильтр"
        class="filter"
        v-model="currentSelect"
      >
        <el-option key="main" label="Главное меню" :value="null"> </el-option>
        <el-option
          v-for="item in fullSelect"
          :key="item.value"
          :label="item.title"
          :value="item._id"
        ></el-option>
      </el-select>
    </div>
    <canvas class="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import Chart from "chart.js";
export default {
  head: {
    title: "OSIS"
  },
  layout: "admin",
  middleware: ["adminAuth"],
  extends: Bar,
  data() {
    return {
      fullStatistic: this.$store.dispatch("navigation/getNavigation"),
      currentStatistic: null,
      currentSelect: null
    };
  },
  async mounted() {
    this.getStatistic();
  },
  computed: {
    // Запрос навигации из store
    fullSelect() {
      return this.$store.getters["navigation/getNavigationLink"];
    }
  },
  methods: {
    getStatistic(parent = null) {
      this.currentStatistic = this.$store.getters["navigation/getNavigationChildren"](parent)
  
      const title = this.currentStatistic.map(stat => stat.title);
      const views = this.currentStatistic.map(stat => stat.views);
      const data = {
        labels: title,
        datasets: [
          {
            label: "Количество просмотров",
            data: views,
            backgroundColor: "rgba(44, 56, 44, .5)",
            borderColor: "rgba(44, 56, 44, 1)",
            borderWidth: 1
          }
        ]
      };
      const options = {
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      };
      Chart.defaults.global.defaultFontColor = "#2c382c";
      Chart.defaults.global.defaultFontSize = 12;
      this.renderChart(data, options);
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

.wrap-statistic {
  position: relative;
}

.wrap-title {
  position: absolute;
    display: inline-block;
    left: 0;
}

.wrap-filter {
  position: absolute;
  display: inline-block;
  right: 0;
}

.filter {
  width: 300px;
  margin-bottom: 1rem;
}

.canvas {
  padding-top: 4rem;
}
</style>
