export default (state = [], action) => {
  switch (action.type) {
    case 'UPLOAD_PRODUCTS':
      return action.products
    case 'ADD_NEW_PRODUCT':
      return [...state, action.newProduct]
    default:
      return state
  }
}
