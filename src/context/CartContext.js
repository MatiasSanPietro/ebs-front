import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    // Buscar el producto en el carrito con el id proporcionado
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // El producto ya existe en el carrito, no se agregara nuevamente, pero podemos incrementar su cantidad
      const updatedCartItems = cartItems.map((item) =>
        item.id === existingItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      // El producto no existe en el carrito, se agrega con quantity igual a 1
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...product, quantity: 1 },
      ]);
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, { ...product, quantity: 1 }])
      );
    }
  };

  // Function to increase the quantity of a product
  const increaseQuantity = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    // Buscar el producto en el carrito con el id proporcionado
    const productIndex = cartItems.findIndex((item) => item.id === productId);

    if (productIndex !== -1) {
      // Clonar el arreglo de cartItems para no modificar el estado directamente
      const updatedCartItems = [...cartItems];

      // Disminuir la cantidad del producto en 1
      updatedCartItems[productIndex].quantity -= 1;

      // Si la cantidad del producto llega a 0, eliminar completamente el producto del carrito
      if (updatedCartItems[productIndex].quantity === 0) {
        updatedCartItems.splice(productIndex, 1);

        // Verificar si el carrito está vacío y recargar la página
        if (updatedCartItems.length === 0) {
          setCartItems([]); // Actualizamos el carrito con un arreglo vacío
          localStorage.removeItem("cartItems");
          window.location.reload(); // Recargar la página
          return;
        }
      }

      // Actualizar el estado del carrito con los cambios realizados
      setCartItems(updatedCartItems);

      // Actualizar el localStorage para reflejar los cambios
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  // Function to get the cartItems from localStorage when the component mounts
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
