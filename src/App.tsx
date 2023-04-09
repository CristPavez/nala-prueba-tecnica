
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import HomePage from './pages/Home';
import UploadPage from './pages/Upload';
import './styles/app.scss';

function App() {

  return (
    <div className="App">

      <Router>
        <nav className='App__navbar'>
          <NavLink className='App__navbar__option' to={"/upload"} >Upload Excel</NavLink>
          <NavLink className='App__navbar__option' to={"/"}>Home</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
