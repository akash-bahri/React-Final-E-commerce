import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { addToCart, loadstate } from '../reducers/postReducer';
import { useDispatch } from 'react-redux';


//var pvtcart=[{'_id':'-1','name':'-1','price':'-1'}];

function Dashboard() {
  const cart = useSelector((state) => state.posts.cart);
  const [status, setStatus] = useState("");

  const AddToCart = (item) => {
    if (cart.some(e => e._id === item._id)) {
      setStatus("Item already in cart");
      setTimeout(() => { 
        setStatus("");
      }, 1000);
      return;
    }
    dispatch(addToCart(item));
    setStatus(`${item.name} - added to cart.`);
    setTimeout(() => { 
      setStatus("");
    }, 1000);
  };
  const catalog = useSelector((state) => state.posts.catalog);
  const items = catalog;


  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(load());
    dispatch(loadstate());
    //pvtcart=[];
  }, []);

  return (
    <div>
      <div className='status'>{status}</div>
      <h1>Dashboard</h1>
      <h2>Welcome to your Shopping Website!</h2>
      <h3>Available Items:</h3>
      <ul>
        {items.map((item, index) => (
          <div className='list' key={item.name + index}>
            <li>
              <div className='listitem'>
                {index + 1}. {item.name} - ${item.price}
              </div>
              <button className='cartbutton' onClick={() => AddToCart(item)}>Add to Cart</button>
            </li>
          </div>
        ))}
      </ul>
      

    </div>
  );
}

export default Dashboard;
