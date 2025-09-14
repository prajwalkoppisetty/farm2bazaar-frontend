import { Routes, Route } from 'react-router-dom';
import './App.css';
//components
import Sidebar from '../Components/Sidebar';

//pages
import Homepage from '../Pages/Homepage';
import NotFound from '../Pages/NotFound';
import Signin from '../Pages/Signin'
import Signup from '../Pages/Signup';
import Profile from '../Pages/Profile'; // Import Profile component
import Products from '../Pages/Products';
import Shopping from '../Pages/Shopping';
import Dashboard from '../Pages/Dashboard';
function App() {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path="/profile" element={<Profile />} /> {/* Add Profile route */}
        <Route path="/products" element={<Products/>}/>
        <Route path='/shopping' element={<Shopping/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
