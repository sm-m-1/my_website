import React from 'react';
import axios from 'axios'
import { Pagination, AutoComplete } from 'antd';

import StocksList from '../components/StockItem';
import ProjectGoals from "../components/ProjectGoal";

// import CustomForm from "../components/Form";

// const Search = Input.Search;

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
    companies: [],
    companiesName: [],
  }

  SERVER_BACKEND_API_URL = 'http://127.0.0.1:8000/projects/fortune_1000/companies/api';
  SERVER_BACKEND_PAGE_SIZE = 0;
  IEX_URL = "https://api.iextrading.com/1.0/stock/market/batch?symbols=";
  IEX_TYPE = "&types=quote";

  getStockPrices = (url) => {
    // setInterval(() => this.forceUpdate(), 2000);
    // this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 2000);
    // this returns a javascript promise
    return axios.get(url)
      .then(response => {
        // console.log("stocksResponse:", response);
        return response.data;
      })
      .catch(e => {
        // console.log("error when calling IEX:", e);
        throw e;
      })
  }

  // componentWillUnmount() {
  //   clearInterval(this.forceUpdateInterval);
  // }

  componentDidMount() {
    // setInterval(() => this.forceUpdate(), 3000);
    axios.get(this.SERVER_BACKEND_API_URL)
      .then(response => {
        // console.log("response from api:", response);
        var companiesList = response.data.results;
        this.SERVER_BACKEND_PAGE_SIZE = response.data.count;
        // console.log("SERVER_BACKEND_PAGE_SIZE", this.SERVER_BACKEND_PAGE_SIZE);
        // console.log("companies:: ", companiesList);
        var companiesSymbols = "";
        for (var i = 0; i < companiesList.length; i++) {
          companiesSymbols += companiesList[i].stock_symbol + ",";
        }
        // console.log("companiesSymbols: ", companiesSymbols);
        var fullUrl = this.IEX_URL + companiesSymbols + this.IEX_TYPE;
        this.getStockPrices(fullUrl)
          .then(response => {
            // console.log("response from api:", response);

            // console.log('latestPrices: ', JSON.stringify(latestPrices));
            for (i = 0; i < companiesList.length; i++) {
              var companyObject = companiesList[i];
              var companySymbol = companyObject.stock_symbol;
              // console.log('companyObject: ', companyObject);
              // console.log('companySymbol: ', companySymbol);
              var price = response[companySymbol]['quote']['latestPrice'];
              var priceChange = response[companySymbol]['quote']['change'];
              var priceChangePercent = response[companySymbol]['quote']['changePercent'] * 100;
              companyObject['latestPrice'] = price;
              companyObject['priceChange'] = priceChange;
              companyObject['priceChangeClass'] = (priceChange < 0) ? "text-danger": "text-success";
              companyObject['priceChangePercent'] = (priceChangePercent).toFixed(2);
              companyObject['priceChangePercentClass'] = (priceChangePercent < 0) ? "text-danger": "text-success";
            }
            this.setState({
              companies: companiesList,
            });

          });
        // this.forceUpdate();
        // console.log("this.state: ", companiesList);
      })
  }

  handleSearch2 = (query) => {
    var newAPIUrl = this.SERVER_BACKEND_API_URL+"?q="+query;
    axios.get(newAPIUrl)
      .then(response => {
        // console.log("responseeeeee:", response);
        var names = [];
        var objectArray = response.data.results;
        Object.keys(objectArray).forEach(function(key, index) {
          names.push(objectArray[key].name + " ( " + objectArray[key].stock_symbol + " )")
        });
        this.setState({
          companiesName: names
        })
      })

    // this.setState({
    //   companiesName: !query ? [] : [
    //     query,
    //     query + query,
    //     query + query + query,
    //   ],
    // })
  }


  handleSearch = (query) => {
    // this.createArticles(attrs);
    // console.log(query);
    clearInterval(this.forceUpdateInterval);
    var newAPIUrl = this.SERVER_BACKEND_API_URL+"?q="+query;
    axios.get(newAPIUrl)
      .then(response => {
        // console.log("response from api:", response);
        var companiesList = response.data.results;
        this.SERVER_BACKEND_PAGE_SIZE = response.data.count;
        // console.log("SERVER_BACKEND_PAGE_SIZE", this.SERVER_BACKEND_PAGE_SIZE);
        // console.log("companies:: ", companiesList);
        var companiesSymbols = "";
        for (var i = 0; i < companiesList.length; i++) {
          companiesSymbols += companiesList[i].stock_symbol + ",";
        }
        // console.log("companiesSymbols: ", companiesSymbols);
        var fullUrl = this.IEX_URL + companiesSymbols + this.IEX_TYPE;
        this.getStockPrices(fullUrl)
          .then(response => {
            // console.log("response from api:", response);

            // console.log('latestPrices: ', JSON.stringify(latestPrices));
            for (i = 0; i < companiesList.length; i++) {
              var companyObject = companiesList[i];
              var companySymbol = companyObject.stock_symbol;
              // console.log('companyObject: ', companyObject);
              // console.log('companySymbol: ', companySymbol);
              var price = response[companySymbol]['quote']['latestPrice'];
              var priceChange = response[companySymbol]['quote']['change'];
              var priceChangePercent = response[companySymbol]['quote']['changePercent'] * 100;
              companyObject['latestPrice'] = price;
              companyObject['priceChange'] = priceChange;
              companyObject['priceChangeClass'] = (priceChange < 0) ? "text-danger": "text-success";
              companyObject['priceChangePercent'] = (priceChangePercent).toFixed(2);
              companyObject['priceChangePercentClass'] = (priceChangePercent < 0) ? "text-danger": "text-success";
            }
            this.setState({
              companies: companiesList,
            });

          });
        // this.forceUpdate();
        // console.log("this.state: ", companiesList);
      })
  }


  createArticles = (attrs) => {
    // console.log("state: ", this.state);
    // console.log("######: ", attrs);
    this.setState( state => ({
      companies: [...state.companies, attrs.data],
    }));
  };

  onPageChange = (pageNumber) => {
    // This clearing of the force update interval is needed otherwise the old one from previous
    // page will still get called every two seconds.
    clearInterval(this.forceUpdateInterval);
    var newAPIUrl = this.SERVER_BACKEND_API_URL+"?page="+pageNumber;
    axios.get(newAPIUrl)
      .then(response => {
        // console.log("response from api:", response);
        var companiesList = response.data.results;
        this.SERVER_BACKEND_PAGE_SIZE = response.data.count;
        var companiesSymbols = "";
        for (var i = 0; i < companiesList.length; i++) {
          companiesSymbols += companiesList[i].stock_symbol + ",";
        }
        // console.log("companiesSymbols: ", companiesSymbols);
        var fullUrl = this.IEX_URL + companiesSymbols + this.IEX_TYPE;
        this.getStockPrices(fullUrl)
          .then(response => {
            // console.log("response from api:", response);

            // console.log('latestPrices: ', JSON.stringify(latestPrices));
            for (i = 0; i < companiesList.length; i++) {
              var companyObject = companiesList[i];
              var companySymbol = companyObject.stock_symbol;
              var price = response[companySymbol]['quote']['latestPrice'];
              var priceChange = response[companySymbol]['quote']['change'];
              var priceChangePercent = response[companySymbol]['quote']['changePercent'] * 100;
              companyObject['latestPrice'] = price;
              companyObject['priceChange'] = priceChange;
              companyObject['priceChangeClass'] = (priceChange < 0) ? "text-danger": "text-success";
              companyObject['priceChangePercent'] = (priceChangePercent).toFixed(2);
              companyObject['priceChangePercentClass'] = (priceChangePercent < 0) ? "text-danger": "text-success";
            }
            this.setState({
              companies: companiesList,
            });

          });
        // this.forceUpdate();
        // console.log("this.state: ", companiesList);
      })
  }

  render() {
    // console.log("the state:", this.state);
    return (
      <div>
        <ProjectGoals> </ProjectGoals>
        <h2>Live Nasdaq Data: </h2>
        <div style={{float:'left'}}>
          <Pagination simple defaultCurrent={1} total={this.SERVER_BACKEND_PAGE_SIZE} onChange={this.onPageChange} />
        </div>
        <div style={{float:'right'}}>
          <AutoComplete
            // dataSource={this.state.companiesName}
            style={{ width: 240 }}
            onSearch={this.handleSearch}
            placeholder="Search here"
          />
        </div>
        <div style={{clear:'both'}}>
          <StocksList data={this.state}/>
        </div>
        <br />
      </div>
    );
  }
}

export default StocksListContainer;