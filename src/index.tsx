import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/Index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { MantineProvider } from '@mantine/core';
import {firebaseConfig} from "./Firebase" //Make sure to provide your own one

const app = initializeApp(firebaseConfig);
getAnalytics(app);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider theme={{
        fontFamily: "Montserrat, sans-serif",
        headings: { fontFamily: "Montserrat, sans-serif" },
        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
        colorScheme: "dark",
      }}
      withGlobalStyles>
    <App />
    </MantineProvider>
  </React.StrictMode>
);