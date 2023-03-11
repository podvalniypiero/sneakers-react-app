import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import Drawer from './components/Drawer';
import { useState,useEffect } from 'react';
import axios from 'axios';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';


import AppContext from './context';





const arr = [

];

function App() {
  
  const [items, setItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState(['']);
  const [cartItems, setCartItems] = React.useState([]); // сюда передается обьект onAddToCart
  const [cartOpened , setCartOpened] = React.useState(false);
  const [favorites, setFavorites] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect ( () => {  // главную функцию useEffect нельзя делать async

    async function fetchData () {
      setIsLoading(true);
    const cartResponse = await axios.get(`https://63760f70b5f0e1eb85017e9f.mockapi.io/cart`);
    const favoritesResponse = await axios.get(`https://63760f70b5f0e1eb85017e9f.mockapi.io/favorites`);
    const itemsResponse =  await axios.get(`https://63760f70b5f0e1eb85017e9f.mockapi.io/items`);

    setIsLoading(false);
   
    setCartItems(cartResponse.data);
    setFavorites(favoritesResponse.data);
    console.log (itemsResponse.data);
    setItems(itemsResponse.data);
    }
      fetchData();

  },[]);

  const onAddToCart = (obj) => {
  
    if (cartItems.find((item)=> Number(item.id) === Number(obj.id))) {
      axios.delete(`https://63760f70b5f0e1eb85017e9f.mockapi.io/cart/${obj.id}`); // удаление обьекта из сервера
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id))) // визуально удаляем из state
    }
    else{
       axios.post(`https://63760f70b5f0e1eb85017e9f.mockapi.io/cart`, obj); //добавляем на сервер
       setCartItems((prev)=> [...prev,obj]); // визуально добавляем в state
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://63760f70b5f0e1eb85017e9f.mockapi.io/cart/${id}`); 
    setCartItems((prev) => prev.filter((item) => item.id !== id));  // визуальная очистка корзины
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onAddToFavorite = async (obj) => {
    try{
    if (favorites.find ((favObj) => favObj.id === obj.id )) {
      // if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id)))
      axios.delete(`https://63760f70b5f0e1eb85017e9f.mockapi.io/favorites/${obj.id}`); 
      setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
    }
    else {
    const {data} = await  axios.post(`https://63760f70b5f0e1eb85017e9f.mockapi.io/favorites`, obj); 
    setFavorites(prev => [...prev, data]);
    }
  }
   catch(error){
    alert('Не удалось добавить в избранное...');
   }
  
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj)=> Number(obj.id) === Number(id));
  };

  return (

    <AppContext.Provider
    value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}>
    
    <div className="wrapper clear ">
      {/* {cartOpened && (<Drawer items = {cartItems} onClose = {() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened}/> )} */}
      <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
      <Header 
          onClickCart = {() => setCartOpened(true) }/>

      <Routes>
        <Route path="" element = {
          <Home
          items={items}
          cartItems={cartItems}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          isLoading={isLoading}
        />
        }/>

      <Route path = "/" element = {
      <Home 
          items={items} 
          cartItems = {cartItems}
          searchValue={searchValue} 
          setSearchValue={setSearchValue} 
          onChangeSearchInput={onChangeSearchInput} 
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          // isLoading = {!items.length}
          isLoading = {isLoading}
      />
      }/>

      <Route path='/favorites' element = {
          <Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>
      }/>

      <Route path='/orders' element = {
          <Orders/>
      }/>
      
      </Routes>
    </div>
    </AppContext.Provider>
  );
}

export default App;