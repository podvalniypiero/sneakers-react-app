import React from 'react';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Header from './components/Header';
import Drawer from './components/Drawer';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Home from './pages/Home';
import { Link } from 'react-router-dom';



// const arr = [
// ];

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

     axios.get('https://63760f70b5f0e1eb85017e9f.mockapi.io/items').then((res)=> { // получение
      setItems(res.data);
    });
    axios.get('https://63760f70b5f0e1eb85017e9f.mockapi.io/cart').then((res)=> { // получение
    setCartItems(res.data);
  });

    axios.get('https://63760f70b5f0e1eb85017e9f.mockapi.io/favotites').then((res)=> {
      setFavorites(res.data);
    })

  },[]);

  const onAddToCart = (obj) => {
    axios.post('https://63760f70b5f0e1eb85017e9f.mockapi.io/cart', obj); // отправляем запрос на сервер
    setCartItems(prev => [...prev, obj]);  // визуально сохраняем в usestate
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://63760f70b5f0e1eb85017e9f.mockapi.io/cart/${id}`); 
    setCartItems((prev) => prev.filter(item => item.id !== id));  // визуальная очистка корзины
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onAddToFavorite = (obj) => {
    axios.post('https://63760f70b5f0e1eb85017e9f.mockapi.io/favotites', obj); 
    setFavorites(prev => [...prev, obj]);
  };

  return (

    <div className="wrapper clear ">

      {cartOpened && <Drawer items = {cartItems} 
      onClose = {() => setCartOpened(false)} onRemove={onRemoveItem}/> }

      <Header onClickCart = {() => setCartOpened(true) }  />
      
      
      <Route path= "/" exact> 
      <Home 
      items={items} 
      searchValue={searchValue} 
      setSearchValue={setSearchValue} 
      onChangeSearchInput={onChangeSearchInput} 
      onAddToFavorite={onAddToFavorite} 
      onAddToCart={onAddToCart}/>
      </Route> 
      

    </div>
  );
}

export default App;
