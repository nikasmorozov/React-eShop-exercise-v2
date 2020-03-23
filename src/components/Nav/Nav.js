import React from 'react'
import classes from './Nav.module.css'
import { Flex } from '../shared/Flex/Flex'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
export const Nav = () => {
  const cart = useSelector(state => state.cart)

  const itemsInCart = cart.reduce(
    (current, currentItem) => current + currentItem.cartQuantity,
    0
  )
  return (
    <Flex
      justify="space-between"
      className={classes.navContainer}
      align="center"
    >
      <div>
        <Link className={classes.bigLink} to="/">
          SuperParduotuvea
        </Link>
      </div>
      <nav>
        <Flex className={classes.linkWrapper}>
          <div>
            <Link className={classes.link} to="/">
              Products
            </Link>
          </div>
          <div>
            <Link className={classes.link} to="/orders">
              Orders
            </Link>
          </div>
          <div>
            <div className={classes.cartBubble}>{itemsInCart}</div>
            <Link className={classes.link} to="/cart">
              Cart
            </Link>
          </div>
        </Flex>
      </nav>
    </Flex>
  )
}
