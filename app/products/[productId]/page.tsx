
import { products } from '@/utils/constant'
import React from 'react'
function productId() {
   
  return (
    <div>
        {products.map((product)=>(
            <div key={product.id} className='border m-3'>
            <h1 className='font-bold text-3xl'>
                {product.name}
            </h1>
            <h1>
                {product.price}
            </h1>
            </div>
        ))}
    </div>
  )
}

export default productId