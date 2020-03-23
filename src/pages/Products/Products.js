import React, { useState, useEffect } from 'react'
import Product from '../../components/Product'
import { Flex } from '../../components/shared/Flex/Flex'
import { CreateProductModal } from '../../components/CreateProductModal/CreateProductModal'
import { Button } from '../../components/shared/Button/Button'
import { useDispatch, useSelector } from 'react-redux'

const Products = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModalHandler = () => setIsModalOpen(!isModalOpen)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:4000/products')
      const products = await response.json()
      dispatch({ type: 'UPLOAD_PRODUCTS', products })
    }
    fetchProducts()
  }, [])

  return (
    <>
      <Button onClick={toggleModalHandler}>Create product</Button>
      <Flex wrap="wrap" justify="space-between">
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </Flex>
      <CreateProductModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModalHandler}
      />
    </>
  )
}

export default Products
