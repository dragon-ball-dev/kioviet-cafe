import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getCurrentAdmin, getCurrentUser } from "./services/fetch/ApiUtils";
import { ACCESS_TOKEN } from "./constants/Connect";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OAuth2RedirectHandler from './oauth2/OAuth2RedirectHandler';
import NotFound from './common/NotFound';
import DashboardAdmin from './pages/admin/Dashboard';
import ForgotPassword from './common/ForgotPassword';
import ResetPassword from './common/ResetPassword';
import SuccessConfirmed from './common/SuccessConfirmed';
import SignIn from './pages/signin/SignIn';
import CategoryManager from './pages/admin/CategoryManager';
import AddCategory from './pages/admin/AddCategory';
import './assets/css/app.css';
import StoreManager from './pages/admin/StoreManager';
import AddStore from './pages/admin/AddStore';
import AddSupply from './pages/admin/AddSupply';
import SupplyManager from './pages/admin/SupplyManager';
import AddProduct from './pages/admin/AddProduct';
import ProductManager from './pages/admin/ProductManager';
import EmployeeManager from './pages/admin/EmployeesManager';
import AddEmployee from './pages/admin/AddEmployee';
import SellProduct from './pages/admin/SellProduct';
import Cart from './pages/admin/Cart';
import ReportManager from './pages/admin/ReportManager';
import EditCategory from './pages/admin/EditCategory';
import EditSupply from './pages/admin/EditSupply';
import EditStore from './pages/admin/EditStore';
import EditProduct from './pages/admin/EditProduct';
import AddInventory from './pages/admin/AddInventory';
import Checkout from './pages/admin/Checkout';
import CheckoutOn from './pages/admin/CheckoutOnline';
import CustomerManager from './pages/admin/CustomerManager';
import AddCustomer from './pages/admin/AddCustomer';
import EditCustomer from './pages/admin/EditCustomer';
import StockManager from './pages/admin/StockManager';
import AddStock from './pages/admin/AddStock';
import OrderManager from './pages/admin/OrderManagement';
import Report from './pages/admin/Report';
import Invoice from './pages/admin/Invoice';
import MoveStock from './pages/admin/MoveStock';
import Profile from './pages/admin/Profile';
import Chat from './pages/admin/Chat';


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  const loadCurrentlyLoggedInUser = () => {
    getCurrentUser()
      .then(response => {
        setCurrentUser(response);
        setUsername(response.name);
        setRole(response.roles[0].name);
        setAuthenticated(true);
        setLoading(false);
        console.log(response);
        console.log({ authenticated, username, currentUser, role, loading });
      })
      .catch(error => {
        setLoading(false);
      });
  }

  const loadCurrentlyLoggedInAdmin = () => {
    getCurrentAdmin()
      .then(response => {
        setCurrentUser(response);
        setUsername(response.name);
        setRole(response.roles[0].name);
        setAuthenticated(true);
        setLoading(false);
        
      })
      .catch(error => {
        setLoading(false);
      });
  }

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
    toast.success("Bạn đăng xuất thành công!!!");
  }

  const exitLogoutChangePassword = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
  }

  useEffect(() => {
    loadCurrentlyLoggedInUser();
    loadCurrentlyLoggedInAdmin();
  }, []);


  console.log({ authenticated, username, currentUser, role, loading });

  return (
    <>
      <Router>
        <Routes>

          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
          <Route exact path="/" element={<SignIn authenticated={authenticated} currentUser={currentUser}/>} />
          <Route path="*" exact={true} element={<NotFound />} />
          <Route exact path="/forgot-password" element={<ForgotPassword authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/reset-password/:email" element={<ResetPassword />} />
          <Route exact path="/success-comfirmed/:email" element={<SuccessConfirmed />} />
          <Route exact path="/dashboard" element={<DashboardAdmin authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} role={role}/>} />
          <Route exact path="/category" element={<CategoryManager authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} role={role}/>} />
          <Route exact path="/store" element={<StoreManager authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} role={role}/>} />
          <Route exact path="/customer" element={<CustomerManager authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} role={role}/>} />
          <Route exact path="/supply" element={<SupplyManager authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} role={role}/>} />
          <Route exact path="/product" element={<ProductManager authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} role={role}/>} />
          <Route exact path="/stock" element={<StockManager authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout}  role={role} />}/>
          <Route exact path="/employee" element={<EmployeeManager authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
          <Route exact path="/sell-product" element={<SellProduct authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
          <Route exact path="/cart" element={<Cart authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
          <Route exact path="/report" element={<Report authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
          <Route exact path="/order" element={<OrderManager authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
          <Route exact path="/invoice" element={<Invoice authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />
          <Route exact path="/move-stock" element={<MoveStock authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout}  role={role} />}/>
          <Route exact path="/profile" element={<Profile authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout}  role={role} />}/>
          <Route exact path="/chat" element={<Chat authenticated={authenticated} currentUser={currentUser} role={role} onLogout={handleLogout} />} />


          <Route exact path="/add-store" element={<AddStore authenticated={authenticated} role={role} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/add-customer" element={<AddCustomer authenticated={authenticated} role={role} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/add-category" element={<AddCategory authenticated={authenticated} role={role} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/add-supply" element={<AddSupply authenticated={authenticated} role={role} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/add-product" element={<AddProduct authenticated={authenticated} role={role} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/add-employee" element={<AddEmployee authenticated={authenticated} role={role} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/add-inventory/:id" element={<AddInventory authenticated={authenticated} role={role} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/add-stock" element={<AddStock authenticated={authenticated} role={role} currentUser={currentUser} onLogout={handleLogout} />} />

          <Route exact path="/edit-customer/:id" element={<EditCustomer authenticated={authenticated} role={role} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/edit-store/:id" element={<EditStore authenticated={authenticated} role={role} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/edit-category/:id" element={<EditCategory authenticated={authenticated} role={role} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/edit-supply/:id" element={<EditSupply authenticated={authenticated} role={role} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/edit-product/:id" element={<EditProduct authenticated={authenticated} role={role} currentUser={currentUser} onLogout={handleLogout} />} />

          <Route exact path="/checkout" element={<Checkout authenticated={authenticated} role={role} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/checkout-on" element={<CheckoutOn authenticated={authenticated} role={role} currentUser={currentUser} onLogout={handleLogout} />} />

        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;