import { createSlice } from '@reduxjs/toolkit';

var data = [];
var catalog = [];
var temp = "false";
var orders = [];
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTZiYWU4NGI4YzFjNDcxZmI4MmFhNiIsInVzZXJuYW1lIjoiMDAyODk3MDA4UyIsImlhdCI6MTcwMDE4Mjc2OCwiZXhwIjoxNzAxNDc4NzY4fQ.4MTEsshkBbRPMlY6HmhZ6UiWiBnIjH9o2F_1tIohUGc";

const postSlice = createSlice({

  name: 'posts',
  initialState: {
    AllUsers: [],
    catalog: [],
    orders: [],
    posts: [],
    data: [],
    cart: [],
    isLoggedIn: "false",
    currentUser: {},
  },
  reducers: {
    register: (state, action) => {

      var userdata = {
        username: action.payload.username,
        password: action.payload.password
      };
      state.posts.push(userdata);
      const registerUser = async () => {
        try {
          const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/userx', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify(userdata),
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log('Data posted successfully:', responseData);
          } else {
            console.error('Failed to post data:', response.statusText);
          }
        } catch (error) {
          console.error('Error posting data:', error);
        }
      };
      registerUser();
    },

    login: (state, action) => {

      var username = action.payload.username;
      var password = action.payload.password;
      const userExists = data.find((user) => user.username === username && user.password === password);
      if (userExists) {
        temp = "true";
        state.isLoggedIn = temp;
        state.currentUser = userExists;
      }
      else {
        temp = "false";
        state.isLoggedIn = temp;
        state.currentUser = {};
      }
    },
    loadstate: (state, action) => {
      state.AllUsers = data;
      state.catalog = catalog;
      state.orders = orders;

    },
    load: (state, action) => {
      const getUsers = async () => {
        try {
          const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/userx', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTZiYWU4NGI4YzFjNDcxZmI4MmFhNiIsInVzZXJuYW1lIjoiMDAyODk3MDA4UyIsImlhdCI6MTcwMDE4Mjc2OCwiZXhwIjoxNzAxNDc4NzY4fQ.4MTEsshkBbRPMlY6HmhZ6UiWiBnIjH9o2F_1tIohUGc"
              // Add any other headers required by your API (e.g., authorization headers)
            } // Convert data to JSON format
          });


          if (response.ok) {
            const users = await response.json();
            data = users.data;

            console.log('Loading All users:', users.data);
          } else {
            console.error('Failed to fetch users:', response.statusText);
            // Handle errors if the request fails
          }
        } catch (error) {
          console.error('Error fetching users:', error);
          // Handle any network or other errors
        }
      };
      const getCatalog = async () => {
        try {
          const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/catalog', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTZiYWU4NGI4YzFjNDcxZmI4MmFhNiIsInVzZXJuYW1lIjoiMDAyODk3MDA4UyIsImlhdCI6MTcwMDE4Mjc2OCwiZXhwIjoxNzAxNDc4NzY4fQ.4MTEsshkBbRPMlY6HmhZ6UiWiBnIjH9o2F_1tIohUGc"
              // Add any other headers required by your API (e.g., authorization headers)
            } // Convert data to JSON format
          });


          if (response.ok) {
            const Catalogfromapi = await response.json();
            catalog = Catalogfromapi.data;

            console.log('Loading All catalog:', Catalogfromapi.data);
          } else {
            console.error('Failed to fetch catalog:', response.statusText);
            // Handle errors if the request fails
          }
        } catch (error) {
          console.error('Error fetching catalog:', error);
          // Handle any network or other errors
        }
      };
      getUsers();
      getCatalog();
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    deleteFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    placeOrder: (state, action) => {
      state.cart = [];
      const order = action.payload;
      const placeNewOrder = async () => {
        try {
          const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify(order),
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log('Order placed successfully:', responseData);
          } else {
            console.error('Failed to place order:', response.statusText);
          }
        } catch (error) {
          console.error('Error placing order:', error);
        }
      };
      placeNewOrder();
      const getOrders = async () => {
        try {
          const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/orders', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          });


          if (response.ok) {
            const Ordersfromapi = await response.json();
            orders = Ordersfromapi.data;
          } else {
            console.error('Failed to fetch catalog:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching catalog:', error);
        }
      };
      getOrders();
      state.orders = orders;

    },
    loadOrders: (state, action) => {
      const getOrders = async () => {
        try {
          const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/orders', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          });


          if (response.ok) {
            const Ordersfromapi = await response.json();
            orders = Ordersfromapi.data;
          } else {
            console.error('Failed to fetch catalog:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching catalog:', error);
        }
      };
      getOrders();
      state.orders = orders;
    },
    DeleteOrder: (state, action) => {
      const id = action.payload;
      id.toString();
      const link = `https://smooth-comfort-405104.uc.r.appspot.com/document/deleteOne/orders/${id}`;
      const deleteOrders = async () => {
        try {
          const response = await fetch(link, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          });
          if (response.ok) {
            const deleted = await response.json();
            console.log(deleted.message);
          } else {
            console.error('Failed to delete', response.statusText);
          }
        } catch (error) {
          console.error('Error deleting', error);
        }
      };

      const getOrders = async () => {
        try {
          const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/orders', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            } 
          });

          if (response.ok) {
            const Ordersfromapi = await response.json();
            orders = Ordersfromapi.data;
          } else {
            console.error('Failed to fetch catalog:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching catalog:', error);
        }
      };
      deleteOrders();
      getOrders();
      state.orders = orders;
    },
    logout: (state, action) => {
      state.isLoggedIn = "false";
      state.currentUser = {};
      state.cart = [];

    }
  },

});


export const { load, logout, login, register, deleteFromCart, DeleteOrder,
  loadstate, addToCart, placeOrder, loadOrders } = postSlice.actions;
export default postSlice.reducer;
