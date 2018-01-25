import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'

export default {
  state: {
    complaints: [
    ],
    complaintsLoaded: null,
    filter: '',
    errorMessage: ''
  },
  mutations: {
    'SET_COMPLAINTS': (state, complaints) => {
      if (!complaints) {
        state.complaintsLoaded = false
        return
      }
      let finalComplaints = []
      // make sure complaints are sorted by earliest first for further usage
      let complaintsSorted = complaints.sort((complaintA, complaintB) => {
        let dateA = moment(complaintA.Month)
        let dateB = moment(complaintB.Month)
        return dateA - dateB
      })

      // map all the dates to an array to get the min and max month dates
      let dates = _.map(complaints, (complaint) => { return moment(complaint.Month) })
      var startMonth = _.min(dates)
      let endMonth = _.max(dates)

      // loop from the start month to the end month and fill in missing months with 0 complaints and 0 sold units
      let i = 0
      for (startMonth; startMonth.isBefore(endMonth) || startMonth.isSame(endMonth, 'month'); startMonth = moment(startMonth.add(1, 'M'))) {
        let existingEntry = complaintsSorted.findIndex((complaint) => { return startMonth.isSame(complaint.Month) })
        if (existingEntry < 0) {
          finalComplaints.push({Month: startMonth.format(), Complaints: 0, UnitsSold: 0, Quarter: startMonth.quarter()})
        } else {
          finalComplaints.push(complaintsSorted[i])
          i++
        }
      }
      state.errorMessage = ''
      state.complaintsLoaded = true
      state.complaints = finalComplaints
    },
    'SET_COMPLAINTS_ERR': (state, errMessage) => {
      if (errMessage) {
        state.errorMessage = errMessage
      }
    }
  },
  actions: {
    loadComplaints ({commit}) {
      axios.get('http://localhost:3000/CPMU')
        .then(reply => {
          if (reply.status === 200 & reply.data.length > 0) {
            commit('SET_COMPLAINTS', reply.data)
          }
        })
        .catch(err => {
          commit('SET_COMPLAINTS_ERR', err.message)
          commit('SET_COMPLAINTS', false)
        })
    }
  },
  getters: {
    getComplaints (state) {
      return state.complaints
    },
    complaintsLoaded (state) {
      return state.complaintsLoaded
    },
    getErrorMessage (state) {
      return state.errorMessage
    }
  }
}
