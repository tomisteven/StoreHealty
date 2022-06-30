import React from 'react';
import { useEffect, useState} from 'react';
import '../Styles/App.css';
import swal from 'sweetalert';

import { Link } from 'react-router-dom';

import { SpinnerRoundOutlined } from 'spinners-react';
import arrow from '../assets/arrow.png';

export default function ProductList() {

  const url = "https://products-backend.tomisteven.repl.co/api/products"

  

  const [admin, setAdmin] = useState(false);
  
  const [products, setProducts] = useState({
    _products: [],
    loading: true
  });

  const getPoducts = async () => {
    const product = await fetch(url);
    const data = await product.json();
    setProducts({
      _products: data,
      loading: false
    });

  }

  const deleteProduct = async (id) => {
    
    setProducts({
      ...products,
      loading: true
    })
    const product = await fetch(url + "/deleteproduct/" + id, {
      method: 'DELETE'
    });
    await product.json();

    //despues de eliminar el producto, actualizar la lista de productos
     const productos = await fetch(url);
      const data = await productos.json();
      setProducts({
        _products: data,
        loading: false
      });

      swal("Producto eliminado", "El producto ha sido eliminado", "success");
   }

  

  const changeVariable = () => {
    setProducts({
      ...products,
      loading: true
    })
    setAdmin(!admin);
    setProducts({
      ...products,
      loading: false
    })
  }

  const searchProducts = async (e) => {
    //buscar ordenes por nombre
    const product = await fetch(url);
    const data = await product.json();
    const search = document.getElementById('search').value;
    const orderProduct = await data.filter(product => product.name.includes(search) || product.name.includes(search.toUpperCase()));

    if(orderProduct.length > 0){
  
    setProducts({
      _products: orderProduct,
      loading: false
    });
    }else{
      swal("No se encontraron productos", "", "error");
    }
  }

  useEffect(() => {
    getPoducts();
    
    searchProducts();
    
  }  , []);



  return (
    <div>
      
      {products.loading ? (
        <div className="cont-loader">
           <SpinnerRoundOutlined size={69} thickness={167} speed={100} color="rgba(172, 130, 57, 1)" />
        </div>
      ) : (
        <div>
          <div className="cont-btn-actions-init">
              <input className="btn-administrar" onClick={changeVariable}  type="button" value="Administrar"/>
              <Link to="/createProduct" className="btn-newproduct">Nuevo Producto</Link>
        </div>
      <h1 className='title-list'>Product List</h1>
      <div className="cont-search">
        <h4>Buscar tu producto por precio, descripcion o nombre  <span style={{
          color: 'red',
        }}>-- Respetando las Mayusculas --</span>  </h4>
        <img className='img-search' src={arrow} alt=""/>
        <input className='input-search-products' onChange={searchProducts} type="search" name="search" id="search"/>
        
      </div>
        <div className='ul-list-products'>
          {products._products.map(product => (
            <div key={product._id} className="cont-product">
              <h2 className='li-name'>{product.name}</h2>
               <img className='li-img' src={product.image.secure_url} alt=""/>
              <p className='li-description' >{product.description}</p>
              
              <p className='li-price'>Precio   ${product.price}</p>
              <div className={
                admin ? 'cont-admin-product' : 'cont-admin-product-hide'
              } >
                <Link to={`/editProduct/${product._id}`} className="li-btn-edit">Editar</Link>
                <button onClick={()=> deleteProduct(product._id)} className='li-btn-delete'>Eliminar</button>
              </div>

            </div>
            
          ))}
          </div>
        </div>
      )}
      
    </div>
  );
}


