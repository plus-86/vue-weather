<template>
  <div v-if="dailyWeather[0] && realTimeAirQuality.category">
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
              <template v-if="realTimeAirQuality.category === '优'">
                <div class="fontFamily font-size-12 goodAirQuality">
                  <span>{{ realTimeAirQuality.aqi }}</span
                  ><span>{{ realTimeAirQuality.category }}</span>
                </div>
              </template>
              <template v-if="realTimeAirQuality.category === '良'">
                <div
                  class="fontFamily font-size-12 goodAirQuality"
                  style="background-color: #f6f577"
                >
                  <span>{{ realTimeAirQuality.aqi }}</span
                  ><span>{{ realTimeAirQuality.category }}</span>
                </div>
              </template>
              <template v-if="realTimeAirQuality.category === '轻度污染'">
                <div
                  class="fontFamily font-size-12 badAirQuality"
                  style="background-color: #ffbc66"
                >
                  <span>{{ realTimeAirQuality.aqi }}</span
                  ><span>{{ realTimeAirQuality.category }}</span>
                </div>
              </template>
              <template v-if="realTimeAirQuality.category === '中度污染'">
                <div
                  class="fontFamily font-size-12 badAirQuality"
                  style="background-color: #ff7a7a"
                >
                  <span>{{ realTimeAirQuality.aqi }}</span
                  ><span>{{ realTimeAirQuality.category }}</span>
                </div>
              </template>
              <template v-if="realTimeAirQuality.category === '重度污染'">
                <div
                  class="fontFamily font-size-12 badAirQuality"
                  style="background-color: #d21e1e"
                >
                  <span>{{ realTimeAirQuality.aqi }}</span
                  ><span>{{ realTimeAirQuality.category }}</span>
                </div>
              </template>
              <template v-if="realTimeAirQuality.category === '严重污染'">
                <div
                  class="fontFamily font-size-12 badAirQuality"
                  style="background-color: #783535; color: #fff"
                >
                  <span>{{ realTimeAirQuality.aqi }}</span
                  ><span>{{ realTimeAirQuality.category }}</span>
                </div>
              </template>
              <div style="margin-top: 12px">
                <span style="margin-right: 5px"
                  ><template v-if="realTimeWeather.text === '晴'"
                    ><img
                      style="height: 18px; width: 18px; float: left"
                      src="../assets/icon/sunny.svg"
                      alt="" /></template
                  ><template v-if="realTimeWeather.text === '多云'"
                    ><img
                      style="height: 18px; width: 18px; float: left"
                      src="../assets/icon/cloudy.svg"
                      alt="" /></template
                  ><template v-if="realTimeWeather.text === '阴'"
                    ><img
                      style="height: 18px; width: 18px; float: left"
                      src="../assets/icon/overcast.svg"
                      alt="" /></template
                  ><template v-if="realTimeWeather.text === '阵雨'"
                    ><img
                      style="height: 18px; width: 18px; float: left"
                      src="../assets/icon/shower.svg"
                      alt="" /></template
                  ><template v-if="realTimeWeather.text === '小雨'"
                    ><img
                      style="height: 18px; width: 18px; float: left"
                      src="../assets/icon/lightrain.svg"
                      alt="" /></template
                  ><template v-if="realTimeWeather.text === '中雨'"
                    ><img
                      style="height: 18px; width: 18px; float: left"
                      src="../assets/icon/moderateRain.svg"
                      alt="" /></template
                  ><template v-if="realTimeWeather.text === '大雨'"
                    ><img
                      style="height: 18px; width: 18px; float: left"
                      src="../assets/icon/rainstorm.svg"
                      alt="" /></template
                  ><template v-if="realTimeWeather.text === '阵雪'"
                    ><img
                      style="height: 18px; width: 18px; float: left"
                      src="../assets/icon/snowshower.svg"
                      alt="" /></template
                  ><template v-if="realTimeWeather.text === '小雪'"
                    ><img
                      style="height: 18px; width: 18px; float: left"
                      src="../assets/icon/lightsnow.svg"
                      alt="" /></template
                  ><template v-if="realTimeWeather.text === '中雪'"
                    ><img
                      style="height: 18px; width: 18px; float: left"
                      src="../assets/icon/moderateSnow.svg"
                      alt="" /></template
                  ><template v-if="realTimeWeather.text === '大雪'"
                    ><img
                      style="height: 18px; width: 18px; float: left"
                      src="../assets/icon/snowstorm.svg"
                      alt="" /></template
                  ><template v-if="realTimeWeather.text === '雾'"
                    ><img
                      style="height: 18px; width: 18px; float: left"
                      src="../assets/icon/foggy.svg"
                      alt="" /></template
                  ><template v-if="realTimeWeather.text === '雨夹雪'"
                    ><img
                      style="height: 18px; width: 18px; float: left"
                      src="../assets/icon/sleet.svg"
                      alt="" /></template
                ></span>
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
          <div style="width: 895px; height: 300px" id="hourly"></div>
          <div style="text-align: center">
            <span
              style="padding: 20px; display: inline-block"
              v-for="(item, index) in hourlyWeather"
              :key="index"
              ><span style="display: inline-block">{{ item.hourly }}</span
              ><br />
              <span style="dispaly: inline-block"
                ><template v-if="item.text === '晴'">
                  <img
                    style="height: 18px; width: 18px; padding: 15px 0"
                    src="../assets/icon/sunny.svg"
                    alt="" /></template
                ><template v-if="item.text === '多云'">
                  <img
                    style="height: 18px; width: 18px; padding: 15px 0"
                    src="../assets/icon/cloudy.svg"
                    alt="" /></template
                ><template v-if="item.text === '阴'">
                  <img
                    style="height: 18px; width: 18px; padding: 15px 0"
                    src="../assets/icon/overcast.svg"
                    alt="" /></template
                ><template v-if="item.text === '阵雨'">
                  <img
                    style="height: 18px; width: 18px; padding: 15px 0"
                    src="../assets/icon/shower.svg"
                    alt="" /></template
                ><template v-if="item.text === '小雨'">
                  <img
                    style="height: 18px; width: 18px; padding: 15px 0"
                    src="../assets/icon/lightrain.svg"
                    alt="" /></template
                ><template v-if="item.text === '中雨'">
                  <img
                    style="height: 18px; width: 18px; padding: 15px 0"
                    src="../assets/icon/moderateRain.svg"
                    alt="" /></template
                ><template v-if="item.text === '大雨'">
                  <img
                    style="height: 18px; width: 18px; padding: 15px 0"
                    src="../assets/icon/rainstorm.svg"
                    alt="" /></template
                ><template v-if="item.text === '阵雪'">
                  <img
                    style="height: 18px; width: 18px; padding: 15px 0"
                    src="../assets/icon/snowshower.svg"
                    alt="" /></template
                ><template v-if="item.text === '小雪'">
                  <img
                    style="height: 18px; width: 18px; padding: 15px 0"
                    src="../assets/icon/lightsnow.svg"
                    alt="" /></template
                ><template v-if="item.text === '中雪'">
                  <img
                    style="height: 18px; width: 18px; padding: 15px 0"
                    src="../assets/icon/moderateSnow.svg"
                    alt="" /></template
                ><template v-if="item.text === '大雪'">
                  <img
                    style="height: 18px; width: 18px; padding: 15px 0"
                    src="../assets/icon/snowstorm.svg"
                    alt="" /></template
                ><template v-if="item.text === '雨夹雪'">
                  <img
                    style="height: 18px; width: 18px; padding: 15px 0"
                    src="../assets/icon/sleet.svg"
                    alt="" /></template
                ><template v-if="item.text === '雾'">
                  <img
                    style="height: 18px; width: 18px; padding: 15px 0"
                    src="../assets/icon/foggy.svg"
                    alt="" /></template></span
              ><br /><span style="display: inline-block"
                >{{ item.temp }}°</span
              ></span
            >
          </div>
        </div>
        <div class="forecastBox">
          <div style="font-size: 18px" class="fontFamily">10日天气预报</div>
          <div style="width: 895px; height: 500px" id="daily"></div>
          <div style="text-align: center">
            <span
              style="padding: 60px 55px; display: inline-block"
              v-for="(item, index) in dailyWeather"
              :key="index"
              ><span style="display: inline-block">{{ item.date }}</span
              ><br />
              <span style="display: inline-block; padding: 15px 0"
                ><template v-if="item.textDay === '晴'"
                  ><img
                    style="height: 18px; width: 18px"
                    src="../assets/icon/sunny.svg"
                    alt="" /></template
                ><template v-if="item.textDay === '多云'"
                  ><img
                    style="height: 18px; width: 18px"
                    src="../assets/icon/cloudy.svg"
                    alt="" /></template
                ><template v-if="item.textDay === '阴'"
                  ><img
                    style="height: 18px; width: 18px"
                    src="../assets/icon/overcast.svg"
                    alt="" /></template
                ><template v-if="item.textDay === '阵雨'"
                  ><img
                    style="height: 18px; width: 18px"
                    src="../assets/icon/shower.svg"
                    alt="" /></template
                ><template v-if="item.textDay === '小雨'"
                  ><img
                    style="height: 18px; width: 18px"
                    src="../assets/icon/lightrain.svg"
                    alt="" /></template
                ><template v-if="item.textDay === '中雨'"
                  ><img
                    style="height: 18px; width: 18px"
                    src="../assets/icon/moderateRain.svg"
                    alt="" /></template
                ><template v-if="item.textDay === '大雨'"
                  ><img
                    style="height: 18px; width: 18px"
                    src="../assets/icon/rainstorm.svg"
                    alt="" /></template
                ><template v-if="item.textDay === '阵雪'"
                  ><img
                    style="height: 18px; width: 18px"
                    src="../assets/icon/snowshower.svg"
                    alt="" /></template
                ><template v-if="item.textDay === '小雪'"
                  ><img
                    style="height: 18px; width: 18px"
                    src="../assets/icon/lightsnow.svg"
                    alt="" /></template
                ><template v-if="item.textDay === '中雪'"
                  ><img
                    style="height: 18px; width: 18px"
                    src="../assets/icon/moderateSnow.svg"
                    alt="" /></template
                ><template v-if="item.textDay === '大雪'"
                  ><img
                    style="height: 18px; width: 18px"
                    src="../assets/icon/snowstorm.svg"
                    alt="" /></template
                ><template v-if="item.textDay === '雨夹雪'"
                  ><img
                    style="height: 18px; width: 18px"
                    src="../assets/icon/sleet.svg"
                    alt="" /></template
                ><template v-if="item.textDay === '雾'"
                  ><img
                    style="height: 18px; width: 18px"
                    src="../assets/icon/foggy.svg"
                    alt="" /></template></span
              ><br />
              <span style="display: inline-block">
                {{ item.tempMin }}°~{{ item.tempMax }}°</span
              ></span
            >
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import { LineChart, BarChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { Promise } from 'q'
echarts.use([
  GridComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  TooltipComponent,
  LegendComponent,
  BarChart
])
export default {
  // 在子组件(当前组件)自定义一个prop,将父组件的数据与该prop绑定,在子组件(当前组件),可以用this.prop拿到与该prop绑定的数据
  props: [
    'realTimeWeather',
    'hourlyWeather',
    'dailyWeather',
    'cityName',
    'realTimeAirQuality',
    'echartData',
    'hourlyEchart'
  ],
  name: 'InfoBody',
  data() {
    return {
      show: true
    }
  },
  methods: {
    // dom没加载，echarts没有检测到dom，那么我就让dom加载后再去获取dom，这里就要用到es6语法中的Promise
    getHourlyEchart() {
      let newPromise = new Promise((resolve) => {
        resolve()
      })

      newPromise.then(() => {
        let hourlyEchart = this.hourlyEchart
        var chartDom = document.getElementById('hourly')
        var myChart = echarts.init(chartDom)
        var option
        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross' }
          },
          legend: {},
          xAxis: {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: hourlyEchart.fxtime
          },
          yAxis: [
            {
              type: 'value',
              name: '温度',
              position: 'left',
              axisLabel: {
                formatter: '{value} °'
              }
            }
            // {
            //   type: 'value',
            //   name: '湿度',
            //   position: 'right',
            //   axisLabel: {
            //     formatter: '{value} %'
            //   }
            // }
          ],

          series: [
            {
              name: '温度',
              data: hourlyEchart.temp,
              type: 'line',
              smooth: true,
              color: 'orange',
              yAxisIndex: 0 // yAxis数组中下标为x的数据
            }
            // {
            //   name: '湿度',
            //   data: hourlyEchart.humidity,
            //   type: 'bar',
            //   color: 'aqua',
            //   yAxisIndex: 1
            // }
          ]
        }
        option && myChart.setOption(option)
      })
    },
    echart() {
      console.log('e1')
      let newPromise = new Promise((resolve) => {
        resolve()
      })
      newPromise.then(() => {
        let echartData = this.echartData
        console.log('e2', echartData)
        var chartDom = document.getElementById('daily')
        var myChart = echarts.init(chartDom)
        var option
        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross' }
          },
          legend: {},
          xAxis: {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: echartData.date
          },
          yAxis: {
            type: 'value',
            name: '温度',
            position: 'left',
            axisLabel: {
              formatter: '{value} °'
            }
          },

          series: [
            {
              name: '最高温度',
              data: echartData.tempMax,
              type: 'line',
              smooth: true,
              color: 'orange'
            },
            {
              name: '最低温度',
              data: echartData.tempMin,
              type: 'line',
              smooth: true,
              color: 'purple'
            }
          ]
        }
        option && myChart.setOption(option)
      })
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
.badAirQuality {
  width: 85px;
  height: 19px;
  line-height: 19px;
  text-align: center;
  background-color: #82c91e;
  border-radius: 9.5px;
}
.goodAirQuality {
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
  width: 170px;
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
