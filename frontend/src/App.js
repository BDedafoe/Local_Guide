// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';

// import Navigation from './Navigation';
// import Home from './Home';
// import RegisterForm from './users/RegisterForm';
// import LoginForm from './users/LoginForm';
// import Error404 from './Error404';
// import FoodPage from './views/FoodPage';
// import FoodDetails from './views/FoodDetails';
// import Login from './auth/Login'

// function App() {
//   return (

    
//       <BrowserRouter>
//         <Navigation />
//         <Routes>
//           <Route exact path="/" element={<Home/>} />
//           <Route exact path="/register" element={<RegisterForm/>} />
//           <Route exact path="/login" element={<Login/>} />
//           <Route exact path="/food" element={<FoodPage/>} />
//           <Route exact path="/food/:foodId" component={<FoodDetails/>} />
//           <Route path="/" component={<Error404/>} />
//         </Routes>
//       </BrowserRouter>
   
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './views/Login';



import NewNote from './notes/NewNote'
import Prefetch from './auth/Prefetch'
import PersistLogin from './auth/PersistLogin'

import Navigation from './Navigation';
import RegisterForm from './users/RegisterForm';
import Home from './Home';
import Register from './users/Register';
import CurrentUserProvider from './contexts/CurrentUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FoodPage from './foods/FoodPage';
import FoodDetails from './foods/FoodDetails'
import Error404 from './Error404'
import Note from './notes/Note';
import LoginForm from './users/LoginForm';

function App() {


  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <Navigation />
          <Routes>
             <Route exact path="/" element={<Home/>} />
             <Route exact path="/register" element={<RegisterForm/>} />
             <Route exact path="/login" element={<LoginForm/>} />
             <Route exact path="/foods" element={<FoodPage/>} />
             <Route exact path="/foods/:foodId" component={<FoodDetails/>} />
             <Route exact path="/notes" element={<Note/>} />
             <Route path="/" component={<Error404/>} />
           </Routes>
       </BrowserRouter>
      <ToastContainer/>
    </CurrentUserProvider>
  );
}

export default App;