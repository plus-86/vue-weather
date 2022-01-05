<template>
  <div>
    <div class="autocomplete">
      <el-row class="demo-autocomplete">
        <el-col>
          <el-autocomplete
            style="margin-top: 100px"
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
      realTimeAirQuality: ''
    }
  },
  methods: {
    // queryString是用户输入的值
    querySearch(queryString, cb) {
      httpGet(Domain.locationURL + queryString).then((res) => {
        console.log(res)
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
      httpGet(Domain.realTimeWeatherURL + e.id).then((res) => {
        console.log(res)
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
        console.log(res)
        let hourly = res.data.hourly
        for (let i in hourly) {
          hourly[i].hourly = hourly[i].fxTime.substring(11, 13) + '时'
        }
        this.hourlyWeather = hourly
      })
      httpGet(Domain.dailyWeatherURL + e.id).then((res) => {
        console.log(res)
        let daily = res.data.daily
        for (let i in daily) {
          daily[i].date = daily[i].fxDate.substring(5)
        }
        this.dailyWeather = daily
      })
      httpGet(Domain.locationURL + e.id).then((res) => {
        console.log(res)
        this.cityName = res.data.location[0].name
      })
      httpGet(Domain.realTimeAir + e.id).then((res) => {
        console.log(res)
        this.realTimeAirQuality = res.data.now
      })
    }
  }
}
</script>
