export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.newCartItem]
    case 'REPLACE_CART':
      return action.newCart
    case 'REMOVE_FROM_CART':
      return state.filter(cartItem => cartItem.id !== action.id)
    default:
      return state
  }
}
