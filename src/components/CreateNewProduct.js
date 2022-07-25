import React from 'react'
import { useState} from 'react'
import "../Styles/createProduct.css"
import { Link } from 'react-router-dom';
import back from '../assets/back.png';

export default function CreateNewProduct() {

    const [products, setProducts] = useState({
        name : '',
        description : '',
        image : '',
        price : ''
    })

    /*  */

    const handleTextChange = (e) => {
        setProducts({
            ...products,[e.target.name]: e.target.value
        })

        console.log(products);
    }
    
   

  return (
      <div className="container">

          <div className='product-title'>crear nuevo producto</div>

            <div className='product-form'>
                <form  action='https://products-backend.tomisteven.repl.co/api/products/newproduct'  method='post' encType="multipart/form-data">
                    <div className='product-form-title'>Nombre</div>
                    <input onChange={handleTextChange} className='product-form-input' type="text" name="name" id="name"/>
                    <div className='product-form-title'>Descripcion</div>
                    <input onChange={handleTextChange} className='product-form-input' type="text" name="description" id="description"/>
                    <div className='product-form-title'>Imagen</div>
                    <input onChange={handleTextChange} className='product-form-input' type="file" name="image" id="image"/>
                    <div className='product-form-title'>Precio</div>
                    <input onChange={handleTextChange} className='product-form-input' type="text" name="price" id="price"/>
                    <button type='submit' className='product-form-button'>Crear</button>
                </form>
                </div>
                <Link to={"/"}>
                <img className='back-img' src={back} alt=""/>
            </Link>

      </div>
  )
}
