import LoginComponent from './views/login/LoginComponent';
import RegisterComponent from './views/register/RegisterComponent';
import { Products } from './views/products/Products';
import { BrowserRouter, Routes, Route } from 'react-router';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterComponent />} />      
          <Route path="/login" element={<LoginComponent />} />    
          <Route path="/products" element={<Products />} />       
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
