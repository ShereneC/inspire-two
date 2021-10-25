<template>
  <div id="image" class="img"></div>
</template>


<script>
import { AppState } from "../AppState"
export default {
  name: 'component',
  setup(){
    return {
      image: computed(() => AppState.image)
    }
  },
  components:{}
}
</script>


<style lang="scss" scoped>
img {
  background-image: image.url()
}
</style>