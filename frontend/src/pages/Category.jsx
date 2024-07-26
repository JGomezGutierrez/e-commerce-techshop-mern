import React from 'react'
import { useParams } from 'react-router-dom'

const Category = () => {
    const params = useParams();
  
  return (
    <div>
        {params?.categoryName}
    </div>
  )
}

export default Category