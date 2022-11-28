import styles from './Card.module.scss';
import React from 'react';

 function Card({id, title, imageURL, price, onFavorite, onPlus, favorited = false}){
  console.log(favorited);
  const [isAdded, setIsAdded] = React.useState(false);
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
        <div className={styles.favourite}>
        <img onClick={onClickFavorite} src = {isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt="favourite"/>
        
        </div>
      
        <img width={133} height={120} src={imageURL} alt="Sneakers"/>
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
      </div>
    );
 }

 export default Card;
