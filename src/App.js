import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './component/Form'
import 'antd/dist/antd.css'
// import Demo from './component/usecallback'
import ListViewDom from './component/ListView'
// import ListViewDom from './component/ListView/demo'

function App() {
  return (
    <div className="App">
      {/* <Form></Form> */}
      {/* <Demo></Demo> */}
      <ListViewDom></ListViewDom>
    </div>
  );
}

export default App;
