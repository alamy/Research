import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import { TableManagerProvider } from 'hooks';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { theme } from 'theme';
import 'react-activity/dist/library.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <TableManagerProvider>
        <App />
      </TableManagerProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
