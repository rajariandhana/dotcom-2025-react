import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import Nav from './pages/Nav'
import Footer from './pages/Footer'
import Home from './pages/Home/Home'
import Projects from './pages/Projects/Projects'
import NotFound from './pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'projects', element: <Projects /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {

  return (
    <>
      <RouterProvider router={router}>
      </RouterProvider>
    </>
  )
}

function Layout(){
  return (
    <>
      <Nav></Nav>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}