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
              title={<a href="">{item.name} ( {item.stock_symbol} )</a>}
              description={<h2>{item.latest_price}</h2>}
            />
          </List.Item>
        )}
    />
  );
}

export default StocksList;