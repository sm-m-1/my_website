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

  // SERVER_BACKEND_API_URL = 'http://127.0.0.1:8000/projects/fortune_1000/companies/api/';
  SERVER_BACKEND_API_URL = 'https://smmashuq.com/projects/fortune_1000/companies/api/';
  SERVER_BACKEND_PAGE_SIZE = 0;
  IEX_URL = "cloud.iexapis.com/stable/stock/market/batch?symbols=";
  IEX_TYPE = "&types=quote";
  TOKEN = "&token=pk_b1b20925e6fc4ba9bee7ba356f543220";

  getStockPrices = (url) => {
    // setInterval(() => this.forceUpdate(), 2000);
    // this.forceUpdateInterval = setInterval(() => this.fetchStockData(), 2000);
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

  fetchStockData = (apiURL) => {
    // this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 1000);
    // axios.get(this.SERVER_BACKEND_API_URL)
    axios.get(apiURL)
      .then(response => {
        // console.log("response from internal api:", response);
        var companiesList = response.data.results;
        this.SERVER_BACKEND_PAGE_SIZE = response.data.count;
        // console.log("SERVER_BACKEND_PAGE_SIZE", this.SERVER_BACKEND_PAGE_SIZE);
        // console.log("companies:: ", companiesList);
        var companiesSymbols = "";
        for (var i = 0; i < companiesList.length; i++) {
          companiesSymbols += companiesList[i].stock_symbol + ",";
        }
        // console.log("companiesSymbols: ", companiesSymbols);
        var fullUrl = this.IEX_URL + companiesSymbols + this.IEX_TYPE + this.TOKEN;
        this.getStockPrices(fullUrl)
          .then(response => {
            // console.log("response from iex api:", response);

            // console.log('latestPrices: ', JSON.stringify(latestPrices));
            for (i = 0; i < companiesList.length; i++) {
              var companyObject = companiesList[i];
              var companySymbol = companyObject.stock_symbol;
              // console.log('companyObject: ', companyObject);
              // console.log('companySymbol: ', companySymbol);
              var price = response[companySymbol]['quote']['latestPrice'];
              var priceChange = response[companySymbol]['quote']['change'];
              var marketCap = response[companySymbol]['quote']['marketCap'];
              var priceChangePercent = response[companySymbol]['quote']['changePercent'] * 100;
              companyObject['latestPrice'] = price;
              companyObject['priceChange'] = priceChange;
              companyObject['marketCap'] = marketCap;
              companyObject['priceChangeClass'] = (priceChange < 0) ? "text-danger": "text-success";
              companyObject['priceChangePercent'] = (priceChangePercent).toFixed(2);
              companyObject['priceChangePercentClass'] = (priceChangePercent < 0) ? "text-danger": "text-success";
            }
            this.setState({
              companies: companiesList,
            });

          })
          .catch(e => {
            console.log('error fetching iex data', e);
          })
        // console.log("this.state: ", companiesList);
      })
      .catch(e => {
        console.log('error fetching internal api data', e);
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
  }

  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.fetchStockData(this.SERVER_BACKEND_API_URL), 1000);
    this.fetchStockData(this.SERVER_BACKEND_API_URL);
  }

  handleSearch = (query) => {
    // this.createArticles(attrs);
    // console.log(query);
    clearInterval(this.forceUpdateInterval);
    var newAPIUrl = this.SERVER_BACKEND_API_URL+"?q="+query;
    this.forceUpdateInterval = setInterval(() => this.fetchStockData(newAPIUrl), 1000);
    this.fetchStockData(newAPIUrl);
  }

  handlePageChange = (pageNumber) => {
    // This clearing of the force update interval is needed otherwise the old one from previous
    // page will still get called every two seconds.
    clearInterval(this.forceUpdateInterval);
    var newAPIUrl = this.SERVER_BACKEND_API_URL+"?page="+pageNumber;
    this.forceUpdateInterval = setInterval(() => this.fetchStockData(newAPIUrl), 1000);
    this.fetchStockData(newAPIUrl);
  }

  render() {
    // console.log("the state:", this.state);
    return (
      <div>

        <h2>Live Nasdaq Data: </h2>
        <div className="my-2">
          <Pagination simple defaultCurrent={1} total={this.SERVER_BACKEND_PAGE_SIZE} onChange={this.handlePageChange} />
        </div>
        <div className="my-2">
          <AutoComplete
            // dataSource={this.state.companiesName}
            style={{ width: 240 }}
            onSearch={this.handleSearch}
            placeholder="Search here"
          />
        </div>
        <div style={{clear:'both'}}>
          <StocksList data={this.state} />
        </div>
        <br />
        <ProjectGoals> </ProjectGoals>
      </div>
    );
  }
}

export default StocksListContainer;