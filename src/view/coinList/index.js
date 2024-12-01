import React, { useEffect, useRef, useState } from 'react';
import { Table, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import styles from './index.module.css';
import {
  getHotCoinListService,
  getProgressCoinListService,
} from '../../service/index';

function App() {
  const navigate = useNavigate();

  const [hotCoinList, setHotCoinList] = useState([]);
  const [progressCoinList, setProgressCoinList] = useState([]);

  async function getPairList() {
    const res = await getHotCoinListService();
    const { success, data } = res;
    if (success) {
      setHotCoinList([...data]);
    } else {
      alert('刷新列表失败');
    }
  }

  async function getProgressCoinList(params) {
    const res = await getProgressCoinListService();
    const { success, data } = res;
    if (success) {
      setProgressCoinList([...data]);
    } else {
      alert('刷新列表失败');
    }
  }

  useEffect(() => {
    getPairList();
    getProgressCoinList();
  }, []);

  const columns = [
    {
      title: '名称',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '创建时间',
      dataIndex: 'creatTime',
      key: 'creatTime',
      render: (_, record) => {
        const dateTime = moment(Number(_)).format('YYYY-MM-DD HH:mm:ss');
        return <div>{dateTime}</div>;
      },
    },
  ];
  return (
    <div className='App'>
      <Flex gap='large'>
        <div className={styles.tableWrap}>
          <h2>热门代币</h2>
          <Table
            columns={columns}
            dataSource={hotCoinList}
            pagination={false}
          />
        </div>
        <div className={styles.tableWrap}>
          <h2>即将打满代币</h2>
          <Table
            columns={columns}
            dataSource={progressCoinList}
            pagination={false}
          />
        </div>
      </Flex>
    </div>
  );
}

export default App;
