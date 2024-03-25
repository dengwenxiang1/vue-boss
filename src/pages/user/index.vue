<template>
  <div class="user-pages">
    <div class="header">
       <img :src="url" alt="">
       <span>{{username}}</span>
    </div>
    <div class="content">
      <div class="text">职位：{{ post }}</div>
      <div class="text">简介：{{ info }}</div>
      <div class="text">薪资：{{ salary }}</div>
    </div>
    <button class="login" @click="logout">退出登录</button>
  </div>
</template>
<script lang="ts" setup>
import {useUserStore} from '@/store/user'

import {storage} from '@/commons/storage' 

import { newRequire} from '@/utils';

const userInfo = storage.get('userInfo')||{}

const {header,username,post,info,salary} =userInfo.value

const url=newRequire(`@/assets/images/${header}.png`)

const logout=()=>{
    uni.showModal({
	title: '提出',
	content: '确认退出登录吗',
	success: function (res) {
		if (res.confirm) {
            const {logOut} = useUserStore()
            logOut()
		} else if (res.cancel) {
			console.log('用户点击取消');
		}
	}
   })
}

</script>
<style lang="scss" scoped>
.user-pages{
    background-color: #fafafa;
    .login{
        margin-top: 300rpx;
        background-color: #df6b51;
        color: #fafafa;
    }
    .header{
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
    }
   .header,.content{
    box-sizing: border-box;
    width: 702rpx;
    height: auto;
    background: #ffffff;
    box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(29, 0, 3, 0.03);
    border-radius: 20rpx;
    margin: 24rpx;
    padding: 24rpx;
  }
  .text{
    margin-top: 20rpx;
    font-size: 28rpx;
    color: #c2c0c0;
  }  
}
</style>