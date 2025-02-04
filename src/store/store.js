import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { optionsReducer, taskReducer, tasksReducer } from "./reducers";

const reducer = combineReducers({
	task: taskReducer,
	tasks: tasksReducer,
	options: optionsReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

