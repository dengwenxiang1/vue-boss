import {ajax} from '@/api/request'

//获取用户信息
//注册接口
export const reqRegister = (user:{})=> ajax('api'+'/register',user,'POST')
//登录接口
export const reqLogin =(username:string,password:string)=>ajax('api'+'/login',{username,password},'POST')
//更新用户接口
export const reqUpdateUser =(user:{})=>ajax('api'+'/update',user,'POST')
//获取用户信息
export const reqUser=()=>ajax('api'+'/user')
//获取指定用户列表
export const reqUserList =(type:string)=>ajax('api'+'/userlist',{type})
//获取当前用户的聊天消息列表
export const reqChatMsg=()=>ajax('api'+'/msglist')
//修改指定消息为已读
export const reqRedMsg=(from:string)=>ajax('api'+'/readmsg',{from},'PSOT')