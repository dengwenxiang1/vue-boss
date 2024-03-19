import { reactive } from 'vue'
import { defineStore } from 'pinia'
import {useRouter}from 'vue-router'
import {storage} from '@/commons/storage'
import {reqLogin,reqRegister }from '@/api'
import {toast} from '@/commons/toast'
import type {userType} from '@/types'

export const useUserStore = defineStore('userInfo', () => {
  const userInfo = reactive(storage.get('userInfo')||{})
  const router=useRouter()
  const LogIn=async(username:string, password:string)=>{
    try{
      const result:any= await reqLogin(username,password)
      if(result.code==0){
        storage.set('userInfo',Object.assign(userInfo,result.data),4000)
        router.push('/')
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
        router.push('/')
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
  return { userInfo,LogIn,logOut,register}
})
