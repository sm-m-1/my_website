import React from 'react';
import NumberFormat from 'react-number-format';

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
            <th scope="col">{item.name}</th>
            <td>{item.stock_symbol}</td>
            <td className="text-dark">${item.latestPrice}
              <span className={'small ' + item.priceChangeClass}> {item.priceChange} </span>
              <span className={'small ' + item.priceChangePercentClass}>({item.priceChangePercent}%)</span>
            </td>
            <td><NumberFormat value={item.market_value} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StocksList;