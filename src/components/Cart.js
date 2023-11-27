import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { deleteFromCart, placeOrder, loadOrders } from '../reducers/postReducer';
import { useDispatch } from 'react-redux';

function Cart() {
  const [status, setStatus] = useState("");
  const cart = useSelector((state) => state.posts.cart);
  const isLoggedIn = useSelector((state) => state.posts.isLoggedIn);
  const currentUser = useSelector((state) => state.posts.currentUser);
  const orders = useSelector((state) => state.posts.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadOrders());
  }, []);
  
  useEffect(() => {
    dispatch(loadOrders());
  }, [orders,status]);

  const Checkout = () => {

    if (cart.length == 0) setStatus("Cart is empty");
    else {
      const Order = { user: currentUser, items: cart };
      dispatch(placeOrder(Order));
      dispatch(loadOrders());
      setStatus("Order Placed");
    }
  }

  const Delete = (id) => {
    dispatch(deleteFromCart(id));
    setStatus("Item deleted from cart");

  }
  if (isLoggedIn == "false") return <div>please login first</div>
  else return (
    <div>
      <h2>cart</h2>
      <p>Welcome to your cart! This is a protected area.</p>

      <h3>Available Items:</h3>
      <ul>
        {cart.map(item => (
          
          <div className=''>
           
            <li key={item._id}>
            <p className='listitem'>{cart.indexOf(item)+1}. {item.name} - ${item.price} </p>
            <button className='cartbutton' onClick={() => Delete(item._id)}>Delete</button> 
                      
            
          </li></div>
        ))}
      </ul>
      <br/>
      <button className='registerbutton' onClick={Checkout}>Checkout</button>
      <br /><br /><br />
      STATUS  :  {status}

    </div>
  );
}

export default Cart;
