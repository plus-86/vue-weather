<template>
  <div>
    <div>
      <el-row class="demo-autocomplete">
        <el-col>
          <el-autocomplete
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
        :realTimeWeather="realTimeWeather"
        :hourlyWeather="hourlyWeather"
        :dailyWeather="dailyWeather"
      ></InfoBody>
    </div>
  </div>
</template>

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
      dailyWeather: []
    }
  },
  methods: {
    querySearch(queryString, cb) {
      httpGet(Domain.locationURL + this.userInput).then((res) => {
        console.log(res)
        var cities = res.data.location
        for (var i in cities) {
          cities[i]['cities-province'] = cities[i].name + '-' + cities[i].adm1
        }
        var results = queryString
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
        this.realTimeWeather = res.data.now
      })
      httpGet(Domain.hourlyWeatherURL + e.id).then((res) => {
        console.log(res)
        this.hourlyWeather = res.data.hourly
      })
      httpGet(Domain.daylyWeatherURL + e.id).then((res) => {
        console.log(res)
        this.dailyWeather = res.data.daily
      })
    }
  }
}
</script>
