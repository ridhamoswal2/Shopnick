import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Order, CartItem } from '../types/product';

interface OrdersState {
  orders: Order[];
  isOrdersOpen: boolean;
}

type OrdersAction =
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'TOGGLE_ORDERS' }
  | { type: 'LOAD_ORDERS'; payload: Order[] }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { orderId: string; status: Order['status'] } };

const OrdersContext = createContext<{
  state: OrdersState;
  dispatch: React.Dispatch<OrdersAction>;
} | null>(null);

// Load orders from localStorage
const loadOrdersFromStorage = (): Order[] => {
  try {
    const savedOrders = localStorage.getItem('storehub-orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  } catch (error) {
    console.error('Error loading orders from localStorage:', error);
    return [];
  }
};

// Save orders to localStorage
const saveOrdersToStorage = (orders: Order[]) => {
  try {
    localStorage.setItem('storehub-orders', JSON.stringify(orders));
  } catch (error) {
    console.error('Error saving orders to localStorage:', error);
  }
};

// Generate estimated delivery date (5-7 business days from now)
const generateEstimatedDelivery = (): string => {
  const today = new Date();
  const deliveryDays = Math.floor(Math.random() * 3) + 5; // 5-7 days
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + deliveryDays);
  return deliveryDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

function ordersReducer(state: OrdersState, action: OrdersAction): OrdersState {
  let newState: OrdersState;

  switch (action.type) {
    case 'LOAD_ORDERS':
      newState = {
        ...state,
        orders: action.payload,
      };
      break;
    case 'ADD_ORDER':
      const orderWithDelivery = {
        ...action.payload,
        estimatedDelivery: generateEstimatedDelivery()
      };
      newState = {
        ...state,
        orders: [orderWithDelivery, ...state.orders],
      };
      break;
    case 'UPDATE_ORDER_STATUS':
      newState = {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order
        ),
      };
      break;
    case 'TOGGLE_ORDERS':
      newState = {
        ...state,
        isOrdersOpen: !state.isOrdersOpen,
      };
      break;
    default:
      return state;
  }

  // Save to localStorage whenever orders change (except for TOGGLE_ORDERS and LOAD_ORDERS)
  if (action.type !== 'TOGGLE_ORDERS' && action.type !== 'LOAD_ORDERS') {
    saveOrdersToStorage(newState.orders);
  }

  return newState;
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(ordersReducer, {
    orders: [],
    isOrdersOpen: false,
  });

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = loadOrdersFromStorage();
    if (savedOrders.length > 0) {
      dispatch({ type: 'LOAD_ORDERS', payload: savedOrders });
    }
  }, []);

  return (
    <OrdersContext.Provider value={{ state, dispatch }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}

// Helper function to create an order
export const createOrder = (
  items: CartItem[],
  shippingInfo: any,
  paymentMethod: string
): Order => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.99;
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + shipping + tax;

  return {
    id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    items,
    total: subtotal,
    shipping,
    tax,
    finalTotal,
    orderDate: new Date().toISOString(),
    status: 'processing',
    shippingInfo,
    paymentMethod,
  };
};