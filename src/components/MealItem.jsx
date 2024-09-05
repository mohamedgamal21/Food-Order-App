import { useContext } from "react";

import { currencyFormating } from "../Util/Formating.js";
import Button from "./UI/Button.jsx";
import CartContext from "../Store/CartContext.jsx";


export default function MealItem({ meal }) {
    const cartCtx = useContext(CartContext);

    function handleAddMealToCart() {
        cartCtx.addItem(meal);
    }


    return (
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price" >{currencyFormating.format(meal.price)}</p>
                    <p className="meal-item-description"> {meal.description} </p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddMealToCart}>Add to cart</Button>
                </p>
            </article>
        </li>
    )
}
                // <button onClick={() => onSelectMeal(meal)}>
                // </button>
                // onSelect={handlePrice}
    //                 const [formatedPrice, isFormatedPrice] = useState()

    // function handlePrice(event) {
    //     isFormatedPrice(event);
    // }