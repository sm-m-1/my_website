import React from 'react';
import { Card } from 'antd';
import { List, Avatar, Icon } from 'antd';

const StocksList = (props) => {
  console.log("props:", JSON.stringify(props));
  return (
     <List
        itemLayout="horizontal"
        dataSource={props.data.companies}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              // title={<a className="text-dark" href="">{item.name} ( {item.stock_symbol} )</a>}
              title={<h6 className="text-dark" >{item.name} ( {item.stock_symbol} )</h6>}
              description={<p className="text-dark">${item.latest_price}</p>}
            />
          </List.Item>
        )}
    />
  );
}

export default StocksList;