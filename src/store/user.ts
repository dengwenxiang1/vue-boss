import { reactive } from 'vue'
import { defineStore } from 'pinia'
import {storage} from '@/commons/storage'
import {reqLogin,reqRegister,reqUpdateUser}from '@/api'
import {toast} from '@/commons/toast'
import type {userType,userInfo} from '@/types'

export const useUserStore = defineStore('userInfo', () => {
  const userInfo = reactive(storage.get('userInfo')||{})
  const LogIn=async(username:string, password:string)=>{
    try{
      const result:any= await reqLogin(username,password)
      if(result.code==0){
        storage.set('userInfo',Object.assign(userInfo,result.data),4000)
        uni.navigateTo({
          url:'/'
        })
      }else{
       toast.error(result.msg)
      }
    }catch(error){
        toast.error( (error as any).message)
    }
  }

  const register =async(user:userType)=>{
    try{
      const result:any= await reqRegister(user)
      if(result.code==0){
        storage.set('userInfo',Object.assign(userInfo,result.data),4000)
        if(result.data.type==="laoban"){
          uni.navigateTo({
            url:'/pages/bossinfo/index'
          })
        }else{
          uni.navigateTo({
            url:'/pages/dasheninfo/index'
          })
        }
      }else{
       toast.error(result.msg)
      }
    }catch(error){
        toast.error( (error as any).message)
    }
  }

  const  UdapteUser = async (user:userInfo)=>{
    try{
      const result:any= await reqUpdateUser(user)
      if(result.code==0){
        storage.set('userInfo',Object.assign(userInfo,result.data),4000)
        uni.navigateTo({
          url:'/'
        })
      }else{
       toast.error(result.msg)
      }
    }catch(error){
        toast.error( (error as any).message)
    }
  }

  const logOut=()=>{
   storage.remove('userInfo')
   router.push('/login')
  }
  return { userInfo,LogIn,logOut,register,UdapteUser}
})
