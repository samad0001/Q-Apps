import React from 'react'
import { Provider } from 'react-redux'
import {store} from "./Redux/Store"
import Router from './Router'
import Footer from './components/Footer'
const App = () => {
  return (
    <Provider store={store}>
          <Router/>
<Footer/>
    </Provider>
  )
}

export default App