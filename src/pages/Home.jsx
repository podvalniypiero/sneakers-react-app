import Card from '../components/Card';

function Home(
  {items, 
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart}) 
{
 
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
        
        {items.filter(item => item.title.toLowerCase().includes(searchValue)). 
        map((item,index) => (
          <Card
          key ={index}
          title={item.title}
          price = {item.price}
          imageURL = {item.imageURL}
          onFavorite={(obj) => onAddToFavorite(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          />
        ))}

      </div>

     </div>
    );
}

export default Home;