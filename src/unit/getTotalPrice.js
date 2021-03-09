export default function getTotalPrice(cart) {
    let totalPrice = 0
    for (let item of cart) {
        totalPrice += item.price * ((100 - item.discount) / 100)
    }

    return Math.round(totalPrice * 10) / 10
}