import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Home = React.lazy(() => import('./pages/Home/Home'))
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'))
const Header = React.lazy(() => import('./components/Header/Header'))

const App = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <React.Suspense fallback={<Loading />}>
      <Header />
      <Switch>
        <Route exact component={Home} path="/" />
        <Route component={NotFound} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

function Loading() {
  return (
    <div>
      Loading...
    </div>
  )
}

export default App;
