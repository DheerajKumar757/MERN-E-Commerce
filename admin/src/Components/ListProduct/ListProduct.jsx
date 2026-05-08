import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import remove_icon from '../../assets/remove_icon.png'

const ListProduct = () => {

  const [allproducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setAllProducts(data)});
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  const remove_product = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  const filteredProducts = allproducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="listproduct-search-input"
        />
      </div>
      <div className="listproduct-format-main">
        <p>Image</p>
        <p>Title</p>
        <p>Old</p>
        <p>New</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {filteredProducts.map((product, index)=>{
          return  <>
          <div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{{remove_product(product.id)}}} className='listproduct-remove-icon' src={remove_icon} alt="" />
          </div>
          <hr/>
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct