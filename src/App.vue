<template lang="pug">
v-app
  v-toolbar(app)
    v-btn(icon='', @click.stop='bNav = !bNav')
      v-icon chevron_right
    v-toolbar-title(v-text='sTitle')
    v-spacer
    v-btn(@click='togClick') {{ sBtn }}
  v-content
    router-view
  v-navigation-drawer(temporary, :left='true', v-model='bNav', fixed, app full)
    v-list
      v-list-tile
        v-list-tile-action(@click='bNav = !bNav')
          v-icon close
        v-list-tile-title Navigation Drawer
  v-footer(:fixed='fixed', app='')
    v-layout(row justify-end)
      .flex-nogrow © 2018, Jonathan Lee

</template>

<script>
export default {
  data () {
    return {
      fixed: true,
      bByQuarter: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      bNav: false,
      sTitle: 'datetable test',
      oBtnText: {
        Month: 'By Month',
        Quarter: 'By Quarter',
        Year: 'By Year'
      }
    }
  },
  computed: {
    sBtn () {
      let vm = this
      let s = vm.oBtnText[vm.$route.params.bBy]
      return s || 'NA'
    }
  },
  methods: {
    togClick () {
      let vm = this
      const asRange = Object.keys(vm.oBtnText)
      let i = asRange.indexOf(vm.$route.params.bBy)
      i = (i + 1) % asRange.length
      this.$router.push('/' + asRange[i])
    }
  },
  name: 'App'
}
</script>

<style lang="stylus">
  .flex-nogrow
    flex-grow 0
</style>
