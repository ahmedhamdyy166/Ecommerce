import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Layout from './Components/Layout';
import Home from './Components/Home';
import Category from './Components/Category';
import Products from './Components/Products';
import Register from './Components/Register';
import Login from './Components/Login';
import Cart from './Components/Cart';
import Orders from './Components/Allorders';
import Brands from './Components/Brands';
import Addresses from './Components/Addresses';
import Notfound from './Components/Notfound';
import Authcontext from './Contexts/AuthContext';
import AuthContext from './Contexts/AuthContext';
import AuthContextProvider from './Contexts/AuthContext';
import Protectedroute from './Components/Protectedroute';
import AuthProtectedroute from './Components/AuthProtectedroute';
import Productdetails from './Components/Productdetails';
import Product from './Components/Product';
import { ToastContainer } from 'react-toastify';
import CartContextProvider from './Contexts/CartContext';
import { QueryClient, QueryClientProvider } from 'react-query';


function App() {
  const queryclient=new QueryClient()

  const route=createBrowserRouter([
    {
      path:'',element:<Layout />,children:[
        {path:'' , element:<Home /> },
        {path:'Home' , element:<Protectedroute> <Home />   </Protectedroute>},
        {path:'Category' , element:<Protectedroute> <Category />   </Protectedroute> },
        {path:'Products' , element:<Protectedroute> <Products />   </Protectedroute> },
        {path:'Register' , element: <AuthProtectedroute> <Register />   </AuthProtectedroute>  },
        {path:'Login' , element: <AuthProtectedroute> <Login />   </AuthProtectedroute>  },
        {path:'Cart' , element:<Protectedroute> <Cart />   </Protectedroute> },
        {path:'allorders' , element:<Protectedroute> <Orders />   </Protectedroute> },
        {path:'Brands' , element:<Protectedroute> <Brands />   </Protectedroute> },
        {path:'address/:cartId' , element:<Protectedroute> <Addresses />   </Protectedroute> },
        {path:'Productdetails/:id' , element:<Protectedroute> <Productdetails />   </Protectedroute> },
        
        
      ]
    },
    {path:'*' , element:<Notfound /> },
  ])
  
  return <>
  <QueryClientProvider client={queryclient}>
  <AuthContextProvider>
   <CartContextProvider>
    <RouterProvider router={route}></RouterProvider>
   </CartContextProvider>  
  </AuthContextProvider>

  </QueryClientProvider>
  
  <ToastContainer />
  
  </>
}

export default App;