import React from 'react';
import { Space, Table, Tag } from 'antd';
const columns = [
  {
    title: '名称',
    dataIndex: 'ticker',
    key: 'ticker',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '创建时间',
    dataIndex: 'creationTime',
    key: 'creationTime',
  },
  {
    title: '推特',
    dataIndex: 'twitterAccount',
    key: 'twitterAccount',
  },
];
const data = [
  {
    ticker: 'John Brown',
    address: '5kvHPBLeGiDVkRHzrFJ3NA3FFne17DPSZrrBLzqcpump',
    creationTime: 1731389388014,
    twitterAccount: 'https://x.com/ProphecySolana',
  },
];
function App() {
  return (
    <div className='App'>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default App;
