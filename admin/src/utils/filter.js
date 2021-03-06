import Vue from 'vue'
import * as moment from 'moment'

Vue.filter('uppercase', function(value) {
  if (!value) { return ''}
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
Vue.filter('number', function(value,num) {
  return parseFloat(value).toFixed(num)
})

Vue.filter("formatDate", function (value) {
  return moment(value).format('YYYY-MM-DD HH:mm:ss')
})

Vue.filter('sendStatus',function(val){
    switch (val) {
      case 'SUCCESS': return '发送成功'; break;
      case 'FAILURE': return '发送失败'; break;
    }
})