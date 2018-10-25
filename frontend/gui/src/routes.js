import React from 'react';
import { Route } from 'react-router-dom';

import StocksListContainer from './containers/CompanyList'
// import ArticleDetail from "./containers/ArticleDetailView";

const BaseRouter = () => (

  <div>
    <Route exact path='/projects/fortune_1000/companies/v2/' component={StocksListContainer} />
    {/*<Route exact path='/:articleID' component={ArticleDetail} />*/}
  </div>
);

export default BaseRouter;