import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

function App() {
  const [names, setNames] = useState([]);
  const [orders, setOrders] = useState([]);
  // const storeName = 'Costco'

  useEffect(() => {
    fetch("http://localhost:9292/names")
    .then((res) => res.json())
    .then(setNames)
  }, []);

  useEffect(() => {
    fetch("http://localhost:9292/orders")
    .then((res) => res.json())
    .then(setOrders)
  }, []);
  

  // const shopperName = names.find(name_obj => name_obj.name === 'Billy')

  return (
    <div className="App">
      <Router>
        <nav>
          <ul className="linkClass">
            <li><Link to='/'>Home</Link></li>
            {/* <li><Link to='name management'>Name Management</Link></li> */}
            {/* <li><Link to='shopdates'>Shop Dates</Link></li> */}
          </ul>
        </nav>
        <Routes>
            <Route path='/' element={ <Home names= {names} orders = {orders} />} />
          </Routes>
      </Router>
  </div>
);
}

export default App;
