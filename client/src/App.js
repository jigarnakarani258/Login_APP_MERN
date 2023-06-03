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

/*root routes*/
const router = createBrowserRouter([
  {
    path: '/',
    element: <Username/>
  },
  {
    path: '/password',
    element: <Password/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/profile',
    element: <Profile/>
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
