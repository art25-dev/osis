<template>
  <div class="calendar-container">
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
    <svg-icon class="gerb" v-on:click.ctrl="goAdmin" name="gerb" />
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
    },
    goAdmin() {
      this.$router.push("admin")
    }
  },
  created() {
    this.updateTime();
  }
};
</script>

<style lang="scss" scoped>
.calendar-container {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 5px;
    background: $color-danger;
    display: block;
  }

  @include hd-plus {
      margin-bottom: 1.5rem;
    padding-bottom: 1rem;
  }

  @include hd {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
  }
}

.gerb {
  width: 65px;
  height: 120px;

  @include hd-plus {
    width: 50px;
    height: 90px;
  }

  @include hd {
    width: 50px;
    height: 80px;
  }

  @include wsx {
    width: 47px;
    height: 85px;
  }
}

.calendar {
  color: $color-second;
  position: relative;
  flex: 1;
  display: block;
}

.clock {
  font-size: 5rem;
  display: block;
  font-family: "Roboto-Black", "Arial", sans-serif;
  letter-spacing: 2px;

  @include hd-plus {
    font-size: 4rem;
    letter-spacing: 2px;
  }

  @include hd {
    font-size: 3.5rem;
    letter-spacing: 2px;
  }
}

.dots {
  margin: 0 -1rem;
  animation: 1.5s show infinite ease forwards;
}

.date {
  font-size: 1.2rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-family: "Roboto-Regular", "Arial", sans-serif;
  font-weight: normal;

  @include hd-plus {
    font-size: .9rem;
  }

  @include hd {
    font-size: .85rem;
  }
}

.slash {
  margin: 0 0.3rem;
}
</style>
