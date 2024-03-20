<template>
    <HeaderSletor @update="update"/>
    <view class="content">
     <uni-card>
      <uni-forms :modelValue="formData" ref="fromRef" :rules="getrules()">
			<uni-forms-item label="求职岗位:" name="post">
				<uni-easyinput type="text" v-model="formData.post" placeholder="请输入求职岗位" />
			</uni-forms-item>
			<uni-forms-item label="个人介绍:" name="info">
				<uni-easyinput type="textarea" v-model="formData.info"/>
			</uni-forms-item>
		</uni-forms>
		<button class="login" @click="submitForm">保存</button>
     </uni-card>
    </view>
  </template>
  
  <script setup lang="ts">
  import { reactive,ref} from 'vue'
  import { useUserStore } from '@/store/user'
  import HeaderSletor from '@/compontens/header-sletor/index.vue'
  const fromRef=ref();

  const formData=reactive({
    post: '',//求职岗位,
    info: "",//用户资料
    header:''
  })

  const submitForm=()=>{
    fromRef.value.validate().then(res=>{
    const {UdapteUser} =useUserStore()
    UdapteUser(formData)
	}).catch(err =>{
	   console.log('表单错误信息：', err);
	})
  }

 const update=(e:string)=>{
    formData.header=e
 }

  const getrules=()=>{
    const post={
      rules: [{
				required: true,
				errorMessage: '请输入求职岗位',
			 }]
    }
    const info={
      rules: [
          {
				required: true,
				errorMessage: '请输入个人介绍',
			 },
           {
				 minLength: 8,
				 maxLength: 100,
				 errorMessage: '密码在{minLength} 到 {maxLength} 个字符',
			 }]}
      return{
        post,
        info
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
  .login{
    background-color:#df6b51;
    margin-top:30rpx;
    margin-bottom:30rpx;
  }
  </style>
  