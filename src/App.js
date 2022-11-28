import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import Drawer from './components/Drawer';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Home from './pages/Home';
import Favorites from './pages/Favorites';



const arr = [

];

function App() {
  
  const [items, setItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState(['']);
  const [cartItems, setCartItems] = React.useState([]); // сюда передается обьект onAddToCart
  const [cartOpened , setCartOpened] = React.useState(false);
  const [favorites, setFavorites] = React.useState(false);



  React.useEffect(()=>{

    // fetch('https://63760f70b5f0e1eb85017e9f.mockapi.io/items')
    // .then( (res) => {
    //   return res.json();
    // })
    // .then((json) => {
    //   setItems(json);
    // });

     axios.get(`https://63760f70b5f0e1eb85017e9f.mockapi.io/items`).then((res)=> { // получение
      setItems(res.data);
    });
    axios.get(`https://63760f70b5f0e1eb85017e9f.mockapi.io/cart`).then((res)=> { // получение
    setCartItems(res.data);
  });

    axios.get(`https://63760f70b5f0e1eb85017e9f.mockapi.io/favorites`).then((res) => {
      setFavorites(res.data);
    })

  },[]);

  const onAddToCart = (obj) => {
    axios.post(`https://63760f70b5f0e1eb85017e9f.mockapi.io/cart`, obj); // отправляем запрос на сервер
    setCartItems(prev => [...prev, obj]);  // визуально сохраняем в usestate
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://63760f70b5f0e1eb85017e9f.mockapi.io/cart/${id}`); 
    setCartItems((prev) => prev.filter((item) => item.id !== id));  // визуальная очистка корзины
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onAddToFavorite = async (obj) => {
    console.log(obj);
    if (favorites.find ((favObj) => favObj.id === obj.id )) {
      axios.delete(`https://63760f70b5f0e1eb85017e9f.mockapi.io/favorites/${obj.id}`); 
      setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
    }
    else {
    const {data} = await  axios.post(`https://63760f70b5f0e1eb85017e9f.mockapi.io/favorites`, obj); 
    setFavorites(prev => [...prev, data]);
    }
  };

  return (

    
    <div className="wrapper clear ">

      {cartOpened && <Drawer items = {cartItems} onClose = {() => setCartOpened(false)} onRemove={onRemoveItem}/> }

      <Header onClickCart = {() => setCartOpened(true) }/>

      
      <Routes>

      <Route path = "/" element = {
      <Home 
      items={items} 
      searchValue={searchValue} 
      setSearchValue={setSearchValue} 
      onChangeSearchInput={onChangeSearchInput} 
      onAddToFavorite={onAddToFavorite}
      onAddToCart={onAddToCart}
      />}/>

      <Route path='/favorites' element ={
        <Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>
      }/>
      
      </Routes>
      

      
      
     


    </div>
  );
}

export default App;