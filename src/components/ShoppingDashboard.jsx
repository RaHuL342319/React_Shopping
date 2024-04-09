import React, { useEffect, useState } from 'react'
import {useCookies} from 'react-cookie';
import { Link, useNavigate } from "react-router-dom";
import ShoppingComponent from './ShoppingComponent';
import axios from 'axios';
import Products from './Products';

const ShoppingDashboard = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [email, setEmail] = useState();
  const [categories, setCategories] = useState([]);
  const[category, setCategory] = useState("All Categories");
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if(cookies['email'] === undefined){
      navigate('/login');
    }else{
      setEmail(cookies['email']);
    }
    
  },[]);

  const handleSignOut = () =>{
    removeCookie('email');
    navigate('/login');
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categories');
        const data = response.data;
        data.unshift({ _id: 1, category: "All Categories" }); // Prepend "All Categories"
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories(); // Immediately call the function

  }, []);

  const cartHandler = (e) => {
    console.log(e.target.id);
    fetch(`http://localhost:3000/products/${e.target.id}`)
      .then((response) => response.json())
      .then((data) => {
        setCartItems([...cartItems, data]);
      });
  };

  return (
    <div>
      <h1>Shopping Dashboard</h1>
      <h4>Login user: {email} - <button className='btn btn-link' onClick={handleSignOut}>SignOut</button></h4>
      {/* <ShoppingComponent /> */}

      <div className='row d-flex justify-content-between'>
            <div className="col-3">
            <select name="" id="" onChange={
              (e) => {
                setCategory(e.target.value);
              }
            }>
              {
                categories.map(item =>(
                  <option value={item.category}>{item.category}</option>
                ))
              }
        
            </select>
            </div>
            <div className='col-3'>
            <div className="col-4 mt-3 border">
          <div className="bg-danger text-center">
            <p>
              <span className="bi bi-cart"></span> Cart [
              {cartItems ? cartItems.length : 0}]
            </p>
          </div>
          <div>
            <CartDetails />
          </div>
        </div>
            </div>
      </div>

        <Products category={category} />
    </div>
  )
}

export default ShoppingDashboard