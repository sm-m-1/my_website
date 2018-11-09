import React from 'react';
import { Route } from 'react-router-dom';

import StocksListContainer from './containers/CompanyList'
import CompanyDetail from "./containers/CompanyDetailView";

const BaseRouter = () => (

  <div>
    <Route exact path='/projects/fortune_1000/companies/v2/' component={StocksListContainer} />
    <Route exact path='/projects/fortune_1000/companies/v2/:companySlug/' component={CompanyDetail} />
  </div>
);

export default BaseRouter;