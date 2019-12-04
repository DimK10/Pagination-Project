import React from "react";
import Menu from './components/Menu';
import Layout from './components/Layout';
import Content from './components/Content';
import './App.css'

const App = () => {
  return (
    <div>
        <Menu />
        <Layout />
        <Content />
    </div>
  );
};

export default App;
