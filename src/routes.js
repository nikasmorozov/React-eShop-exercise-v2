import Products from './pages/Products'
import { Error } from './pages/404/404'
import { Cart } from './pages/Cart/Cart'
import { Orders } from './pages/Orders/Orders'

export const routes = [
  { isExact: true, component: Products, path: '/', label: 'Products' },
  { isExact: true, component: Orders, path: '/orders', label: 'Orders' },
  { isExact: true, component: Cart, path: '/cart', label: 'Cart' },
  { isExact: true, component: Error, path: '/404', label: '' }
]
