import {storage} from '@/commons/storage'
import {toast} from '@/commons/toast'
 // 添加全局前置守卫
// 白名单
const whiteList = [
    '/', // 注意入口页必须直接写 '/'
    { pattern: /^\/pages\/list.*/ }, // 支持正则表达式
    '/pages/register/index',
    '/pages/dasheninfo/index',
    { pattern: /^\/pages\/login\/*/ }
  ]  
const userInfo=storage.get('userInfo')  
const description=()=>{
    const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
    list.forEach((item)=>{
        uni.addInterceptor(item, {
            invoke(e) {
              const url = e.url.split('?')[0]
              // 判断当前窗口是白名单，如果是则不重定向路由
              let pass
              if (whiteList) {
               pass = whiteList.some((item) => {
              if(typeof (item) === 'object' && item.pattern) {
               return item.pattern.test(url)
               }
               return url === item
               })
              }
              console.log(pass,userInfo)
             // 不是白名单并且没有token
            if (!pass && !userInfo) {
             toast.message('请先登录')
             uni.navigateTo({
                url: "/pages/login/index"
            })
            return false
           }
          return e
         }
       })
    })
 }
 export default  description