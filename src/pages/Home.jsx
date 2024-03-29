import React from 'react';
import Card from '../components/Card';
import styles from '../index.scss';

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toString().toLowerCase().includes(searchValue.toString().toLowerCase()),
    );
    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <div className={styles.container}>
        <h1>{searchValue.toString().length === 0 ? `Все кроссовки`: `Поиск по запросу: "${searchValue}"`}</h1>
        <div className="search-block d-flex">
          <img src="img/search.svg" alt="Search" />
          {searchValue.toString().length !== 0 && <img
              onClick={() => setSearchValue('')}
              className="clear cu-p"
              src="img/btn-remove.svg"
              alt="Clear"
            />  
          }
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
        </div>
        </div>
        
      </div>
      <div className=" itemsHome d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}
  
    
    export default Home;