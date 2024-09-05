import { useContext } from "react";

import Modal from "./UI/Modal.jsx";
import CartContext from "../Store/CartContext.jsx";
import { currencyFormating } from "../Util/Formating.js";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../Store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice += item.quantity * item.price
    }, 0)

    function handelCloseCart() {
        userProgressCtx.hideCart();
    }

    function handelGoToCheckout() {
        userProgressCtx.showCheckout();
    }

    // function handelHideCheckout() {
    //     userProgressCtx.hideCheckout();
    // }

    return (
        <Modal
            className="cart"
            open={userProgressCtx.progress === "cart"}
            onClose={userProgressCtx.progress === "cart" ? handelCloseCart : null}
        >
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onIncrease={ () => cartCtx.addItem(item) }
                        onDecrease={ () => cartCtx.removeItem(item.id) }
                    />
                ))}
            </ul>
            <p className="cart-total">{currencyFormating.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handelCloseCart}>Close</Button>
                {cartCtx.items.length > 0 && (
                    <Button onClick={handelGoToCheckout}>Go to Checkout</Button>
                )}
            </p>
        </Modal>
    )
}