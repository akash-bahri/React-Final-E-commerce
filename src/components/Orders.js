import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { addPost, load, login, register, addToCart, loadstate,DeleteOrder, placeOrder, loadOrders } from '../reducers/postReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Orders() {
  const [status, setStatus] = useState("default");
  const dispatch = useDispatch();  
  const isLoggedIn = useSelector((state) => state.posts.isLoggedIn);
  const currentUser = useSelector((state) => state.posts.currentUser);
  const orders = useSelector((state) => state.posts.orders);
  const myOrder = orders.filter((item) => item.user._id == currentUser._id)
  
  useEffect(() => {
    dispatch(loadOrders());
  }, []);
  useEffect(() => {
    dispatch(loadOrders());
  }, [orders,status]);

  const Delete = (id) => {
    dispatch(DeleteOrder(id));
    setTimeout(() => {  // Use setTimeout to allow time for the delete action to complete
      dispatch(loadOrders());
      setStatus("Order deleted");
    }, 500); // 500 ms delay, adjust as needed
  }

  if (isLoggedIn == "false") return <div>please login first</div>
  else return (
    <div>
      <h1>Orders</h1>
      <h2>Welcome to your orders! This is a protected area.</h2>
      <ol type='1'>
        {myOrder.map(items => (
          <div>
            <h4>{myOrder.indexOf(items) + 1}. Order ID: {items._id}</h4>
            {items.items.map(item => (
              <div><li key={item._id}>
                {item.name} - ${item.price}<br/>                        
              </li>
              </div>             
            ))}
            <button onClick={() => Delete(items._id)}>{items.user.username}Delete</button>
          </div>
        ))}
      </ol>
      STATUS :  {status}
    </div>
  );
}

export default Orders;
