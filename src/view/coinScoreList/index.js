import React, { useEffect, useRef, useState } from 'react';
import { Table, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import styles from './index.module.css';
import {
  getHotCoinListService,
  getProgressCoinListService,
  getOpenedCoinListService,
} from '../../service/index';

function CoinScoreList() {
  const [progressCoinList, setProgressCoinList] = useState([]);

  async function getProgressCoinList() {
    const res = await getProgressCoinListService();
    const { success, data } = res;
    if (success) {
      setProgressCoinList([...data]);
    } else {
      alert('刷新即将打满列表失败');
    }
  }

  useEffect(() => {
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
    {
      title: '推特账户账号',
      dataIndex: 'screen_name',
      key: 'screen_name',
      render: (_) => {
        return <div>{_ ? _ : '-'}</div>;
      },
    },
    {
      title: '账号创建时间',
      dataIndex: 'account_created_at',
      key: 'account_created_at',
      render: (_) => {
        return <div>{_ ? moment(_).format('YYYY-MM-DD HH:mm:ss') : '-'}</div>;
      },
    },
    {
      title: '账号点赞数量',
      dataIndex: 'account_favourites_count',
      key: 'account_favourites_count',
      render: (_) => {
        return <div>{_ ? _ : '-'}</div>;
      },
    },
    {
      title: '账号粉丝数量',
      dataIndex: 'account_followers_count',
      key: 'account_favourites_count',
      render: (_) => {
        return <div>{_ ? _ : '-'}</div>;
      },
    },
    {
      title: '账号关注数量',
      dataIndex: 'account_friends_count',
      key: 'account_friends_count',
      render: (_) => {
        return <div>{_ ? _ : '-'}</div>;
      },
    },
    {
      title: '账号媒体数量',
      dataIndex: 'account_media_count',
      key: 'account_media_count',
      render: (_) => {
        return <div>{_ ? _ : '-'}</div>;
      },
    },
    {
      title: '账号分数',
      dataIndex: 'account_score',
      key: 'account_score',
      render: (_) => {
        return <div>{_ ? _.toFixed(0) : '-'}</div>;
      },
    },
  ];
  return (
    <div className='App'>
      <Flex gap='large'>
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

export default CoinScoreList;
