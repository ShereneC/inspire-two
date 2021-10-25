<template>
      <div class="row">
        <!-- Image Info goes at bottom left in this column -->
        <div class="col-md-3 d-flex">
          <h4 id="image">Image Info</h4>

        </div>
        <div class="col-md-6">

        </div>
        <div class="col-md-3">

        </div>
      </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
