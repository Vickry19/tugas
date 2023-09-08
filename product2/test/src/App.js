import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Update from './pages/Update';
import Edit from './pages/Edit';


function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/Home' element={<Home />} />  
      <Route path='/update' element={<Update />} />  
      <Route path='/edit' element={<Edit />} />
      
    </Routes>
  </BrowserRouter>

  );
}

export default App;
