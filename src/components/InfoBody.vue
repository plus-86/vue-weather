<template>
  <div>
    <button @click="show = !show">Click Me</button>

    <div>
      <transition name="el-fade-in">
        <div v-show="show" class="transition-box">
          <div>{{ realTimeWeather }}</div>
          <div v-for="(item, index) in hourlyWeather" :key="index">
            {{ item.fxTime }}-{{ item.text }}-{{ item.windDir }}-{{ item.temp }}
          </div>
          <div v-for="(item, index) in dailyWeather" :key="index">
            {{ item.fxDate }}-{{ item.textDay }}
          </div>
          <img src="../assets/logo.png" alt="" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: ['realTimeWeather', 'hourlyWeather', 'dailyWeather'],
  name: 'InfoBody',
  data() {
    return {
      show: true
    }
  }
}
</script>
<style lang="scss" scoped></style>
