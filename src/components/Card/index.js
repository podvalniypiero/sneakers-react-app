import styles from './Card.module.scss';
import ContentLoader from 'react-content-loader';
import React from 'react';

 function Card({id, title, imageURL, price, onFavorite, onPlus, favorited = false, added = false,loading = false}){
  console.log(favorited);
  const [isAdded, setIsAdded] = React.useState(added);
  const[isFavorite,setIsFavorite] = React.useState(favorited);


  const onClickPlus = () => {
    onPlus({id,title,imageURL,price});
    setIsAdded(!isAdded);
  };
  const onClickFavorite = () => {
    onFavorite({id,title,imageURL,price});
    setIsFavorite(!isFavorite);
  };

  React.useEffect(() => {
    console.log("Переменная изменилась");
  }, [isAdded]);

  const onClickButton = () => {
    alert(title);
  };


    return (
    <div className={styles.card}>
    { loading ?    
    <ContentLoader 
    speed={2}
    width={155}
    height={250}
    viewBox="0 0 155 265"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    // {...props}
  >
    <rect x="1" y="0" rx="10" ry="10" width="155" height="155" /> 
    <rect x="0" y="1167" rx="5" ry="5" width="155" height="15" /> 
    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" /> 
    <rect x="1" y="234" rx="5" ry="5" width="80" height="25" /> 
    <rect x="124" y="230" rx="10" ry="10" width="32" height="32" /> 

  </ContentLoader> : <>  
        <div className={styles.favourite}>
        <img onClick={onClickFavorite} src = {isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt="favourite"/> 
        </div>
      
        <img width='100%' height={135} src={imageURL} alt="Sneakers"/>
        <h5>{title}</h5>
        <div className=" d-flex justify-between align-center ">
          <div className="flex flex-column">
          <p><span>Цена:</span></p>
            <b>{price} руб.</b>
          </div>
          
          <img 
          className={styles.plus} 
          onClick = {onClickPlus} 
          src={ isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}/>
          
          </div>
          </> }

      </div>
    );
 }

 export default Card;
