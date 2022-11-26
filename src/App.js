import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import { useState,useEffect } from 'react';
import axios from 'axios';


const arr = [

];

function App() {
  const [items, setItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState(['']);
  const [cartItems, setCartItems] = React.useState([]); // сюда передается обьект onAddToCart
  const [cartOpened , setCartOpened] = React.useState(false);



  React.useEffect(()=>{
    // fetch('https://63760f70b5f0e1eb85017e9f.mockapi.io/items')
    // .then( (res) => {
    //   return res.json();
    // })
    // .then((json) => {
    //   setItems(json);
    // });
     axios.get('https://63760f70b5f0e1eb85017e9f.mockapi.io/items').then((res)=>{
      setItems(res.data);
    });

  },[]);

  const onAddToCart = (obj) =>{
    // setCartItems([...cartItems, obj]);
    setCartItems(prev => [...prev, obj]);  
  // console.log(obj);
  };
  //  console.log(cartItems);

  const onChangeSearchInput = (event) => {
    //console.log(event.target.value);
    setSearchValue(event.target.value);
  }

  return (

    <div className="wrapper clear">

      {cartOpened && <Drawer items = {cartItems} onClose = {() => setCartOpened(false)} /> }

      <Header onClickCart = {() => setCartOpened(true)}  />

     <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
      <h1> {(searchValue!='') ?`Поиск по запросу: "${searchValue}"` : `Все кроссовки`}</h1>
      
      <div className=" search-block d-flex ">
        <img src="/img/search.svg" alt="Search..."/>
        {searchValue && <img  
        onClick={ () => setSearchValue('')}   
        className='clear cu-p' 
        src='/img/btn-remove.svg' alt='clear'/> }

        <input onChange={onChangeSearchInput}  placeholder="Поиск..." value={searchValue} defaultValue=''/>
      </div>
      </div>
      <div className="sneakers d-flex flex-wrap">
        
        {items.filter(item => item.title.toLowerCase().includes(searchValue)). 
        map((item,index) => (
          <Card
          key ={index}
          title={item.title}
          price = {item.price}
          imageURL = {item.imageURL}
          onFavourite={ () => console.log("Добавили в закладки")}
          onPlus={(obj) =>onAddToCart(obj)}
          />
        ))}

      </div>

     </div>
    </div>
  );
}

export default App;
