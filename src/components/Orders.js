import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { DeleteOrder, loadOrders } from '../reducers/postReducer';
import { useDispatch } from 'react-redux';

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
            <div>
            <h4>{myOrder.indexOf(items) + 1}. Order ID: {items._id}</h4>
            {items.items.map(item => (
              <div  className='listitems'><li key={item._id}>
                {item.name} - ${item.price}<br/>                        
              </li>
              </div>          
            ))}</div>   
            <button  className='cartbutton' onClick={() => Delete(items._id)}>Delete</button>
          </div>
        ))}
      </ol>
      STATUS :  {status}
    </div>
  );
}

export default Orders;
