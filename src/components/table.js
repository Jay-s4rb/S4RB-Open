import _ from 'lodash'
import dateTable from '@/assets/db.json'
const aMonths = Object.freeze([
  'January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
])

export default {
  data () {
    return {
      iTotal: 0,
      aItems: [],
      bLoading: true,
      aHeaders: [
        {
          text: 'Year',
          align: 'left',
          sortable: false,
          value: 'iYear'
        },
        {
          text: 'Quarter',
          align: 'left',
          sortable: false,
          value: 'iQuarter'
        },
        { text: 'Month', value: 'sMonth', sortable: false },
        { text: 'Units Sold', value: 'iUnitsSold', sortable: false },
        { text: 'Complaints', value: 'iComplaints', sortable: false }
      ]
    }
  },
  watch: {
    aByQuarter (newVal) {
      console.log(newVal)
    }
  },
  mounted () {
    this.load()
  },
  filters: {
    humanMonth (sDate) {
      const dDate = new Date(sDate)
      const iMonth = dDate.getMonth()
      if (!isNaN(iMonth)) {
        return aMonths[iMonth]
      }
    },
    stdformat (num) {
      return Number.parseFloat(num).toPrecision(4)
    }
  },
  computed: {
    items () {
      let vm = this
      // return vm.aByYear
      const o = {
        Month: () => (vm.aItems),
        Quarter: () => (vm.aByQuarter),
        Year: () => (vm.aByYear)
      }
      return o[vm.$route.params.bBy]()
    },
    headers () {
      let vm = this
      return vm.aHeaders.filter((o) => {
        if (!vm.bShowMonth && o.text === 'Month') {
          return false
        }
        if (!vm.bShowQuarter && o.text === 'Quarter') {
          return false
        }
        return true
      })
    },
    bByQuarter () {
      return JSON.parse(this.$route.params.bBy === 'Quarter')
    },
    bShowMonth () {
      return this.$route.params.bBy === 'Month'
    },
    bShowQuarter () {
      return this.$route.params.bBy !== 'Year'
    },
    aByQuarter () {
      let vm = this
      const fnSumIf = (oItem, i, arr) => {
        return oItem.Quarter === arr[arr.length - 1].Quarter
      }
      return vm.aByAny(fnSumIf)
    },
    aByYear () {
      let vm = this
      const fnSumIf = (oItem, i, arr) => {
        return vm.getYear(oItem.Month) === vm.getYear(arr[arr.length - 1].Month)
      }
      return vm.aByAny(fnSumIf)
    }
  },
  methods: {
    aByAny (fnMatch) {
      let vm = this
      return _.cloneDeep(vm.aItems).reduce((arr, oItem, i) => {
        oItem.bBlank = false
        if (arr.length > 0 && fnMatch(oItem, i, arr)) {
          arr[arr.length - 1].Complaints += oItem.Complaints
          arr[arr.length - 1].UnitsSold += oItem.UnitsSold
        } else {
          arr.push(oItem)
        }
        return arr
      }, []).map(vm.mapIsBlank)
    },
    mapIsBlank (item) {
      if (item.Complaints === 0 && item.UnitsSold === 0) {
        item.bBlank = true
      }
      return item
    },
    getYear (sDate) {
      const dDate = new Date(sDate)
      return dDate.getFullYear()
    },
    showQuarter (i) {
      let vm = this
      return !(i > 0 && vm.items[i - 1].Quarter === vm.items[i].Quarter)
    },
    showYear (i) {
      let vm = this
      if (i === 0) { return true }
      return vm.getYear(vm.items[i].Month) !== vm.getYear(vm.items[i - 1].Month)
    },
    load () {
      let vm = this
      vm.getYearFromApi().then(({iTotal, aItems}) => {
        vm.aItems = aItems
        vm.iTotal = iTotal
      })
    },
    leadingZero (i) {
      return i <= 9 ? '0' + i : i
    },
    createBlank (iMonth, iYear) {
      let vm = this
      return {
        Quarter: `${Math.ceil((iMonth + 1) / 3)}`,
        Month: `${iYear}-${vm.leadingZero(iMonth + 1)}-01T00:00:00`,
        Complaints: 0,
        UnitsSold: 0,
        bBlank: true
      }
    },
    pushBlanks ({ iStartMonth, iStartYear, iEndMonth, iEndYear, aItemsFull }) {
      let vm = this
      while (
        (iStartYear * 12 + iStartMonth) <
        (iEndYear * 12 + iEndMonth)
      ) {
        aItemsFull.push(vm.createBlank(iStartMonth, iStartYear))
        iStartMonth++
        if (iStartMonth === 12) {
          iStartMonth = 0
          iStartYear++
        }
      }
    },
    computeMissingMonths (aItems) {
      // presumes aItems are sorted by date

      let vm = this
      let iIndex = 0
      const aItemsFull = []
      const l = aItems.length
      while (iIndex < l) {
        const dDate = new Date(aItems[iIndex].Month)
        const mm = dDate.getMonth()
        const yy = dDate.getFullYear()
        let mmPrev, yyPrev
        const bEnd = iIndex === l - 1
        if (iIndex > 0) {
          const dDatePrev = new Date(aItems[iIndex - 1].Month)
          mmPrev = dDatePrev.getMonth()
          yyPrev = dDatePrev.getFullYear()
        }
        if (isNaN(mm) || isNaN(yy)) {
          continue
        }
        let iStartMonth, iStartYear, iEndMonth, iEndYear
        let bPush = false

        if (iIndex === 0) {
          // Months before
          if (mm !== 0) {
            iStartMonth = 0
            iStartYear = yy
            iEndMonth = mm
            iEndYear = yy
            bPush = true
          }
        } else {
          // Months between
          iStartMonth = mmPrev + 1
          iStartYear = yyPrev
          if (iStartMonth >= 12) {
            iStartMonth = 0
            iStartYear++
          }
          iEndMonth = mm
          iEndYear = yy
          bPush = (iStartYear * 12 + iStartMonth) <
        (iEndYear * 12 + iEndMonth)
        }
        if (bPush) {
          vm.pushBlanks({
            iStartMonth,
            iStartYear,
            iEndMonth,
            iEndYear,
            aItemsFull
          })
        }
        aItemsFull.push(aItems[iIndex])
        if (bEnd) {
          // Months after
          iStartMonth = mm + 1
          iStartYear = yy
          iEndMonth = 12
          iEndYear = iStartYear
          bPush = iStartMonth !== 12

          vm.pushBlanks({
            iStartMonth,
            iStartYear,
            iEndMonth,
            iEndYear,
            aItemsFull
          })
        }
        iIndex++
      }
      return aItemsFull
    },
    getYearFromApi () {
      let vm = this
      vm.bLoading = true
      return new Promise((resolve, reject) => {
        const aAll = dateTable.CPMU
        const iTotal = aAll.length

        setTimeout(() => {
          this.bLoading = false
          resolve({
            aItems: this.computeMissingMonths(
              _.orderBy(_.cloneDeep(aAll), ['Month'], ['asc'])
            ),
            iTotal
          })
        }, 1000)
      })
    }
  }
}
