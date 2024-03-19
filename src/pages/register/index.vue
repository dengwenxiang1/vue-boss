<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
   <uni-card>
    <uni-forms :modelValue="formData" ref="fromRef" :rules="getrules()">
    <uni-forms-item label="用户名:" name="username">
      <uni-easyinput type="text" v-model="formData.username" placeholder="请输入姓名" />
    </uni-forms-item>
    <uni-forms-item label="密码:" name="password">
      <uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码" />
    </uni-forms-item>
          <uni-forms-item label="确认密码:" name="password2">
      <uni-easyinput type="password" v-model="formData.password2" placeholder="请输入密码" />
    </uni-forms-item>
       <uni-forms-item label="用户类型:">
            <uni-data-checkbox selectedColor="red"  v-model="formData.type" :localdata="types"></uni-data-checkbox>
      </uni-forms-item>
  </uni-forms>
  <button class="login" @click="submitForm">注册</button>
   <router-link to="/pages/login/index">
    <button  @click="submitForm">已有账户</button>
   </router-link>
   </uni-card>
  </view>
</template>

<script setup lang="ts">
import { reactive,ref} from 'vue'
import { useUserStore } from '@/store/user'
const fromRef=ref();

const formData=reactive({
  username: '',//用户名,
  password: "",//密码
  password2:'',//确认密码
  type:'dashen'
})

const types=[{
      text: '老板',
    value: 'laoban'},
        {
          text: '大神',
          value: 'dashen'}]

const submitForm=()=>{
  console.log(fromRef.value)
  fromRef.value.validate().then(res=>{
    const {register} =useUserStore()
    register(formData)
 }).catch(err =>{
  console.log('表单错误信息：', err);
})
}

const getrules=()=>{
  const username={
    rules: [{
      required: true,
      errorMessage: '请输入姓名',
     },
      {
      minLength: 3,
      maxLength: 5,
      errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
          }
    ]
  }
  const password={
    rules: [{
         required: true,
        errorMessage: '请输入密码',
      },
      {
      minLength: 6,
      maxLength: 12,
      errorMessage: '密码在{minLength} 到 {maxLength} 个字符',
      }]
  }
  const password2={
    rules: [{
         required: true,
        errorMessage: '请输入密码',
      },
      {
      minLength: 6,
      maxLength: 12,
      errorMessage: '密码在{minLength} 到 {maxLength} 个字符',
      },
      {
         validateFunction:function(rule, value, data,callback:Function){
           if (formData.password!==formData.password2) {
             callback('密码不一致')
           }
             return true  
         }
            
       }]
  }
  return{
    username,
    password,
    password2
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}
.login{
  background-color:#df6b51;
  margin-top:30rpx;
  margin-bottom:30rpx;
}
</style>
