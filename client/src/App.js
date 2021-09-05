import React from 'react'
import Home from './components/Home/Home'
import Container from 'react-bootstrap/Container'
import { Provider } from 'react-redux'
import store from './store'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import SingleForm from './components/Form/SingleForm'

const App = () => {
  return (
    <Provider store={ store }>
      <Router>
        <Switch>
        <Container>
            <Route exact path='/form/:formId' component={ SingleForm } />
            <Route exact path='/' component={ Home } />
        </Container>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
