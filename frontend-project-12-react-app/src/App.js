import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage';
import LoginPage from './components/LoginPage';
import NavbarElement from './components/Navbar';
import { ROUTERS } from './utils/router';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <NavbarElement />
        <Routes>
          <Route path={ROUTERS.mainPage} element={<LoginPage />} />
          <Route path={ROUTERS.loginPage} element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
