import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ScanBill from './pages/ScanBillPage';
import ScanProduct from './pages/ScanProductPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scanproduct" element={<ScanProduct />} />
        <Route path="/scanbill" element={<ScanBill />} />
      </Routes>
    </Router>
  );
}

export default App;
