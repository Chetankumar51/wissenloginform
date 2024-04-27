import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './components/LoginForm';
import UserList from './components/UserList';
import './App.css';

function App() {
  return (
    // <Router>
    //   <div className="App">
    //     <Switch>
    //       <Route exact path="/" component={LoginForm} />
    //       <Route path="/user-list" component={UserList} />
    //     </Switch>
    //   </div>
    // </Router>
    <div style={{display:"flex"}}>
      <LoginForm />
      <UserList />
      <ToastContainer />
    </div>
  );
}

export default App;
