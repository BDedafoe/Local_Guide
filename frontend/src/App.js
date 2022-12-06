import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CurrentUserProvider from './contexts/CurrentUser';
import Navigation from './Navigation';
import Home from './Home';
import SignUpForm from './users/SignUpForm';
import LoginForm from './users/LoginForm';
import Error404 from './Error404';

function App() {
  return (

    <CurrentUserProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/sign-up" element={<SignUpForm/>} />
          <Route exact path="/login" element={<LoginForm/>} />
          {/* <Route exact path="/places" component={PlaceIndex} />
          <Route exact path="/places/new" component={NewPlaceForm} />
          <Route exact path="/places/:placeId" component={PlaceDetails} />
          <Route exact path="/places/:placeId/edit" component={EditPlaceForm} /> */}
          <Route path="/" element={<Error404/>} />
        </Routes>
      </BrowserRouter>
    </CurrentUserProvider>

    // <div className="App">
    //   <h1>Local's Guide!</h1>
    //   <Users />
    // </div>
  );
}

export default App;