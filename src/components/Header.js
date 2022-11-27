function Header(props){
    return(
        <header className="d-flex justify-between align-center p-40">
      
        <div className="d-flex align-center">
        <img width="40" height="40" src="/img/logo.png"/>
        
        <div className="headerInfo">
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
        <ul className="headerRight d-flex">

          <li onClick = {props.onClickCart} className="mr-30 cu-p">
          <img src="/img/cart.svg" alt="cart" width={18} height={18}/>
          <span> 1205 руб.</span>
          </li>
          <li className="mr-20 cu-p">
         <img src="/img/fav.svg" alt="favorites" width={18} height={18}/>
          </li>
         <li>
         <img src="/img/user.svg" alt="user" width={18} height={18}/>
          </li>
        </ul>
       </header>
    )
}

export default Header;