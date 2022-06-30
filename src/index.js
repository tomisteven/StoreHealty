import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import App from './components/App';
import CreateNewProduct from './components/CreateNewProduct';
import reportWebVitals from './reportWebVitals';


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import EditProduct from './components/EditProduct';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
       
        <Route path="/" element={<App />}></Route>
        <Route path="/createProduct" element={<CreateNewProduct />}></Route>
        <Route path="/editproduct/:id" element={<EditProduct />}></Route>

      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
