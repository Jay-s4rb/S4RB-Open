<template>
  <section class="basket-sec-1">
      <div class="uk-container uk-container-large uk-margin-medium-top">
          <appRunner title="Complaints" subTitle="List and filter the complaints"/>
          <div class="uk-grid" v-if="complaintsLoaded">
            <div class="btns  uk-width-1-5">
              <div class="uk-button-group" uk-sticky>
                  <button class="uk-button uk-button-primary" @click="filterMonthly">Monthly</button>
                  <button class="uk-button uk-button-danger" @click="filterQuaterly">Quaterly</button>
              </div>
            </div>
            <div class="table-styles uk-width-expand uk-margin-large-bottom" :class="{'quarterly-style': filterType == 'Quarterly'}">
                <table class="uk-table uk-table-justify uk-table-divider uk-table-small uk-table-middle ">
                  <thead>
                      <tr v-if="filterType == 'Monthly'">
                          <th class="uk-width-small">Monthly</th>
                          <th class="uk-table-small">CPMU</th>
                      </tr>
                      <tr v-else>
                        <th class="uk-table-small">Year</th>
                        <th class="uk-table-small">Quarter</th>
                        <th class="uk-table-small">CPMU</th>
                      </tr>
                  </thead>
                  <tbody>
                    <appComplaint v-for="(complaint, index) in filteredComplaints" :key="index" :complaint="complaint" :filterType="filterType"/>
                  </tbody>
              </table>
            </div>
          </div>
          <div v-if="!complaintsLoaded">
            <p>Looks like the complaints failed to load. You should contact the web owner immediately</p>
            <p>Err Message: {{loadComplaintsError}}</p>
          </div>
      </div>
  </section>
</template>

<script>
import Runner from '../common/Runner'
import Complaint from '../complaints/Complaint'
import moment from 'moment'

export default {
  data () {
    return {
      filterOn: false,
      filterType: 'Monthly'
    }
  },
  components: {
    appRunner: Runner,
    appComplaint: Complaint
  },
  computed: {
    complaints () {
      return this.$store.getters.getComplaints
    },
    complaintsLoaded () {
      return this.$store.getters.complaintsLoaded
    },
    loadComplaintsError () {
      return this.$store.getters.getErrorMessage
    },
    filteredComplaints () {
      switch (this.filterType) {
        case 'Monthly':
          return this.complaints
        case 'Quarterly':
          let newArr = []
          for (var i = 0; i < this.complaints.length; i += 3) {
            let sliced = this.complaints.slice(i, i + 3)
            let newEntry = sliced.reduce((a, b) => {
              return {
                Complaints: a.Complaints + b.Complaints,
                Year: moment(b.Month).format('YYYY'),
                Quarter: a.Quarter
              }
            })
            newArr.push(newEntry)
          }
          return newArr
      }
    }
  },
  methods: {
    filterQuaterly () {
      this.filterOn = true
      this.filterType = 'Quarterly'
    },
    filterMonthly () {
      this.filterOn = false
      this.filterType = 'Monthly'
    }
  },
  created () {
    this.$store.dispatch('loadComplaints')
  }
}
</script>
