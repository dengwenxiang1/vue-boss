<template>
    <view>
      <view class="select">
        <text class="select-text">{{  title }}</text>
        <img v-if="selectValue"  class="select-image" :src="selectValue" mode="aspectFill">
      </view>  
      <uni-grid :column="5" @change="change">
		<uni-grid-item v-for="(item, index) in headerList" :index="index" :key="index">
			  <view class="grid-item-box" style="background-color: #fff;">
                   <image :src="item.icon" class="image" mode="aspectFill" />
					<text class="text">{{ item.text }}</text>
			    </view>
	   </uni-grid-item>
     </uni-grid>
    </view>
  </template>
  
<script setup lang="ts">
   import { newRequire} from '@/utils';
   import { ref ,computed,defineEmits} from 'vue';

   const emits=defineEmits(['update'])

   const selectValue=ref()

   const headerList = []//需要显示的列表数据
   for (let i = 0; i < 20; i++) {
    headerList.push({
      text: '头像' + (i + 1),
      icon:  newRequire(`@/assets/images/头像${i + 1}.png`)//不能使用import
    })
  }

  const change=(e:any)=>{
    selectValue.value=headerList[e.detail.index].icon
    emits('update',headerList[e.detail.index].text)
  }

  const title=computed(()=>{
    return selectValue?'请选择头像':'已选择头像'
  })
  </script>
  
 <style lang="scss" scoped>
    .select{
        margin-top: 30rpx;
        margin-left: 16rpx;
    }
    .select-text{
        color: #888;
        font-size: 30rpx;
    }
    .select-image{
        width: 70rpx;
        height:70rpx;
    }
    .grid-item-box{
        flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
    }
    .image{
        width: 50rpx;
        height: 50rpx;
    }
    .text{
        margin-top:8rpx;
        font-size: 20rpx;
    }
  </style>
  