import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  paymentMethod: "", // Método de pago seleccionado
  totalAmount: 0, // Monto total
  pdfSent: false, // Estado para saber si el PDF fue enviado
  orderCode: null, // Código de referencia (nuevo campo)
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find(item => item.name === product.name);

      if (!existingProduct) {
        state.items.push(product);
      } else {
        existingProduct.quantity += product.quantity;
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const product = state.items.find(item => item.name === name);
      if (product && quantity > 0) {
        product.quantity = quantity;
      }
    },
    removeFromCart: (state, action) => {
      const name = action.payload;
      state.items = state.items.filter(item => item.name !== name);
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    setPdfSent: (state, action) => {
      state.pdfSent = action.payload;
    },
    setOrderCode: (state, action) => {
      state.orderCode = action.payload; // Establecer el código de referencia
    },
  },
});

export const { 
  addToCart, 
  updateQuantity, 
  removeFromCart, 
  setPaymentMethod, 
  setTotalAmount, 
  setPdfSent,
  setOrderCode, // Nueva acción
} = cartSlice.actions;

export default cartSlice.reducer;
