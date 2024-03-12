import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from 'pages/Home'
import Movies from 'pages/Movies'
import MovieForm from 'pages/Movies/Form'
import Path from './Path'
import AuthenForm from 'pages/Authentication/AuthenForm'
import AuthRoute from './AuthRoute'

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Path.login} element={<AuthenForm />} />
        <Route path={Path.sign_up} element={<AuthenForm />} />
        <Route element={<AuthRoute />}>
          <Route path={Path.home} element={<Home />} />
          <Route path={Path.movies} element={<Movies />} />
          <Route path={Path.movie_create} element={<MovieForm />} />
          <Route path={Path.movie_edit()} element={<MovieForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Routers
