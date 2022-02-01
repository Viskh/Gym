import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger/src";
import auth from "./features/auth";
import { trainerReducer } from "./features/trainer";
import { subscriptionsReducer } from "./features/subscription";
import { profileReducer } from "./features/profile";
import { adminReducer } from "./features/admin";
import { productsReducer } from "./features/shop";
import { cartReducer } from "./features/cart";

const logger = createLogger({
  diff: true,
  collapsed: true,
});

const combineReducer = combineReducers({ auth, subscriptionsReducer, trainerReducer, profileReducer, adminReducer, productsReducer, cartReducer});

export const store = createStore(
  combineReducer,
  applyMiddleware(thunk, logger)
);
