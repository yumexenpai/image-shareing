import React from "react";
import ReactDOM from 'react-dom';
// import ReactDOM from "react-dom/client";
import {BrowserRouter as Router} from 'react-router-dom';


import App from './App';
import './index.css'; 

ReactDOM.render(
    <Router>
        <App/>
    </Router>,
     document.getElementById('root')

);

// ReactDOM.createRoot(document.getElementById('root')).render(<App />)