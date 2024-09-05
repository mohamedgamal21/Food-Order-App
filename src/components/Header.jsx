import { useContext } from 'react';

import logoImg from '../assets/logo.jpg';
import CartContext from '../Store/CartContext';
import UserProgressContext from '../Store/UserProgressContext';
import Button from './UI/Button.jsx';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalcartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    return (
        <header id='main-header'>
            <div id='title'>
                <img src={logoImg} alt="React Food App" />
                <h1>reactfood</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>
                    cart ({totalcartItems})
                </Button>
            </nav>
        </header>
    )
}