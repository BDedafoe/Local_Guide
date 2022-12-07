import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './Navigation';
import Home from './Home';
import SignUpForm from './users/SignUpForm';
import LoginForm from './users/LoginForm';
import Error404 from './Error404';
import FoodPage from './views/FoodPage';

function App() {
  return (

    
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/sign-up" element={<SignUpForm/>} />
          <Route exact path="/login" element={<LoginForm/>} />
          <Route exact path="/food" element={<FoodPage/>} />
         
          <Route path="/" component={<Error404/>} />
        </Routes>
      </BrowserRouter>
   
  );
}

export default App;
