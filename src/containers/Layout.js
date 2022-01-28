import React from 'react';
import { Layout, Breadcrumb } from 'antd';
// import { Link } from 'react-router-dom';

const {Content } = Layout;

const CustomLayout = (props) => {
  return (
    <Layout className="layout">
      <div className="container-fluid bg-dark">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark container">

          <a className="navbar-brand" href="http://sm-mashuque.herokuapp.com/"> SM Mashuque <span className="sr-only">(current)</span></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler"
                  aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarToggler">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="http://sm-mashuque.herokuapp.com/projects/">Projects</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="http://sm-mashuque.herokuapp.com/about/">About Me</a>
              </li>
            </ul>
          </div>
        </nav>

      </div>
      <Content style={{ padding: '0 5px' }}>
        <Breadcrumb style={{ margin: '5px 0' }}>
          {/*<Breadcrumb.Item><Link to={"/"}> Home </Link></Breadcrumb.Item>*/}
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 20, minHeight: 280 }}>
          { props.children }
        </div>
      </Content>

    </Layout>
  );
}

export default CustomLayout;
