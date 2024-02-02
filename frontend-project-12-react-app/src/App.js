import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundPage from './Components/NotFoundPage';
import LoginPage from './Components/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
