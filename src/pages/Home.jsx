
import Card from '../components/Card';

const Home = ({items,cartItems,searchValue,setSearchValue,onChangeSearchInput,onAddToFavorite,onAddToCart,isLoading}) => {
 
  const renderItems = () =>{
    const filteredItems = items.filter((item) => 
    item.title.toLowerCase().includes(searchValue),
    );
    return (isLoading ? [...Array(10)] : filteredItems()).map((item,index) => (
      <Card
      key ={index}
      
      onFavorite={(obj) => onAddToFavorite(obj)}
      onPlus={(obj) => onAddToCart(obj)}
      added = {cartItems.some((obj)=> Number(obj.id) === Number(item.id))}
      loading = {false}
      {...item}
      />
    ))

  }
    
    return(
        <div className="content p-40 ">
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
          
          {renderItems()}
  
        </div>
  
       </div>
    )
    }
    
    export default Home;