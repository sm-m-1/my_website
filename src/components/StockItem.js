import React from 'react';
import { List } from 'antd';

const StocksList = (props) => {
  return (
     <List
        itemLayout="horizontal"
        dataSource={props.data.companies}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              // title={<a className="text-dark" href="">{item.name} ( {item.stock_symbol} )</a>}
              title={<p style={{'fontSize': '15px'}} className="text-dark" >{item.name} ( {item.stock_symbol} )</p>}
              description={<p className="text-dark">${item.latestPrice}
                <span className={'small ' + item.priceChangeClass}> {item.priceChange} </span>
                <span className={'small ' + item.priceChangePercentClass}>({item.priceChangePercent}%)</span>
              </p>}
            />
          </List.Item>
        )}
    />
  );
}

export default StocksList;