import React, {useReducer, useState} from 'react';
import Header from './components/Header.js'
import Meals from './components/Meals.js'
import CartContext from './store/CartContext.js';
import Modal from './components/UI/Modal.js';

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    )

    let updatedItems

    if (existingCartItemIndex !== -1) {
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = {
        ...updatedItems[existingCartItemIndex],
        quantity: updatedItems[existingCartItemIndex].quantity + 1,
      }

    } else {
      updatedItems = [...state.items, { ...action.item, quantity: 1 }]
    }

    return { items: updatedItems }
  }

  if (action.type === "CLEAR_CART") {
    return { items: [] }
  }

  return state
}

const App = () => {

   const [cartState, dispatchCartAction] = useReducer(cartReducer, { items: [] })
     const [modalOpen, setModalOpen] = useState(false)
 
   const addItemToCartHandler = (item) => {
     dispatchCartAction({ type: "ADD_ITEM", item })
   };
const openModalHandler = () => {
    setModalOpen(true)
  }

  const closeModalHandler = () => {
    setModalOpen(false)
  }

  const checkoutHandler = () => {
    dispatchCartAction({ type: "CLEAR_CART" })
    setModalOpen(false)
  }

  const totalItems = cartState.items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = cartState.items.reduce((total, item) => total + (item.price * item.quantity), 0)
 return (
    <>
     <CartContext.Provider value={{ items: cartState.items, addItem: addItemToCartHandler }}>
     <Header onOpenCart={openModalHandler} totalItems={totalItems} />
    <main>
    <Meals />
    <Modal isOpen={modalOpen} onClose={closeModalHandler} onCheckout={checkoutHandler}>
           <h2>Your Cart</h2>
           <ul className="cart">
             {cartState.items.map((item) => (
               <li key={item.id}>
                 {item.name} - {item.quantity}
               </li>
             ))}
           </ul>
           <p className="cart-total">{totalPrice.toFixed(2).replace('.', ',')} €</p>
         </Modal>
    </main>
    </CartContext.Provider>

    </>
  );
}

export default App;