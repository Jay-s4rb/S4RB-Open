<template lang="pug">
v-container
  v-layout(row justify-center)
    lineChart(
      v-if='bShowLineChart'
      :chartData='oChartData'
      :options='oChartOptions')
    table
      tr
        th(v-for='header in headers') {{ header.text }}
      tr(v-if='items.length === 0') Loading...
      tr(v-for='(item, i) in items'
        :class='{bBlank: item.bBlank}')
        td.text-xs-left.pa-1.pr-2
          span(v-if="showYear(i)")
            | {{ getYear(item.Month) }}
        td.text-xs-left(v-show='bShowQuarter')
          span(
            v-if="showQuarter(i)"
          ) {{ item.Quarter }}
        td.text-xs-left.pa-1.pr-2(v-show="bShowMonth") {{ getMonth(item.Month) }}
        td.text-xs-right.pa-1.pr-2 {{ item.UnitsSold }}
        td.text-xs-right.pa-1.pr-2 {{ item.Complaints }}

</template>

<script>
module.exports = require('./table.js').default
</script>

<style lang="stylus">
.bBlank
  opacity .3

#dateTable
  table.table tbody td:first-child, table.table tbody td:not(:first-child), table.table tbody th:first-child, table.table tbody th:not(:first-child), table.table thead td:first-child, table.table thead td:not(:first-child), table.table thead th:first-child, table.table thead th:not(:first-child) {
    padding 0 6px
  }

  table.table tbody td, table.table tbody th {
    height: 16px;
  }

</style>
