<template>
    <div>
        <h2>{{msg}}</h2>
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'Hi',
  data () {
    return {
      msg: 'Hi Page'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
