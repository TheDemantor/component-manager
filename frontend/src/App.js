import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './screens/Home'
import Component from './screens/Component'
import ComponentEdit from './screens/ComponentEdit'

import Navbar from './components/Navbar'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/:id' element={<Component/>}></Route>
          <Route path='/:id/edit' element={<ComponentEdit/>}></Route>
        </Routes>
          
      </Router>
    </div>
  );
}

export default App;
