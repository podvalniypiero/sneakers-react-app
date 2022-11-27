import styles from './Card.module.scss';
import React from 'react';

 function Card({ title, imageURL, price, onFavourite, onPlus }){

  const [isAdded, setIsAdded] = React.useState(false);
  const[isFavourite,setIsFavourite] = React.useState(false);

  const onClickPlus = () => {
    onPlus({title,imageURL,price});
    setIsAdded(!isAdded);
  };

  React.useEffect(() => {
    console.log("Переменная изменилась");
  }, [isAdded]);

  const onClickButton = () => {
    alert(title);
  };

  const onClickFavourite = () => {
    setIsFavourite(!isFavourite);
  };
    return (
        <div className={styles.card}>
        <div className={styles.favourite} onClick = {onClickFavourite}>
        <img src = {isFavourite ? "/img/liked.svg" : "/img/unliked.svg"} alt="favourite"/>
        
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
