import React from 'react'
import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import back from '../assets/back.png';

export default function EditProduct() {
    
    const url = "https://products-backend.tomisteven.repl.co/api/products"


    let location = window.location.href;
    let idOrder = location.split('/')[4];

    const [product, setProduct] = useState({
        name : '',
        description : '',
        price : ''
    })
    const [image, setImage] = useState();

    const getProduct = async () => {
        const product = await fetch(url + "/getproduct/" + idOrder);
        const data = await product.json();
        setProduct({
            name : data.name,
            description : data.description,
            price : data.price
        })

        setImage(data.image.secure_url)

        console.log(data);
        
    }


    const handleTextChange = (e) => {
        setProduct({
            ...product,[e.target.name]: e.target.value
        })

        console.log(product);
    }

    const editProduct = async (e) => {
        e.preventDefault();
        try {
            const _product = await fetch(url + "/editproduct/" + idOrder, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(product)
            })
            await _product.json()

            swal({
                title: "Producto editado",
                text: "El producto ha sido editado",
                icon: "success",
                button: "Aceptar",
            }).then(function() {
                window.location.href = "/"
            });

            

            

        } catch (error) {
            alert("Error al crear el usuario")
            console.log(error)
        }
    }


    useEffect(() => {
        getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);






/* action={`http://localhost:8080/api/products/editproduct/${idOrder}`} */

    return (
        <div className="container">
  
            <div className='product-title'>Editar Producto</div>
        
                <div class="cont-img-edit">
                    <img className='img-edit' src={image} alt=""/>
                </div>
                <div className='product-form'>
                    <form onSubmit={editProduct} encType="multipart/form-data">
                        <div className='product-form-title'>Nombre</div>
                        <input value={product.name} onChange={handleTextChange} className='product-form-input' type="text" name="name" id="name"/>
                        <div className='product-form-title'>Descripcion</div>
                        <input value={product.description} onChange={handleTextChange} className='product-form-input' type="text" name="description" id="description"/>
                        <div className='product-form-title'>Precio</div>
                        <input value={product.price} onChange={handleTextChange} className='product-form-input' type="text" name="price" id="price"/>
                        <button type='submit' className='product-form-button'>Crear</button>
                    </form>
                </div>

            <Link to={"/"}>
                <img className='back-img' src={back} alt=""/>
            </Link>
  
  
        </div>
    )
}
