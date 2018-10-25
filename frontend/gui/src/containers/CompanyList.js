import React from 'react';
import axios from 'axios';

import StocksList from '../components/StockItem';

// import CustomForm from "../components/Form";

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

class StocksListContainer extends React.Component {

  state = {
    companies: []
  }
  IEX_URL = "https://api.iextrading.com/1.0/stock/market/batch?symbols=";
  IEX_TYPE = "&types=quote";

  getStockPrices = (url) => {
    // this returns a javascript promise
    return axios.get(url)
      .then(response => {
        // console.log("stocksResponse:", response);
        return response.data;
      })
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/projects/fortune_1000/companies/api')
      .then(response => {
        var companiesList = response.data.results;
        console.log("companies:: ", companiesList);
        var companiesSymbols = "";
        for (var i = 0; i < companiesList.length; i++) {
          companiesSymbols += companiesList[i].stock_symbol + ",";
        }
        // console.log("companiesSymbols: ", companiesSymbols);
        var fullUrl = this.IEX_URL + companiesSymbols + this.IEX_TYPE;
        var latestPrices = {};
        this.getStockPrices(fullUrl)
          .then(response => {
            Object.keys(response).forEach(function(key, index) {
              // Object.assign(latestPrices, {key: response[key]['quote']['latestPrice']});
              latestPrices[key] = response[key]['quote']['latestPrice'];
              // console.log(key, ":", response[key]['quote']['latestPrice']);
            });
            // console.log('latestPrices: ', JSON.stringify(latestPrices));
            for (i = 0; i < companiesList.length; i++) {
              var companyObject = companiesList[i];
              var companySymbol = companyObject.stock_symbol;
              // console.log('companyObject: ', companyObject);
              // console.log('companySymbol: ', companySymbol);
              var price = latestPrices[companySymbol];
              companyObject['latest_price'] = price;
              // console.log("price", price);
              // companiesList[i].foo = "bar";
            }
            this.setState({
              companies: companiesList,
            });

          });
        // this.forceUpdate();
        // console.log("this.state: ", companiesList);
      })
  }

  handleArticlesCreate = (attrs) => {
    this.createArticles(attrs);
  }


  createArticles = (attrs) => {
    console.log("state: ", this.state);
    console.log("######: ", attrs);
    this.setState( state => ({
      companies: [...state.companies, attrs.data],
    }));
  };

  render() {
    console.log("the state:", this.state);
    return (
      <div>
        <StocksList data={this.state}/>
        <br />
      </div>
    );
  }
}

export default StocksListContainer;