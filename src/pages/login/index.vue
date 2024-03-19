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
		</uni-forms>
		<button class="login" @click="submitForm">登录</button>
     <router-link to="/pages/register/index">
      <button>尚未注册用户</button>
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
  })

  const submitForm=()=>{
    console.log(fromRef.value)
    fromRef.value.validate().then(res=>{
       const {LogIn} =useUserStore()
       LogIn(formData.username,formData.password)
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
						}
					]
    }
    return{
      username,
      password
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
  