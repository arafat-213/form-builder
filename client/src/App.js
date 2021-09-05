import React from 'react'
import Home from './components/Home/Home'
import Container from 'react-bootstrap/Container'
import { Provider } from 'react-redux'
import store from './store'

const App = () => {
  return (
    <Provider store={store }>
    <Container>
      hello world
      <Home/>
    </Container>
    </Provider>
  )
}

export default App
