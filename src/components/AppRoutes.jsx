import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import Product from './Product/ProductList';
import ProductInsert from './Product/ProductInsert';
import UserList from './Users/UserList';
import UsersInsert from './Users/UsersInsert';
import Navigation from './Navigation/Navigation';
import WIP from './shared/WIP';
import TransactionList from './Transaction/TransactionList';
import TransactionStats from './Transaction/TransactionStats';

export default function AppRoutes() {
  return (
    <Navigation>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/transactions" component={TransactionList} />
        <Route path="/transaction-stats" component={TransactionStats} />
        <Route path="/product-insert" component={ProductInsert} />
        <Route path="/transactions" component={WIP} />
        <Route path="/user-insert" component={UsersInsert} />
        <Route path="/user-list" component={UserList} />
        <Route path="/" component={Product} />
      </Switch>
      <ToastContainer />
    </Navigation>
  );
}
