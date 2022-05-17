import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import BooksScreen from './components/screens/BooksScreen';
import SavedBooksScreen from './components/screens/SavedBooksScreen';
import HomeScreen from './components/screens/HomeScreen';
import SingleBookScreen from './components/screens/SingleBookScreen';
import EditBookScreen from './components/screens/EditBookScreen';
import LoginScreen from './components/screens/LoginScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import AdminScreen from './components/screens/AdminScreen';
import RegisterUserScreen from './components/screens/RegisterUserScreen';
import UserListScreen from './components/screens/UserListScreen';
import UserEditScreen from './components/screens/UserEditScreen';
import ProductListScreen from './components/screens/ProductListScreen';

const App = () => {
  return (
    <Router>
      <Header />

      <Switch>
        <Route path='/' component={HomeScreen} exact />

        <Route path='/login' component={LoginScreen} exact />

        <Route path='/register' component={RegisterUserScreen} exact />

        <Route path='/books' component={BooksScreen} exact />

        <Route path='/saved' component={SavedBooksScreen} exact />

        <Route path='/saved/:id?' component={SavedBooksScreen} exact />

        <Route path='/book/:id' component={SingleBookScreen} exact />

        <Route path='/admin/book/:id/edit' component={EditBookScreen} exact />

        <Route path='/admin' component={AdminScreen} exact />

        <Route path='/admin/userlist' component={UserListScreen} exact />

        <Route path='/admin/booklist' component={ProductListScreen} exact />

        <Route path='/admin/user/:id/edit' component={UserEditScreen} exact />

        <Route path='/profile' component={ProfileScreen} exact />
      </Switch>
    </Router>
  );
};

export default App;
