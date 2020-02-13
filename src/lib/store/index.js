import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import newsReducer from "./reducers/newsReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const appReducer = combineReducers({
    newsReducer: newsReducer
});

const rootReducer = (state, action) => {
    return appReducer({}, action);
};

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

