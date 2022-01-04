<template>
  <div>
    <div>
      <transition name="el-fade-in">
        <div v-show="show" class="transition-box">
          <div class="weatherHeader">
            <div>
              <span class="cityName">{{ cityName }}</span
              ><span class="fontFamily" style="margin: 0 15px 0 0"
                >今天：{{ realTimeWeather.text }}
                {{ dailyWeather[0].tempMin }}°~{{
                  dailyWeather[0].tempMax
                }}°</span
              >
              <span class="time fontFamily">{{
                realTimeWeather.formatTime
              }}</span>
            </div>
            <div class="weatherContent">
              <span class="temp fontFamily">{{ realTimeWeather.temp }}°</span>
              <div class="weatherState">
                <div class="fontFamily font-size-12 weatherQuality">
                  <span>55</span><span>良</span>
                </div>
                <div style="margin-top: 12px">
                  <span style="margin-right: 5px"
                    ><img
                      style="height: 18px; width: 18px; float: left"
                      src="../assets/icon/cloudy.svg"
                      alt=""
                  /></span>
                  <span class="fontFamily font-size-14 margin-r-10">{{
                    realTimeWeather.text
                  }}</span
                  ><span class="fontFamily font-size-14 margin-r-10">{{
                    realTimeWeather.windDir
                  }}</span
                  ><span class="fontFamily font-size-14 margin-r-10"
                    >{{ realTimeWeather.windScale }}级</span
                  >
                </div>
              </div>
            </div>
            <div class="weatherFooter fontFamily font-size-14">
              <span>体感温度{{ realTimeWeather.feelsLike }}°</span>
              <span>湿度{{ realTimeWeather.humidity }}.0%</span
              ><span>能见度{{ realTimeWeather.vis }}公里</span
              ><span>气压{{ realTimeWeather.pressure }}</span
              ><span>降水量{{ realTimeWeather.precip }}</span
              ><span>日出{{ dailyWeather[0].sunrise }}</span
              ><span>日落{{ dailyWeather[0].sunset }}</span>
            </div>
          </div>
          <div class="forecastBox">
            <div style="font-size: 18px" class="fontFamily">24小时预报</div>
            <div style="text-align: center">
              <span
                style="padding: 20px; display: inline-block"
                v-for="(item, index) in hourlyWeather"
                :key="index"
                ><span style="display: inline-block">{{ item.hourly }}</span
                ><br /><span style="display: inline-block; padding: 15px 0">{{
                  item.text
                }}</span
                ><br /><span style="display: inline-block"
                  >{{ item.temp }}°</span
                ></span
              >
            </div>
          </div>
          <div class="forecastBox">
            <div style="font-size: 18px" class="fontFamily">10天天气预报</div>
            <div style="text-align: center">
              <span
                style="padding: 50px 19px; display: inline-block"
                v-for="(item, index) in dailyWeather"
                :key="index"
                ><span style="display: inline-block">{{ item.date }}</span
                ><br /><span style="display: inline-block; padding: 15px 0">{{
                  item.textDay
                }}</span
                ><br /><span style="display: inline-block"
                  >{{ item.tempMin }}°~ {{ item.tempMax }}°</span
                ></span
              >
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: ['realTimeWeather', 'hourlyWeather', 'dailyWeather', 'cityName'],
  name: 'InfoBody',
  data() {
    return {
      show: true
    }
  }
}
</script>
<style lang="scss" scoped>
.forecastBox {
  width: 895px;
  margin: 0 auto;
  padding: 22px 17px 17px;
}
.weatherFooter > span {
  margin: 0 20px 0 0;
}
.weatherFooter {
  margin: 30px 0 0 0;
}
.weatherQuality {
  width: 42px;
  height: 19px;
  line-height: 19px;
  text-align: center;
  background-color: #82c91e;
  border-radius: 9.5px;
}
.margin-r-10 {
  margin-right: 10px;
}
.weatherState {
  position: absolute;
  display: inline-block;
  margin: 34px 0 0 30px;
  width: 155px;
  height: 53px;
}
.fontFamily {
  font-family: PingFangSC-Regular;
}
.temp {
  font-size: 79px;
}
.weatherContent {
  margin-top: 45px;
}
.time {
  float: right;
  margin-top: 8px;
  margin-right: 15px;
}
.weatherHeader {
  height: 248px;
  width: 895px;
  margin: 0 auto;
}
.cityName {
  font-size: 20px;
  margin: 0 15px 0 0;
}
.font-size-14 {
  font-size: 14px;
}
.font-size-12 {
  font-size: 12px;
}
</style>
