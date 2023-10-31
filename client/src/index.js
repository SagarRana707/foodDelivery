import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './router';
import {RouterProvider} from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import {legacy_createStore as createStore} from "redux";
import { Provider} from "react-redux";
import myReducer from './context/reducer';
const myStore = createStore(
  myReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AnimatePresence>
      <Provider store={myStore}>
        <RouterProvider router={router} />
      </Provider>
    </AnimatePresence>
  </React.StrictMode>
);

