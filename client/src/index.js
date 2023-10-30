import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './router';
import {RouterProvider} from "react-router-dom";
import { AnimatePresence } from 'framer-motion';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AnimatePresence>
    <RouterProvider router={router}/>
    </AnimatePresence>
  </React.StrictMode>
);

