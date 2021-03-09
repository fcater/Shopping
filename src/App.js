import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getItems } from './http/itemService';
import { removeAllItemFromCart, removeItemFromCart } from './unit/removeItemFromCart';

import Me from './components/me';
import Items from './components/items';
import Cart from './components/cart';
import Order from './components/order';
import Main from './components/main';
import NavBar from './components/navBar';
import Login from './common/login';
import Register from './components/register';
import Test from './components/test';
import CartContext from "./context/cartContext";
import ItemContext from './context/itemDataContext';

import './App.css';


const App = () => {
  const [data, setData] = useState([])
  const [currentSelect, setCurrentSelect] = useState(['name'])
  const [sort, setSort] = useState([true])
  const [currentType, setCurrentType] = useState("all")
  const [cart, setCart] = useState([])
  const [query, setQuery] = useState('')
  const [queryData, setQueryData] = useState({})
  const [device, setDevice] = useState('mobile')


  useEffect(() => {
    async function getData() {
      const { data } = await getItems();
      setData(data)
    }
    getData()
  }, [])

  useEffect(() => {
    let queryData = [...data]
    queryData = queryData.filter(item => item.name.includes(query))
    setQueryData(queryData)
    return [queryData, setQueryData]
  }, [query])

  useEffect(() => {
    if (document.documentElement.clientWidth > 1460) return setDevice('computer')
  }, [])

  function addToCart(item) {
    const newCart = [...cart]
    newCart.push(item)
    setCart(newCart)
  }
  function RemoveFromCart(item) {
    let newCart = [...cart]
    newCart = removeItemFromCart(newCart, item)
    setCart(newCart)
  }
  function RemoveAllFromCart(item) {
    if (item) {
      let newCart = [...cart]
      newCart = newCart.filter(i => i._id !== item._id)
      setCart(newCart)
    }
    else setCart([])
  }

  return (
    <div className="App">
      <header className="App-header">
        <ItemContext.Provider value={{
          data,
          query,
          queryData,
          device,
          query,
          onQuery: setQuery,
          currentSelect,
          onCurrentSelect: setCurrentSelect,
          sort,
          onSort: setSort,
          currentType,
          onCurrentType: setCurrentType
        }}>
          <CartContext.Provider value={{
            cart,
            onAddCart: addToCart,
            onRemoveCart: RemoveFromCart,
            onRemoveAllCart: RemoveAllFromCart
          }}>
            <Switch>
              <Route path='/me' exact component={Me} />
              <Route path='/items' exact component={Items} />
              <Route path='/cart' exact component={() => <Cart />} />
              <Route path='/order' exact component={Order} />
              <Route path='/login' exact component={Login} />
              <Route path='/register' exact component={Register} />
              <Route path='/test' exact component={Test} />
              <Route path='/' exact component={() => <Main />} />
              <Redirect to='/' />
            </Switch>
          </CartContext.Provider>
        </ItemContext.Provider>
        {device === "mobile" && <NavBar cart={cart} device={device} />}
      </header>
    </div>
  );
}


export default App;
