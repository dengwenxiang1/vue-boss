import {ref} from 'vue'
import { defineStore } from 'pinia'
import {initIo } from '@/hooks/chat'
import {reqChatMsg} from '@/api/index'
import {storage} from '@/commons/storage'
import  type {chatMsg} from '@/types'

export const initUserStore = defineStore('initUser', () => {
const usersRef=ref()
const chatMsgsRef:any=ref([])
//异步获取用户列表和消息列表数据
const getinitUser=async() =>{
    const userInfo = storage.get('userInfo')||{}
    if(!userInfo)return
    initIo(userInfo.value._id)//连接服务端
    const result:any = await reqChatMsg()
    if (result.code === 0) {
        const { users, chatMsgs } = result.data
        usersRef.value=users;
        chatMsgsRef.value=chatMsgs;
    }
} 
//接收消息列表数据
const updataMsgList=(chatMsg:chatMsg)=>{
    if(!chatMsg)return
    chatMsgsRef.value.push(chatMsg);
}

return {getinitUser,updataMsgList,users: usersRef,chatMsgs:chatMsgsRef}
})