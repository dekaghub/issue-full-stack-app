import React from 'react'
import AddtoCart from './AddtoCart'
import styles from './ProductCard.module.css'

const ProductCard = () => {
  return (
    <div className={styles.card}>
        <AddtoCart />
    </div>
  )
}

export default ProductCard