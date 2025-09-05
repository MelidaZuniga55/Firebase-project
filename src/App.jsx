import LoginComponent from './views/login/LoginComponent';
import RegisterComponent from './views/register/RegisterComponent';
import { Products } from './views/products/Products';
import { BrowserRouter, Routes, Route } from 'react-router';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterComponent />} />      {/* Ruta por defecto: registro */}
          <Route path="/login" element={<LoginComponent />} />    {/* Ruta login */}
          <Route path="/products" element={<Products />} />       {/* Ruta productos */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
