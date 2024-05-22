// import * as React from "react";
// import ReactDOM from "react-dom";
// import App from "./src/App";

// const root = document.getElementById('root');
// if (root !== null) {
//   ReactDOM.createRoot(root).render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// }
import './src/styles.css';

import * as React from 'react';
import ReactDOM from 'react-dom';

import App from './src/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
