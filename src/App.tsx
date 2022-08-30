import { BrowserRouter, Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import "./styles/globals.css"
import NavBar from './components/NavBar';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from './store';
import LoginForm from './components/LoginForm';
import SignUp from './components/SignUp';
import { useEffect } from 'react';
import Catalogue from './pages/Catalogue';
import { fetchAllCategories, fetchAllProducts } from './services/products.service';
import { fetchCategoriesAction, ProductType } from './types/products.types';
import { checkoutAction, fetchProductsAction, setCartAction } from './actions/products.actions';
import Cart from './pages/Cart';
import ProdDetails from './pages/ProdDetails';
import Error from './pages/Error';
import Payment from './pages/Payment';
import Home from './pages/Home';
import { LoginUser } from './types/login.types';
import { setUserAction } from './actions/login.actions';

const Success=()=>{
  const {isUserLoggedIn, user} = useSelector((state:RootState)=> state.loginReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    dispatch(checkoutAction())
    if(!isUserLoggedIn){
        navigate("/login")
    }
},[])
  return(
    <div>
      <h1 className='text-center'>Order Placed Successfully!</h1>
      <p className='text-center'><Link to="/" style={{color:"var(--primary-color)"}}>Back to Home</Link></p>
    </div>
  )
}

function App() {
  let user:LoginUser;
  
  let storedCart:ProductType[] ;
  try{
    storedCart= JSON.parse(localStorage.getItem("cart") as string)?.cart;;
  }catch(err){
    storedCart=[]
  }
    useEffect(()=>{
        if(storedCart && storedCart.length){
            dispatch(setCartAction(storedCart))
            console.log(storedCart)
        }
    },[])
  useEffect(()=>{
    try{
      user = JSON.parse(localStorage.getItem("user") as string)
      if(user){
        dispatch(setUserAction(user))
      }
    }catch(err){
      console.log(err)
    }
    // console.log("here", localStorage.getItem("user"))
    
  },[])
  const dispatch = useDispatch();
  const combiState = useSelector((state: RootState) => state);
  console.log("CObstate", combiState)
  const state = useSelector((state: RootState) => state.loginReducer);
  useEffect(()=>{
      dispatch(fetchCategoriesAction())
      dispatch(fetchProductsAction())
  }, [])
  console.log(state)
  return (
    <div className='app'>
      <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/error" element={<Error/>} />
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/products" element={<Catalogue />} />
          <Route path="/products/:prodId" element={<ProdDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<Success />} />
          <Route path='*' element={<Error/>}/>
        </Routes>
    </div>
  );
}


export default App;
