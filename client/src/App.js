import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

/**Import All Components **/
import  Username     from "./Components/Username";
import  Password     from "./Components/Password";
import  Register     from "./Components/Register";
import  Profile      from "./Components/Profile";
import  Recovery     from "./Components/Recovery";
import  Reset        from "./Components/Reset";
import  PageNotFound from "./Components/PageNotFound";


/***Auth Middlewares ***/
import { AuthorizeUser , ProtectRoutePassword } from './middlewares/auth';

/*root routes*/
const router = createBrowserRouter([
  {
    path: '/',
    element: <Username/>
  },
  {
    path: '/password',
    element: <ProtectRoutePassword> <Password/>  </ProtectRoutePassword>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/profile',
    element: <AuthorizeUser> <Profile/> </AuthorizeUser>
  },
  {
    path: '/recovery',
    element: <Recovery/>
  },
  {
    path: '/reset',
    element: <Reset/>
  },
  {
    path: '*',
    element: <PageNotFound/>
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}>
      </RouterProvider>
    </div>
  );
}

export default App;