<template>
    <div></div>
</template>
<script lang="ts" setup>
import {initUserStore} from '@/store/initUser'

const {getinitUser} =initUserStore();
getinitUser();
</script>