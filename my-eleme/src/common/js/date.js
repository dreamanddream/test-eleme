// date的日期格式，通过new Date方式  Sat Jul 23 2016 21:52:44 GMT+0800 (中国标准时间)
// fmt的格式 yyyy-MM-dd hh:mm
export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    // 通过date.getFullYear()将得到年的时间2016
    // console.log(date.getFullYear())
    // 使用date.getMonth() + 1得到月份  7
    // console.log(date.getMonth() + 1)
    // 日 23
    // console.log(date.getDate())
    // 时 21
    // console.log(date.getHours())
    // 分 52
    // console.log(date.getMinutes())
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    // 经过以上对时间的处理 fmt的yyyy-MM-dd hh:mm格式通过正则与replace替换fmt变成了2016-MM-dd hh:mm
    // console.log(fmt)
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      // console.log(k)
      // console.log(o[k])
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
      // console.log(RegExp.$1.length)
      // console.log(str)
    }
  }
  return fmt
}
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
