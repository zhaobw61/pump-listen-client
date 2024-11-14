import React, { useEffect, useRef, useState } from 'react';
import { Space, Table, Modal, Input } from 'antd';
import {
  getPairListService,
  updatePairInfoService,
  deletePairService,
} from './service/index';
import moment from 'moment';

function App() {
  const inputRef = useRef(null);
  const [pairList, setPairList] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatePair, setUpdatepair] = useState({});
  const handlePaginationChange = (pagination) => {
    setPaginationInfo({
      ...pagination,
    });
  };
  const handleUpdateTwitter = (target) => {
    setIsModalOpen(true);
    setUpdatepair({
      ...target,
    });
  };
  const handleDeletePair = (target) => {
    deletePairService(target.address);
    getPairList();
  };
  const handleOk = () => {
    setIsModalOpen(false);
    inputRef.current.input.value = ''; // 不知道为什么效果
    updatePairInfo();
    getPairList();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  async function updatePairInfo() {
    const res = await updatePairInfoService(updatePair);
    console.log('res', res);
  }
  async function getPairList() {
    const { current, pageSize } = paginationInfo;
    const res = await getPairListService(current, pageSize);
    const {
      success,
      data: { list, totalCount },
    } = res;
    if (success) {
      setPairList([...list]);
      setPaginationInfo({
        ...paginationInfo,
        total: totalCount,
      });
    } else {
      alert('刷新列表失败');
    }
  }
  useEffect(() => {
    getPairList();
  }, [paginationInfo.current, paginationInfo.pageSize, paginationInfo.total]);
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
      render: (_, record) => {
        console.log(_);
        const dateTime = moment(Number(_)).format('YYYY-MM-DD HH:mm:ss');
        console.log(dateTime);
        return <div>{dateTime}</div>;
      },
    },
    {
      title: '推特',
      dataIndex: 'twitterAccount',
      key: 'twitterAccount',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a
            onClick={() => {
              handleUpdateTwitter(_);
            }}
          >
            修改推特
          </a>
          <a
            onClick={() => {
              handleDeletePair(_);
            }}
          >
            删除该代币
          </a>
        </Space>
      ),
    },
  ];
  return (
    <div className='App'>
      <Table
        columns={columns}
        dataSource={pairList}
        pagination={paginationInfo}
        onChange={(pagination) => {
          handlePaginationChange(pagination);
        }}
      />
      <Modal
        title='修改推特'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='确认'
        cancelText='取消'
      >
        <Input
          ref={inputRef}
          placeholder='请输入新的推特链接'
          onChange={(e) => {
            setUpdatepair({
              ...updatePair,
              twitterAccount: e.target.value,
            });
          }}
        />
      </Modal>
    </div>
  );
}

export default App;
