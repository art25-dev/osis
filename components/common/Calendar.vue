<template>
  <div class="calendar">
    <div class="clock">
      <span class="hour">{{ hour }}</span>
      <span class="dots">:</span>
      <span class="minute">{{ minute }}</span>
    </div>
    <div class="date">
      <span class="day">{{ day }}</span>
      <span class="slash">/</span>
      <span class="month">{{ month }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hour: this.$moment().format("HH"),
      minute: this.$moment().format("mm"),
      day: this.$moment().format("dddd"),
      month: this.$moment().format("D MMMM")
    };
  },
  methods: {
    updateTime() {
      setInterval(() => {
        this.hour = this.$moment().format("HH");
        this.minute = this.$moment().format("mm");
      }, 30000);
    }
  },
  created() {
    this.updateTime();
  }
};
</script>

<style lang="scss" scoped>
.calendar {
  color: $color-second;
  position: relative;
  margin-bottom: 2rem;
  display: block;

  @include hd-plus {
    margin-bottom: 1.5rem;
  }

  @include hd {
   margin-bottom: 1.2rem;
  }
}

.clock {
  font-size: 5rem;
  font-weight: 800;
  display: block;
  letter-spacing: 0;

  @include hd-plus {
    font-size: 4rem;
  }

  @include hd {
   font-size: 3.8rem;
  }
}

.dots {
  margin: 0 -1rem;
  animation: 1.5s show infinite ease forwards;
}

.date {
  padding-bottom: 1rem;
  font-size: 1.4rem;
  letter-spacing: 1px;

  @include hd-plus {
    font-size: 1.1rem;
  }

  @include hd {
   font-size: 1rem;
  }

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

.slash {
  margin: 0 0.3rem;
}
</style>
