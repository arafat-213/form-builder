// React
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// Redux
import { Provider } from 'react-redux'
import store from './store'
// Components
import Home from './components/Home/Home'
import SingleForm from './components/Form/SingleForm'
// Bootstrap
import Container from 'react-bootstrap/Container'

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Container>
						<Route
							exact
							path='/form/:formId'
							component={SingleForm}
						/>
						<Route exact path='/' component={Home} />
					</Container>
				</Switch>
			</Router>
		</Provider>
	)
}

export default App
