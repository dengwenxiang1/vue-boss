<template>
    <div  class="massage-pase">
       <div class="card">
          <div>1</div>
          <div>2</div>
       </div>
    </div>
</template>
<script lang="ts" setup>
import {computed,onMounted} from 'vue'
import {initUserStore} from '@/store/initUser'

const {getinitUser} =initUserStore();
getinitUser();

const msgList=computed(()=>{
     const {chatMsgs}=initUserStore();
     
     return chatMsgs;
});
</script>
<style scoped lang="scss">
.massage-pase{
    background-color: #fafafa;
    .card{
        display: flex;
        justify-content:space-between;
        align-items: center;
        box-sizing: border-box;
        width: 702rpx;
        height: auto;
        background: #ffffff;
        box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(29, 0, 3, 0.03);
        border-radius: 20rpx;
        margin: 24rpx;
        padding: 24rpx; 
    }
}
</style>@/store/initUser