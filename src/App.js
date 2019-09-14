import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Spinner from './components/Spinner/Spinner'

const Home = React.lazy(() => import('./pages/Home/Home'))
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'))
const Movie = React.lazy(() => import('./pages/Movie/Movie'))
const Header = React.lazy(() => import('./components/Header/Header'))

const App = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <React.Suspense fallback={<Spinner />}>
      <Header />
      <Switch>
        <Route exact component={Home} path="/" />
        <Route exact component={Movie} path="/:movieId" />
        <Route component={NotFound} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default App;
