export default function cartCount(cart, name) {
    let count = 0
    for (let item of cart) {
        if (item.name === name) {
            count++
        }
    }
    return count
}