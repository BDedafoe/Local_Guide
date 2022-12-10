import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './Navigation';
import Home from './Home';
import RegisterForm from './users/RegisterForm';
import LoginForm from './users/LoginForm';
import Error404 from './Error404';
import FoodPage from './views/FoodPage';
import FoodDetails from './views/FoodDetails';
import Login from './views/Login';

function App() {
  return (

    
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/register" element={<RegisterForm/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/food" element={<FoodPage/>} />
          <Route exact path="/food/:foodId" component={<FoodDetails/>} />
          <Route path="/" component={<Error404/>} />
        </Routes>
      </BrowserRouter>
   
  );
}

export default App;

// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Layout from './views/Layout'
// import Public from './views/Public'
// import Login from './views/Login';
// import DashLayout from './views/dashLayout'
// import Welcome from './auth/Welcome'
// import NotesList from './notes/NotesList'
// import UsersList from './users/UsersList'
// import EditUser from './users/EditUser'
// import NewUserForm from './users/NewUserForm'
// import EditNote from './notes/EditNote'
// import NewNote from './notes/NewNote'
// import Prefetch from './auth/Prefetch'
// import PersistLogin from './auth/PersistLogin'
// import RequireAuth from './auth/RequireAuth'
// import { ROLES } from './contexts/roles'
// import useTitle from './hooks/useTitle';
// import Navigation from './Navigation';
// import RegisterForm from './users/RegisterForm';

// function App() {
//   useTitle('Dan D. Repairs')

//   return (
//     // <Navigation/>
//     <Routes>
//       <Route path="/" element={<Layout />}>
//         {/* public routes */}
//         <Route index element={<Public />} />
//         <Route path="login" element={<Login />} />
//         <Route path="register" element={<RegisterForm />} />

//         {/* Protected Routes */}
//         <Route element={<PersistLogin />}>
//           <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
//             <Route element={<Prefetch />}>
//               <Route path="dash" element={<DashLayout />}>

//                 <Route index element={<Welcome />} />

//                 <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
//                   <Route path="users">
//                     <Route index element={<UsersList />} />
//                     <Route path=":id" element={<EditUser />} />
//                     <Route path="new" element={<NewUserForm />} />
//                   </Route>
//                 </Route>

//                 <Route path="notes">
//                   <Route index element={<NotesList />} />
//                   <Route path=":id" element={<EditNote />} />
//                   <Route path="new" element={<NewNote />} />
//                 </Route>

//               </Route>{/* End Dash */}
//             </Route>
//           </Route>
//         </Route>{/* End Protected Routes */}

//       </Route>
//     </Routes >
//   );
// }

// export default App;