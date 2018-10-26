import React from "react";
import { Collapse } from 'antd';
const Panel = Collapse.Panel;

const ProjectGoals = (props) => {
  return (
    <Collapse defaultActiveKey={['0']} className="mb-3">
      <Panel header="More about this project:" key="1">
        <div className="container">
          <div className="my-2">
            <h5 className="card-title mx-2 my-2"> List of Nasdaq Companies</h5>
            <div id="Bar">
              <p className="card-text mx-2 my-2">
                The initial data of company name and stock symbol has been extracted from a CSV file provided by Nasdaq.
              </p>
              <p className="card-text mx-2 my-2">
                The goal of this project is to learn and gain practice with building APIs and using them in the frontend.
                Also, learn how to load data into a Django model, persist it in
                a postgres db, and show the data in a View. Next step is to integrate this page of information with IEX API
                which will provides
                stock price data for given companies.
                The goals of this project are described below:
              </p>
              <ul>
                <li> Load data into Django model and show it in a View (Done)</li>
                <li> Fix missing stock symbol data from by searching Nasdaq
                  <a href="https://www.nasdaq.com/screening/company-list.aspx"> DB</a>.
                  Then update the models in Django DB.(Done)
                </li>
                <li> Integrate this page with <a href="https://iextrading.com/developer">IEX API </a>
                  to show stock price info(Done)
                </li>
                <li> Paginate the View ( Done )</li>
                <li> Add searching functionality ( Done )</li>
                <li> Add React library in Frontend for more responsive feel. ( Done )</li>
                <li> Live update the price change information using React and Django. ( Done )</li>
                <li> Add Detail view for each company where you can see additional information
                  like historic stock price data for different time periods after clicking on it.
                  Learn to use ChartJS.( To Be Done )
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Panel>
    </Collapse>
  );
}

export default ProjectGoals;