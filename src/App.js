import React from "react";
import UserSignupPage from './pages/UserSignupPage';
 import LoginPage from './pages/loginPage';
 import LanguageSelector from './components/LanguageSelector';
 import HomePage from "./pages/HomePage";
 import UserPage from "./pages/UserPage";
 import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
//eger olmayan path olarsa onda Redirect ile ana sehifeye geri qayidacaq.yeni http://localhost:3000/armud bele path yoxdur,ana sehifeye qayit
//Redirect qoydum amma ne yazsam home gedir,yeni login yazsam yene home gedir,ona gore Switch cagirdim,
import TopBar from "./components/TopBar";
import { useSelector } from 'react-redux';

const App = () => {
const { isLoggedIn } = useSelector((store) => ({isLoggedIn: store.isLoggedIn}));

  return (
    <div >
      <Router>
        <TopBar />
        <Switch>
          <Route exact path="/" component={HomePage}/>
          {!isLoggedIn && <Route path="/login" component={LoginPage}/>}
          <Route path="/signup" component={UserSignupPage}/>
          <Route path="/user/:username" component={UserPage}/>
          <Redirect to="/"/>
        </Switch>
      </Router>
      <LanguageSelector/>
    </div>
  );
}
 export default App;
 //index.html yukle
 //<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
 //rel="stylesheet">

 // <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" 
 // integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">


 
