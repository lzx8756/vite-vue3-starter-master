<template>
  <div class="screen">
    <div ref="renderCanvas" id="renderCanvas" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Scene3D from '@/threejs/Threejs'

export default defineComponent({
  name: 'Vuex',
  setup() {
    const renderCanvas = ref()
    onMounted(() => {
      console.log('onMounted', renderCanvas.value)
      const scene = new Scene3D()
      scene.bindDom(renderCanvas.value)
      scene.init()
    })
    return { renderCanvas }
  }
})
</script>

<style scoped lang="stylus">
.screen{
  background: #d8d8d8;
  height: 100%;
  position absolute;
  top:0;
  right:0;
  left:0;
  bottom:0;
  #renderCanvas{
    height:100%;
    .len-box{
      position: absolute;
      top:40px;
      right:0;
      left:0;
      bottom:30px;
      z-index :1;
      background:none;
      mix-blend-mode:normal;
      display: block;
    }
  }
}
</style>
