import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Home = React.lazy(() => import('./pages/Home'))

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact component={Home} />
    </Switch>
  </BrowserRouter>
)

export default App;
