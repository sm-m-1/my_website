import React from 'react';
import axios from 'axios';
import { Card, Button } from 'antd';
import {Line} from 'react-chartjs-2';
const ButtonGroup = Button.Group;


// import Articles from '../components/Article'


class CompanyDetail extends React.Component {

  state = {
    company: {},
    priceData: [],
    latestPrice: {},
    labelData: [],
    currentRange: "",
  }

  IEX_URL = "https://cloud.iexapis.com/stable/stock/";
  IEX_URL_RANGE = "/chart/1m/";
  TOKEN = "?token=pk_b1b20925e6fc4ba9bee7ba356f543220"

  // SERVER_BACKEND_API_URL = 'http://127.0.0.1:8000/projects/fortune_1000/companies/api/';
  SERVER_BACKEND_API_URL = 'https://smmashuq.com/projects/fortune_1000/companies/api/';

  componentDidMount() {
    const companySlug = this.props.match.params.companySlug;
    axios.get(`${this.SERVER_BACKEND_API_URL}${companySlug}/`)
      .then(res => {
        this.setState({
          company: res.data
        });
        this.IEX_URL += res.data.stock_symbol;
        // console.log(res.data);
        axios.get(this.IEX_URL+this.IEX_URL_RANGE+this.TOKEN)
          .then( response => {
            // console.log("IEX RESPONSE: ", response);
            // save the labels in the state
            var data = response.data;
            var labels = [];
            var prices = [];
            for (let i=0; i < data.length; i++) {
              labels.push(data[i].date);
              prices.push(data[i].close);
            }
            this.setState({
              priceData: prices,
              labelData: labels,
              currentRange: "1m",
            });
            // console.log("state.priceData : ", this.state.priceData);
            // console.log("state.labelData : ", this.state.labelData);
          });
        // get the latest price and save that.
        axios.get(this.IEX_URL+"/book"+this.TOKEN)
          .then( response => {
            this.setState({
              latestPrice: response.data.quote
            });
            // console.log("state.latestPrice : ", this.state.latestPrice);
          })
      })
  }

  updateGraph = (time) => {
    axios.get(this.IEX_URL+"/chart/"+time+this.TOKEN)
      .then( response => {
        // console.log("IEX RESPONSE: ", response);
        // save the labels in the state
        var data = response.data;
        var labels = [];
        var prices = [];
        for (let i=0; i < data.length; i++) {
          labels.push(data[i].label);
          prices.push(data[i].close);
        }
        this.setState({
          priceData: prices,
          labelData: labels,
          currentRange: time,
        });
        // console.log("state.priceData : ", this.state.priceData);
        // console.log("state.labelData : ", this.state.labelData);
      });
  }


  render() {
    var data = {
      // labels: ["January", "February", "March", "April", "May", "June", "July"],
      labels: this.state.labelData,
      datasets: [
        {
          label: this.state.company.stock_symbol,
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          data: this.state.priceData,
          pointBorderWidth: 0.5,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointRadius: 0,
          pointHitRadius: 3,
        }
      ]
    };
    var chartOptions = {
      pointDot : false,
    };

    return (
      <div>
        <div className="container">
          <Button type="primary" className="mb-2" href="https://smmashuq.com/projects/fortune_1000/companies/v2">
            App Home
          </Button>
          <Card title={this.state.company.name}>
            <p>{this.state.company.stock_symbol} data for <span className="text-primary">{this.state.currentRange}</span></p>
            <p>Latest price: <span className="text-primary">${this.state.latestPrice.latestPrice}</span></p>
            <div className="row mt-2">
              <ButtonGroup>
                <Button onClick={()=>this.updateGraph("1m")} > 1M</Button>
                <Button onClick={()=>this.updateGraph("3m")} > 3M</Button>
                <Button onClick={()=>this.updateGraph("6m")} > 6M</Button>
                <Button onClick={()=>this.updateGraph("1y")} > 1Y</Button>
                <Button onClick={()=>this.updateGraph("2y")} > 2Y</Button>
                <Button onClick={()=>this.updateGraph("5y")} > 5Y</Button>
                <Button onClick={()=>this.updateGraph("max")} > Max</Button>
              </ButtonGroup>
            </div>
            <div className="row" >
              <Line data={data} options={chartOptions}/>
            </div>
          </Card>
        </div>
      </div>

    );
  }
}

export default CompanyDetail;