import React from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

const StocksList = (props) => {
  return (
    <table className="table table-striped table-responsive-sm">
      <thead className="thead-dark">
      <tr>
        <th scope="col">Rank</th>
        <th scope="col">Name</th>
        <th scope="col">Stock Symbol</th>
        <th scope="col">Stock Price ($)</th>
        <th scope="col">Market Value ($)</th>
      </tr>
      </thead>
      <tbody>
        {props.data.companies.map((item, index) => (
          <tr>
            <th scope="col">{item.rank}</th>
            <th scope="col"> <a href={`/projects/fortune_1000/companies/v2/${item.stock_symbol}/`}>{item.name} </a></th>
            <td>{item.stock_symbol}</td>
            <td className="text-dark">${item.latestPrice}
              <span className={'small ' + item.priceChangeClass}> {item.priceChange} </span>
              <span className={'small ' + item.priceChangePercentClass}>({item.priceChangePercent}%)</span>
            </td>
            <td><NumberFormat value={item.marketCap} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StocksList;