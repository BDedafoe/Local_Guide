import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Users from './components/Users';
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
          <Route exact path="/" component={Home} />
          <Route exact path="/sign-up" component={SignUpForm} />
          <Route exact path="/login" component={LoginForm} />
          {/* <Route exact path="/places" component={PlaceIndex} />
          <Route exact path="/places/new" component={NewPlaceForm} />
          <Route exact path="/places/:placeId" component={PlaceDetails} />
          <Route exact path="/places/:placeId/edit" component={EditPlaceForm} /> */}
          <Route path="/" component={Error404} />
        </Routes>
      </BrowserRouter>
      <Users />
    </CurrentUserProvider>

    // <div className="App">
    //   <h1>Local's Guide!</h1>
    //   <Users />
    // </div>
  );
}

export default App;
