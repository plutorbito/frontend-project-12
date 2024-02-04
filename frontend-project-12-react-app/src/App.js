import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotFoundPage from './Components/NotFoundPage';
import LoginPage from './Components/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
