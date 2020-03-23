import React, { useEffect, useState } from 'react'
import classes from './Product.module.css'
import { Button } from '../shared/Button/Button'
import { Flex } from '../shared/Flex/Flex'
import { useSelector, useDispatch } from 'react-redux'

export const Product = ({ product, isCartPage }) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const [isAddToCartDisabled, setIsAddToCartDisabled] = useState(false)
  const { image, name, description, price, quantity, id } = product
  const shortDescription =
    (description || '')
      .split(' ')
      .splice(0, 20)
      .join(' ') + '...'

  const addToCartHandler = () => {
    const productIndex = cart.findIndex(cartItem => cartItem.id === id)
    if (productIndex >= 0) {
      // Sitas if'as praeina kai produktas jau yra krepselyje
      const newCart = [...cart]
      newCart[productIndex].cartQuantity += 1
      dispatch({
        type: 'REPLACE_CART',
        newCart
      })
    }
    if (productIndex === -1) {
      dispatch({
        type: 'ADD_TO_CART',
        newCartItem: { ...product, cartQuantity: 1 }
      })
    }
  }

  const removeFromCartHandler = () => {
    const itemToRemove = cart.find(cartItem => cartItem.id === id)
    const itemToRemoveIndex = cart.findIndex(cartItem => cartItem.id === id)

    if (itemToRemove.cartQuantity === 1) {
      dispatch({
        type: 'REMOVE_FROM_CART',
        id
      })
    }
    if (itemToRemove.cartQuantity > 1) {
      const newCart = [...cart]
      newCart[itemToRemoveIndex].cartQuantity -= 1
      dispatch({ type: 'REPLACE_CART', newCart })
    }
  }

  useEffect(() => {
    if (!isCartPage) {
      const productInCart = cart.find(cartItem => cartItem.id === id)
      const { cartQuantity } = productInCart || {}
      setIsAddToCartDisabled(cartQuantity >= quantity)
    }
  }, [cart, id, quantity])

  return (
    <div className={classes.product}>
      <div className={classes.image}>
        <img src={image} alt={name} />
      </div>
      <div className={classes.productName}>{name}</div>
      {!isCartPage && (
        <div className={classes.shortDescription}>{shortDescription}</div>
      )}
      <div className={classes.bold}>Price: {price}€</div>
      <div className={classes.bold}>
        Quantity: {isCartPage ? product.cartQuantity : quantity}
      </div>
      <div className={classes.buttonList}>
        <Flex justify="center">
          {isCartPage ? (
            <Button type="danger" onClick={removeFromCartHandler}>
              Delete
            </Button>
          ) : (
            <>
              <Button onClick={addToCartHandler} disabled={isAddToCartDisabled}>
                Add to cart
              </Button>
              <Button type="secondary">Edit</Button>
            </>
          )}
        </Flex>
      </div>
    </div>
  )
}
