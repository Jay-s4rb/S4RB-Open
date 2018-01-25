<template>
  <div id="app">
    <appHeader/>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/common/Header'

export default {
  name: 'App',
  components: {
    appHeader: Header
  },
  created () {
    this.$store.dispatch('loadComplaints')
  }
}
</script>
