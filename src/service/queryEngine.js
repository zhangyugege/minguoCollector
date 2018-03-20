import axios from 'axios'
import {
  merge,
  serialize
} from '@/util/helper'
const CONFIG = {
  SOGOU: {
    API: 'https://pic.sogou.com/pics/json.jsp',
    PARAMS: {
      query: '',
      st: 5,
      start: 0,
      xml_len: 100,
      reqFrom: 'wap_result'
    },
    HOT_SEARCH: 'https://pic.sogou.com/pic/emo/'
  }
}

// 搜狗表情服务
export function  sogou ({ query, page, size, callback }) {
    const api = CONFIG.SOGOU.API
    const defParams = CONFIG.SOGOU.PARAMS
    const params = merge(defParams, {
      query: `${query}`,
      start: (page - 1) * size,
      xml_len: size
    })
    const queryURL = `${api}?${serialize(params)}`;
    return jsonp(queryURL, {}, callback);
}

export function jsonp (url,data,callback) {

  // 1.将传入的data数据转化为url字符串形式
  // {id:1,name:'zhangsan'} => id=1&name=zhangsan
  var dataString = url.indexOf('?') == -1? '?': '&';
  for(var key in data){
      dataString += key + '=' + data[key] + '&';
  };

  // 2 处理url中的回调函数
  // cbFuncName回调函数的名字 ：my_json_cb_名字的前缀 + 随机数（把小数点去掉）
  var cbFuncName = 'my_json_cb_' + Math.random().toString().replace('.','');
  dataString += 'callback=' + cbFuncName;

  // 3.创建一个script标签并插入到页面中
  var scriptEle = document.createElement('script');
  scriptEle.src = url + dataString;

  // 4.挂载回调函数
  window[cbFuncName] = function (data) {
      callback(data);
      // 处理完回调函数的数据之后，删除jsonp的script标签
      document.body.removeChild(scriptEle);
  }

  // 5.append到页面中
  document.body.appendChild(scriptEle);
}
