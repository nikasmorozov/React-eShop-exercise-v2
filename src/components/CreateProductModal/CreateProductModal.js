import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import classes from './CreateProductModal.module.css'
import { random } from 'faker'
import { Input } from '../Input/Input'
import { useDispatch } from 'react-redux'

const emptyObject = () => ({
  id: random.uuid(),
  name: '',
  description: '',
  price: 0,
  quantity: '',
  image: `https://picsum.photos/id/${random.number(200) || 1}/600`
})

export const CreateProductModal = ({ isModalOpen, toggleModal }) => {
  const dispatch = useDispatch()
  const [formState, setFormState] = useState(emptyObject())
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const resetForm = () => {
    setFormState(emptyObject())
    setSuccess(false)
  }

  // Variantas
  useEffect(() => {
    resetForm()
  }, [isModalOpen])

  const generateDescriptionHandler = event => {
    event.preventDefault()
    setFormState({
      ...formState,
      description: random.words(250)
    })
  }

  const inputChangeHandler = (formStateKey, event) => {
    console.log('inputChangeHandler -> event', event)
    console.log('inputChangeHandler -> formStateKey', formStateKey)

    setFormState({
      ...formState,
      [formStateKey]: event.target.value
    })
  }

  const validate = () => {
    let isFormValid = true
    const errors = {}
    if (!formState.name || formState.name.length < 5) {
      isFormValid = false
      errors.name = 'Name must be longer than 5 symbols'
    }
    if (!formState.quantity || formState.quantity <= 0) {
      isFormValid = false
      errors.quantity = 'Quantity is required'
    }
    if (!formState.price) {
      isFormValid = false
      errors.price = 'Price is required'
    }
    setErrors(errors)
    return isFormValid
  }

  const formSubmitHandler = async event => {
    event.preventDefault()
    if (validate()) {
      const formStateCopy = {
        ...formState,
        price: Number(formState.price).toFixed(2)
      }
      const response = await fetch('http://localhost:4000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formStateCopy)
      })

      if (response.status === 201) {
        setSuccess(true)
        const newProduct = await response.json()
        dispatch({ type: 'ADD_NEW_PRODUCT', newProduct })
      }
    }
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={toggleModal}
      ariaHideApp={false}
    >
      <div>
        <h2 className={classes.heading}>Create product</h2>
        {success ? (
          <>
            <h2>Product created!</h2>
            <div className={classes.buttonList}>
              <button onClick={toggleModal}>Close</button>
              <button onClick={resetForm}>Create new product</button>
            </div>
          </>
        ) : (
          <form onSubmit={formSubmitHandler}>
            <Input
              inputKey="name"
              changeHandler={inputChangeHandler}
              errors={errors}
              label="Product name"
              value={formState.name}
            />
            <Input
              inputKey="description"
              value={formState.description}
              changeHandler={inputChangeHandler}
              label="Description"
              errors={errors}
              type="textarea"
            >
              <button onClick={generateDescriptionHandler}>
                Generate description
              </button>
            </Input>
            <Input
              inputKey="price"
              changeHandler={inputChangeHandler}
              errors={errors}
              label="Price"
              value={formState.price}
            />
            <Input
              inputKey="quantity"
              changeHandler={inputChangeHandler}
              errors={errors}
              label="Quantity"
              value={formState.quantity}
            />
            <div className={classes.buttonList}>
              <button onClick={toggleModal}>Cancel</button>
              <button>Create</button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  )
}
