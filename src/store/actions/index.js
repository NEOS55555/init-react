import axios from 'axios';
import { message } from 'antd';
// import loading from '@/commonComp/Loading'
// import { LOG_OVERDUE_CODE } from '@/common/constant'
// import { removeLoginCookie } from '@/commonComp/logReg/loginCookie'
// import eventBus from '@/common/eventBus'

axios.interceptors.request.use(
  config => {
    loading.transShow();
    return config
  },
  err => {
    // loading.close();
    return Promise.reject(err)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log(response)
  const { data } = response
  const { resultCode } = data
  if (resultCode && (resultCode !== 200)) {
    message.error(data.resultMessage)
    /* if (resultCode === LOG_OVERDUE_CODE) {
      // removeLoginCookie()
      eventBus.emit('logout#clear', data)
    } */
    loading.close()
    return Promise.reject(data);
  }
  return data;
}, function (err) {
  // 对响应错误做点什么
  // loading.close()
  message.error('系统错误！')
  return Promise.reject(err);
});
