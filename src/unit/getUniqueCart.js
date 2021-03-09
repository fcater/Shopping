export default function getUniqueList(list) {
    const existId = []
    const uniqueList = []
    for (let item of list) {
        if (existId.includes(item._id))
            continue
        else {
            uniqueList.push(item)
            existId.push(item._id)
        }
    }
    return uniqueList
}