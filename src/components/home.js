import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { addPost, load, login, register,addToCart, loadstate} from '../reducers/postReducer';
import { useDispatch } from 'react-redux';


//var pvtcart=[{'_id':'-1','name':'-1','price':'-1'}];

function Dashboard() {
  const cart = useSelector((state) => state.posts.cart);
  const [status, setStatus] = useState("");

  const AddToCart = (item) => {
    if(cart.some(e => e._id === item._id)) {
      setStatus("Item already in cart");
      return;
    }
    dispatch(addToCart(item));
    console.log(`Item ${item._id} added to cart.`);
    setStatus(`${item.name} - added to cart.`);
  };

 
    const AllUsers = useSelector((state) => state.posts.AllUsers);
    const loggendIn = useSelector((state) => state.posts.isLoggedIn); 
    const catalog = useSelector((state) => state.posts.catalog);
const items = catalog;
    
    
    const dispatch= useDispatch();
    useEffect(() => {
      // dispatch(load());
      dispatch(loadstate());
      //pvtcart=[];
    }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard! This is a protected area.</p>

      <h3>Available Items:</h3>
      <ul>
        {items.map(item => (
          <div><li 
          key={item._id}>
            {items.indexOf(item)+1}. {item.name} - ${item.price} 
            <button onClick={() => AddToCart(item)}>Add to Cart</button>
            </li></div>
        ))}
      </ul>
      
      <br/><br/><br/><div>STATUS  :  {status}</div>
     
    </div>
  );
}

export default Dashboard;
