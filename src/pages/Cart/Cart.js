import React, { useState } from 'react'
import { Flex } from '../../components/shared/Flex/Flex'
import Product from '../../components/Product'
import classes from './Cart.module.css'
import { Button } from '../../components/shared/Button/Button'
import { useSelector } from 'react-redux'
import { Input } from '../../components/Input/Input'
import { random } from 'faker'
import { useDispatch } from 'react-redux'


// 1. TODO: Rodyti checkout button'a tik tada kai yra karte produktu
// 2. TODO: Checkout forma turi atsirasti tik poto, kai paspaudziame checkout.
// 3. TODO: Sukurti forma naudojant Input.js komponenta.
//          Formoje turi buti sie fieldai: vardas, adresas, tel nr., el. p.
//          Reikia pavaliduoti!!! Kas norit galit uznaudoti https://www.npmjs.com/package/yup
// 4. TODO: Uzsakymas turi buti siunciamas i serveri ir saugomas.
//          I uzsakyma ieina sie fieldai: suma, produktu ID's, data, ir userio ID.
// 5. TODO: Useris taip pat keliauja i serveri. Turi buti saugomi
//          visi nurodyti duomenys + uuid
// 6. TODO: Duomenys taip pat turi buti ir redux'e.
// 7. TODO: Atvaizduoti orderius "Orders" page lenteles pavidalu.
//          Turi matytis:  useris, suma, produktai, data.
// !----------------------------------------------------------------!
// 8. TODO: <-- BONUS TASK --> Pasidaryti api wrapperi

const emptyCustomerProfile = () => ({
  id: random.uuid(),
  firstName: '',
  lastName: '',
  email: '',
  telephone: ''
})

export const Cart = () => {
  const [customerProfileState, setCustomerProfileState] = useState(emptyCustomerProfile())
  const cart = useSelector(state => state.cart)
  const isSomeItemsInCart = !!cart.length
  const dispatch = useDispatch()


  const inputChangeHandler = (inputKey, event) => {
    event.preventDefault()
    setCustomerProfileState({
      ...customerProfileState,
      [inputKey]: event.target.value
    })
  }

  const orderSubmitHandler = async event => {
    event.preventDefault()
    console.log(customerProfileState)
    const response = await fetch('http://localhost:4000/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerProfileState)
    })

    if(response.status === 201) {
      dispatch({type: 'ADD_CUSTOMER', customerProfileState})
    }
  }

  return (
    <>
      <Flex
        wrap="wrap"
        justify={isSomeItemsInCart ? 'space-between' : 'center'}
      >
        {isSomeItemsInCart ? (
          cart.map(product => (
            <Product isCartPage key={product.id} product={product} />
          ))
        ) : (
          <h1 className={classes.heading}>Sorry, no items in cart :(</h1>
        )}
      </Flex>
      {isSomeItemsInCart ? (
        <>
        <Flex justify="center">
        <Button>Checkout</Button>
      </Flex>
        <form onSubmit={orderSubmitHandler}>
        <Input
          label="First Name"
          inputKey="firstName"
          value={customerProfileState.firstName}
          changeHandler={inputChangeHandler}
        ></Input>
        <Input
          label="Last Name"
          inputKey="lastName"
          value={customerProfileState.lastName}
          changeHandler={inputChangeHandler}
        ></Input>
        <Input
          label="Email"
          inputKey="email"
          value={customerProfileState.email}
          changeHandler={inputChangeHandler}
        ></Input>
        <Input
          label="Telephone number"
          inputKey="telephone"
          value={customerProfileState.telephone}
          changeHandler={inputChangeHandler}
        ></Input>
              <button>Place Order</button>
        </form>
        </>
      ) : null}
      
    </>
  )
}
