function removeItemFromCart(cart, item) {
    const index = cart.findIndex((c) => c === item)
    cart.splice(index, 1)

    return cart
}

export {
    removeItemFromCart,
}