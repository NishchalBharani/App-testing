import { createContext, useContext, useReducer, useEffect } from "react";

export const GlobalContext = createContext();

// Synchronously load persisted data for initial state to avoid overwrite on mount
const loadedInitialState = {
  isSearchDropdownOpen: false,
  isSortMenuOpen: false,
  isLoggedIn: (() => {
    try {
      return JSON.parse(localStorage.getItem("isLoggedIn")) ?? false;
    } catch (error) {
      console.error("Failed to parse isLoggedIn from storage:", error);
      return false;
    }
  })(),
  users: (() => {
    try {
      return JSON.parse(localStorage.getItem("userDetails")) ?? [];
    } catch (error) {
      console.error("Failed to parse userDetails from storage:", error);
      return [];
    }
  })(),
  searchQuery: "",
  selectedSort: "none",
  listings: (() => {
    try {
      return JSON.parse(localStorage.getItem("listings")) ?? [];
    } catch (error) {
      console.error("Failed to parse listings from storage:", error);
      return [];
    }
  })(),
  subtotal: 0,
  appliedCoupon: null,
  discountAmount: 0,
  lastAction: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: action.payload,
        lastAction: action.type,
      }
    case "USER_DETAILS":
      return {
        ...state,
        users: action.payload,
        lastAction: action.type,
      }
    case "TOGGLE_SEARCH_DROPDOWN":
      return {
        ...state,
        isSearchDropdownOpen: !state.isSearchDropdownOpen,
        lastAction: action.type,
      };
    case "CLOSE_SEARCH_DROPDOWN":
      return {
        ...state,
        isSearchDropdownOpen: false,
        lastAction: action.type,
      };
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
        lastAction: action.type,
      };
    case "SET_SORT":
      return {
        ...state,
        selectedSort: action.payload,
        lastAction: action.type,
      };
    case "SET_LISTINGS":
      return {
        ...state,
        listings: action.payload,
        lastAction: action.type,
      };
    case "APPLY_COUPON":
      return {
        ...state,
        appliedCoupon: action.payload.coupon,
        discountAmount: action.payload.discount,
        lastAction: action.type,
      };
    case "REMOVE_COUPON":
      return {
        ...state,
        appliedCoupon: null,
        discountAmount: 0,
        lastAction: action.type,
      };
    default:
      return state;
  }
}

export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, loadedInitialState);

  // Save changes to localStorage (no load needed here since done in initialState)
  useEffect(() => {
    localStorage.setItem("listings", JSON.stringify(state.listings));
    localStorage.setItem("isLoggedIn", JSON.stringify(state.isLoggedIn));
    localStorage.setItem("userDetails", JSON.stringify(state.users));
  }, [state.listings, state.isLoggedIn, state.users]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}

export default GlobalProvider;