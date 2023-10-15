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


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  // const loadCurrentlyLoggedInUser = () => {
  //   getCurrentUser()
  //     .then(response => {
  //       setCurrentUser(response);
  //       setUsername(response.name);
  //       setRole(response.roles[0].name);
  //       setAuthenticated(true);
  //       setLoading(false);
  //       console.log(response);
  //       console.log({ authenticated, username, currentUser, role, loading });
  //     })
  //     .catch(error => {
  //       setLoading(false);
  //     });
  // }

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
    // loadCurrentlyLoggedInUser();
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
          <Route exact path="/dashboard" element={<DashboardAdmin authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/category" element={<CategoryManager authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/store" element={<StoreManager authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/add-store" element={<CategoryManager authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route exact path="/add-category" element={<AddCategory authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} />} />
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