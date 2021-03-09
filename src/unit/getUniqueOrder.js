export default function getUniqueOrder(order) {
    const existId = []
    const uniqueOrder = []
    for (let o of order) {
        if (existId.includes(o.item._id))
            continue
        else {
            uniqueOrder.push(o)
            existId.push(o.item._id)
        }
    }
    return uniqueOrder
}