export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_CUSTOMER':
            return [...state, action.newCustomer]
        case 'REMOVE_CUSTOMER':
            return state.filter(customer => customer.id !== action.id)
        default:
            return state
    }
}