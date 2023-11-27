import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { deleteFromCart, placeOrder, loadOrders } from '../reducers/postReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [status, setStatus] = useState("");
  const cart = useSelector((state) => state.posts.cart);
  const isLoggedIn = useSelector((state) => state.posts.isLoggedIn);
  const currentUser = useSelector((state) => state.posts.currentUser);
  const orders = useSelector((state) => state.posts.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  
  useEffect(() => {
    setIsCheckoutVisible(cart.length !== 0);
  }, [cart.length]);

  useEffect(() => {
    dispatch(loadOrders());
  }, []);

  useEffect(() => {
    dispatch(loadOrders());
  }, [orders, status]);

  const Checkout = () => {

    if (cart.length == 0) {setStatus("Cart is empty")}
    else {
      setIsCheckoutVisible(true);
      const Order = { user: currentUser, items: cart };
      dispatch(placeOrder(Order));
      dispatch(loadOrders());
      setStatus("Order Placed");
    }
    setTimeout(() => { 
      setStatus("");
    }, 1000);
  }

  const Delete = (id) => {
    dispatch(deleteFromCart(id));
    setStatus("Item deleted from cart");
    setTimeout(() => { 
      setStatus("");
    }, 1000);

  }
  if (isLoggedIn == "false") return <div className='status'>Please Login !!!</div>
  else return (
    <div>
      <div className='status'>{status}</div>
      <h1>Cart</h1>
      <h2>Welcome to your cart!</h2>
      <h3>{cart.length} Items added :</h3>
      <ul>
        {cart.map(item => (
          <div className='' key={item._id}>
            <li>
              <p className='listitem'>{cart.indexOf(item) + 1}. {item.name} - ${item.price} </p>
              <button className='cartbutton' onClick={() => Delete(item._id)}>Delete</button>
            </li>
          </div>
        ))}
      </ul>
      <button 
  className='checkoutbutton' 
  onClick={Checkout} 
  style={{ display: isCheckoutVisible ? 'block' : 'none' }}
>
  Checkout
</button>
      
    </div>
  );
}

export default Cart;
