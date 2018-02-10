import { shallow } from 'vue-test-utils'
import Component from '@/components/table.vue'
import dateTable from '@/assets/db.json'

import _ from 'lodash'
const vmNext = (component) => {
  return new Promise((resolve) => {
    component.vm.$nextTick(resolve)
  })
}
describe('table.vue', () => {
  let component, mocks
  beforeEach(() => {
    mocks = {}
    _.set(mocks, '$route.params', {bByQuarter: false})
    _.set(mocks, '$router.push', jest.fn())
  })
  const expectRowsCorrectLength = function (component) {
    // 12 per year
    const rows = component.findAll('table tr')
    const setYears = new Set()
    rows.wrappers.forEach((node, i) => {
      if (i === 0) { return }
      const sYear = node.findAll('td').at(0).text()
      if (sYear.trim() === '') { return }
      setYears.add(sYear)
    })
    const aYears = Array.from(setYears)
    expect(aYears.length > 0).toBe(true)
    expect(aYears.length * 12).toBe(rows.length - 1)
    return aYears
    // expect will throw if wrong
  }

  it('render intial, table headers loading', () => {
    component = shallow(Component, {mocks})
    console.log(component)
    const sFirstRow = component.findAll('tr').at(1).text()
    const headers = component.findAll('th')
    expect(sFirstRow).toEqual('Loading...')
    expect(headers).toHaveLength(5)
  })

  describe('after loading', () => {
    let component
    beforeEach(async () => {
      jest.useFakeTimers()
      component = shallow(Component, {mocks})
      const cbSuccess = setTimeout.mock.calls[0][0]
      cbSuccess()
      await vmNext(component)
    })

    it('renders correct number of rows per month', () => {
      expectRowsCorrectLength(component)
    })

    it('renders correct number of rows per quarter', async () => {
      const aYears = expectRowsCorrectLength(component)
      _.set(mocks, '$route.params', {bByQuarter: true})
      await vmNext(component)
      expect(component.findAll('tr').length - 1).toEqual(aYears.length * 4)
    })
  })
  it('renders blanks for january and febuary months before', async () => {
    jest.doMock('@/assets/db.json', () => {
      const mockJson = _.cloneDeep(dateTable)
      mockJson.CPMU = dateTable.CPMU.filter((o) => {
        return (new Date(o.Month).getMonth()) > 1
      })
      return mockJson
    })
    jest.resetModules()

    const Component = require('@/components/table.vue')
    component = shallow(Component, {mocks})
    const cbSuccess = setTimeout.mock.calls[0][0]
    cbSuccess()
    await vmNext(component)
    expectRowsCorrectLength(component)
  })

  it('renders a year with 11 blanks when given a single date', async () => {
    jest.doMock('@/assets/db.json', () => {
      const mockJson = _.cloneDeep(dateTable)
      mockJson.CPMU = [ dateTable.CPMU[3] ]
      return mockJson
    })
    jest.resetModules()

    const Component = require('@/components/table.vue')
    component = shallow(Component, {mocks})
    const cbSuccess = setTimeout.mock.calls[0][0]
    cbSuccess()
    await vmNext(component)
    const iRowLength = component.findAll('tr').length - 1
    expect(iRowLength).toEqual(12)
  })
})
