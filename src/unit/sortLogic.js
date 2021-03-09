import _ from 'lodash'

export default function sortByColumn(list, column) {
    const columns = _.range(0, column)
    const sorted = []
    columns.map(c => sorted[c] = _.range(c, list.length, column))
    for (let i in sorted) {
        for (let item in sorted[i])
            sorted[i][item] = list[sorted[i][item]]
    }
    return sorted
}