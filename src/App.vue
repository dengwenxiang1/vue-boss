<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import description from '@/hooks/routerHooks'
onLaunch(() => {
  console.log("App Launch");
  description()
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style></style>
