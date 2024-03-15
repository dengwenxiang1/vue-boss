import {toast} from '@/commons/toast'

export const ajax=(url:string,data?:{},type="GET")=>{
  let localStorage=true
  setTimeout(()=>{
   if(localStorage){
    uni.showLoading({title:"加载中...",msk:true})
   }
  },600)
  return new Promise((resolve,reject)=>{
    uni.request({
        url:url,
        method:type==='GET'?'GET':'POST',
        data:data,
        success(res){
            console.log(res)
            return resolve({
                ok:true,
                status:res.statusCode,
                text:async () => JSON.stringify(res.data),
                json:async () => res.data
            } as Response);  
        },
        fail(err){
            console.log(err)
            toast.error("连接超时")
            return reject(err);
        },
        complete:()=>{
            uni.hideLoading();
            localStorage=false
        }

    })
  })
}