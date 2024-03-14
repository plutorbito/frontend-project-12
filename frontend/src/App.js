import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  // useLocation,
  // Navigate,
} from 'react-router-dom';
// import { Provider, ErrorBoundary } from '@rollbar/react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import NotFoundPage from './components/NotFoundPage';
import LoginPage from './components/LoginPage';
import ChatPage from './components/ChatPage';
import NavbarElement from './components/Navbar';
import ROUTERS from './utils/router';
import useAuth from './hooks/useAuth';
import SignupPage from './components/SignupPage';

const ChatRoute = ({ children }) => {
  const auth = useAuth();
  // const location = useLocation();

  return auth.loggedIn ? (
    children
  ) : (
    document.location.assign(ROUTERS.loginPage)
  );
};

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <NavbarElement />
      <Routes>
        <Route path={ROUTERS.loginPage} element={<LoginPage />} />
        <Route path={ROUTERS.other} element={<NotFoundPage />} />
        <Route
          path={ROUTERS.chatPage}
          element={
            (
              <ChatRoute>
                <ChatPage />
              </ChatRoute>
            )
          }
        />
        <Route path={ROUTERS.signupPage} element={<SignupPage />} />
      </Routes>
    </div>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </BrowserRouter>
);

export default App;
