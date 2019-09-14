import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Home = React.lazy(() => import('./pages/Home'))

const App = () => (
  <BrowserRouter>
    <React.Suspense fallback={<Loading />}>
      <Switch>
        <Route exact component={Home} />
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
