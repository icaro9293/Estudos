import Navbar from './Navbar'
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Create from './Create';
import BlogDetails from './BlogDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <div className="content">
          <Routes> {/*Routes é o equivalente ao Switch no react-router v5.0 */}
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/create' element={<Create></Create>}></Route>
            <Route path='/blog/:id' element={<BlogDetails></BlogDetails>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
