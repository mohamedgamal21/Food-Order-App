import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartContextProvider } from "./Store/CartContext.jsx";
import { UserProgressContextProvider } from "./Store/UserProgressContext.jsx";

function App() {
  // const [isModal, setIsModal] = useState(false);

  // function handleModal() {
  //   setIsModal()
  // }

  return (
    <UserProgressContextProvider>
      <CartContextProvider>    
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
