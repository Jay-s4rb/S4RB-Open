<template>
  <tr v-if="filterType == 'Monthly'">
      <td>{{complaint.Month | niceDate}}</td>
      <td>{{complaint.Complaints}}</td>
  </tr>
  <tr v-else>
    <td>{{complaint.Year}}</td>
    <td>{{complaint.Quarter}}</td>
    <td>{{complaint.Complaints}}</td>
  </tr>
</template>

<script>
export default {
  props: ['complaint', 'filterType']
}
</script>
