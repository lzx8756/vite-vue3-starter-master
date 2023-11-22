<template>
  <div class="screen">
    <div ref="cesiumContainer" id="cesiumContainer" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import * as Cesium from 'cesium'

export default defineComponent({
  name: 'Vuex',
  setup() {
    const cesiumContainer = ref()
    onMounted(async () => {
      Cesium.Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZGIwNTlmYi1lYjMyLTRlODUtODM5NC1jOGY1NzU5NzdkNjAiLCJpZCI6MTc4NzE0LCJpYXQiOjE3MDAxMjE4MDN9.AQXuGRTuBmjyjjfrnxOGH-TC9017RFuSxUfieCfHb0U'
      // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
      const viewer = new Cesium.Viewer('cesiumContainer', {
        terrain: Cesium.Terrain.fromWorldTerrain()
      })
      // Fly the camera to San Francisco at the given longitude, latitude, and height.
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(121.49517, 31.24194, 2000),
        orientation: {
          heading: Cesium.Math.toRadians(0.0)
          // pitch: Cesium.Math.toRadians(-15.0)
        }
      })
      // Add Cesium OSM Buildings, a global 3D buildings layer.
      const buildingTileset = await Cesium.createOsmBuildingsAsync()
      viewer.scene.primitives.add(buildingTileset)

      // const count = viewer.scene.primitives.length
      // const model = viewer.scene.primitives.get(0)
      // const mesh = model.getMesh()
      // console.log(model)
      // const coordinates = []
      // for (let i = 0; i < mesh.vertices.length; i += 3) {
      //   const x = mesh.vertices[i]
      //   const y = mesh.vertices[i + 1]
      //   const z = mesh.vertices[i + 2]
      //   coordinates.push([x, y, z])
      // }
    })
    return { cesiumContainer }
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
  #cesiumContainer{
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
