import { createSlice } from '@reduxjs/toolkit';
import React, { useState, useEffect } from "react";
//import {NavLogin} from '../App'
import {Login} from '../components/login';
import { useNavigate } from 'react-router-dom';
var temp = "false";
const Nav = () => {
const navigate = useNavigate();
navigate('/home');
}

const postSlice = createSlice({
  
  name: 'posts',
  initialState: { 
    posts: [],
    isLoggedIn: "false",
  },
  reducers: {
    addPost: (state, action) => {
      const { data, timestamp } = action.payload;
      state.posts.push({ data, timestamp });
      console.log("helllo:"+data)
      console.log(state.posts.map((post) => post.data));
//-----------------------------------------------------------------------------------
   
       
//-----------------------------------------------------------------------------------

    },  
    editPost: (state,action) => {
      const { data, timestamp, post_id } = action.payload;
      state.posts[post_id] = {
        data: data,
        timestamp: timestamp
      }

    },

    register: (state, action) => {
      
      var userdata= {
        // Your data object to be sent to the API
        username: action.payload.username,
        password: action.payload.password
        // Add other keys and values as needed
      };
      state.posts.push(userdata);
      const registerUser = async () => {
        try {
          const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/userx', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTZiYWU4NGI4YzFjNDcxZmI4MmFhNiIsInVzZXJuYW1lIjoiMDAyODk3MDA4UyIsImlhdCI6MTcwMDE4Mjc2OCwiZXhwIjoxNzAxNDc4NzY4fQ.4MTEsshkBbRPMlY6HmhZ6UiWiBnIjH9o2F_1tIohUGc"
              // Add any other headers required by your API (e.g., authorization headers)
            },
            body: JSON.stringify(userdata), // Convert data to JSON format
          });
    
          if (response.ok) {
            const responseData = await response.json();
            console.log('Data posted successfully:', responseData);
            // Handle successful response from the API
          } else {
            console.error('Failed to post data:', response.statusText);
            // Handle errors if the request fails
          }
        } catch (error) {
          console.error('Error posting data:', error);
          // Handle any network or other errors
        }
      };
      registerUser();
    },

    load: (state, action) => {
      
     var username= action.payload.username;
     var password= action.payload.password;
      const getUsers = async () => {
        try {
          const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/userx', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTZiYWU4NGI4YzFjNDcxZmI4MmFhNiIsInVzZXJuYW1lIjoiMDAyODk3MDA4UyIsImlhdCI6MTcwMDE4Mjc2OCwiZXhwIjoxNzAxNDc4NzY4fQ.4MTEsshkBbRPMlY6HmhZ6UiWiBnIjH9o2F_1tIohUGc"
              // Add any other headers required by your API (e.g., authorization headers)
            } // Convert data to JSON format
          });
          
          if (response.ok) {
            const users = await response.json();
            console.log('All users:', users);
           //return true;
            //someloginfunction(users,username,password);
            const userExists = users.data.some((user) => user.username === username && user.password === password);
            if(userExists){
              console.log("login success")
              temp="true";            
              console.log("....?")
              //state.isLoggedIn = true;
            }
            else{
              console.log("login failed")
              temp="false";
            }
            // Process the users array received from the server
          } else {
            console.error('Failed to fetch users:', response.statusText);
            // Handle errors if the request fails
          }
        } catch (error) {
          console.error('Error fetching users:', error);
          // Handle any network or other errors
        }
      };
      getUsers();
      state.posts.push({username:username,password:password});
      state.isLoggedIn = temp; 
      
      // Call the getUsers function to retrieve users
      
      console.log(state.isLoggedIn)
      
    }

  },

});


export const { addPost , editPost, login, register} = postSlice.actions;
export default postSlice.reducer;
