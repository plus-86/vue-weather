import axios from 'axios'

export function httpGet(url) {
  return axios({
    url: url,
    method: 'get'
  })
}
