import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { DeleteOrder, loadOrders } from '../reducers/postReducer';
import { useDispatch } from 'react-redux';


function Orders() {
  const [status, setStatus] = useState("");
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
  }, [orders, status]);

  const Delete = (id) => {
    dispatch(DeleteOrder(id));
    dispatch(loadOrders());
    setStatus("Order deleted");
    setTimeout(() => {  // Use setTimeout to allow time for the delete action to complete
      setStatus("Orders deleted");
    }, 600); // 500 ms delay, adjust as needed
  }

  if (isLoggedIn == "false") return <div>please login first</div>
  else return (
    <div>
      <div className='status'><h3>{status}</h3></div>
      <h1>Orders</h1>
      <h2>Welcome to your orders!.</h2>
      <ol type='1'>
        {myOrder.map((order, index) => (
          <div key={order._id}>
            <div>
              <h4>{index + 1}. Order ID: {order._id}</h4>
              {order.items.map((item, itemIndex) => (
                <div className='listitems' key={item._id}>
                  <li>
                    {item.name} - ${item.price}<br />
                  </li>
                </div>
              ))}
            </div>
            <button className='cartbuttons' onClick={() => Delete(order._id)}>Cancel Order</button>
          </div>
        ))}
      </ol>
    </div>
  );
}

export default Orders;
