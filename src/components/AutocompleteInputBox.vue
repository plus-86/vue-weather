<template>
  <div>
    <img
      src="../../src/assets/backgroundImage/bg.jpg"
      style="height: 100%; width: 100%; position: fixed; z-index: -99"
      alt=""
    />
    <div class="autocomplete">
      <el-row class="demo-autocomplete">
        <el-col>
          <el-autocomplete
            style="margin-top: 140px"
            value-key="cities-province"
            class="inline-input"
            v-model="userInput"
            :fetch-suggestions="querySearch"
            placeholder="请输入城市"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>
      </el-row>
    </div>
    <div>
      <InfoBody
        :cityName="cityName"
        :realTimeWeather="realTimeWeather"
        :hourlyWeather="hourlyWeather"
        :dailyWeather="dailyWeather"
        :realTimeAirQuality="realTimeAirQuality"
        :echartData="echartData"
        :hourlyEchart="hourlyEchart"
        ref="InfoBody"
      ></InfoBody>
    </div>
  </div>
</template>
<style lang="scss" scpoed>
.autocomplete {
  text-align: center;
}
</style>

<script>
import { httpGet } from '@/request/httpRequest.js'
import { Domain } from '@/request/config.js'
import InfoBody from '@/components/InfoBody.vue'
import { Promise } from 'q'
import { setTimeout } from 'timers'
export default {
  name: 'AutocompleteInputBox',
  components: {
    InfoBody
  },
  data() {
    return {
      cities: [],
      userInput: '',
      realTimeWeather: '',
      hourlyWeather: [],
      dailyWeather: [],
      cityName: '',
      realTimeAirQuality: '',
      echartData: '',
      hourlyEchart: ''
    }
  },
  methods: {
    // queryString是用户输入的值
    querySearch(queryString, cb) {
      httpGet(Domain.locationURL + queryString).then((res) => {
        // 请求到一组地理位置数组
        let cities = res.data.location
        if (!cities) {
          // 如果没有请求到数据,就显示暂无数据
          let r = [{ 'cities-province': '暂无数据' }]
          cb(r)
        }
        for (let i in cities) {
          // 给每一项数组添加一组数据:'城市-省份'
          cities[i]['cities-province'] = cities[i].name + '-' + cities[i].adm1
        }
        // 拿用户输入的关键字，去筛请求到的输数组
        let results = queryString
          ? cities.filter(this.createFilter(queryString))
          : cities
        cb(results)
      })
    },
    createFilter(queryString) {
      return (city) => {
        if (city.name.indexOf(queryString) !== -1) {
          return city
        }
      }
    },
    handleSelect(e) {
      let newPromise = new Promise((resolve) => {
        httpGet(Domain.realTimeWeatherURL + e.id).then((res) => {
          let now = res.data.now
          now.formatTime =
            now.obsTime.substring(0, 4) +
            '年' +
            now.obsTime.substring(5, 7) +
            '月' +
            now.obsTime.substring(8, 10) +
            '日'
          this.realTimeWeather = now
        })
        httpGet(Domain.hourlyWeatherURL + e.id).then((res) => {
          let hourly = res.data.hourly
          this.hourlyEchart = {
            fxTime: [],
            temp: [],
            text: [],
            humidity: [],
            precip: []
          }
          for (let i in hourly) {
            hourly[i].hourly = hourly[i].fxTime.substring(11, 13) + '时'
            this.hourlyEchart.fxTime.push(hourly[i].fxTime.substring(11, 13))
            this.hourlyEchart.temp.push(hourly[i].temp)
            this.hourlyEchart.text.push(hourly[i].text)
            this.hourlyEchart.humidity.push(hourly[i].humidity)
            this.hourlyEchart.precip.push(hourly[i].precip)
          }
          this.hourlyWeather = hourly
        })
        httpGet(Domain.dailyWeatherURL + e.id).then((res) => {
          let daily = res.data.daily
          this.echartData = {
            date: [],
            textDay: [],
            textNight: [],
            tempMin: [],
            tempMax: []
          }
          for (let i in daily) {
            daily[i].date = daily[i].fxDate.substring(5)
            this.echartData.date.push(daily[i].fxDate.substring(5))
            this.echartData.textDay.push(daily[i].textDay)
            this.echartData.textNight.push(daily[i].textNight)
            this.echartData.tempMin.push(daily[i].tempMin)
            this.echartData.tempMax.push(daily[i].tempMax)
          }
          this.dailyWeather = daily
        })
        httpGet(Domain.locationURL + e.id).then((res) => {
          this.cityName = res.data.location[0].name
        })
        httpGet(Domain.realTimeAir + e.id).then((res) => {
          this.realTimeAirQuality = res.data.now
        })

        setTimeout(resolve, 300) // Promise的起始函数是异步执行的,直接resolve()的话,会在数据以上数据处理完之前,跳到下面的then里面去执行里面的函数,从而导致无法正常显示echarts
      })

      newPromise.then(() => {
        this.$refs.InfoBody.getHourlyEchart()
        this.$refs.InfoBody.echart() // 父组件调用子组件方法: 先import子组件,在子组件标签内写ref='自定义名称',然后this.$ref.自定义名称.方法名()
      })
    }
  }
}
</script>
