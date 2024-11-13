import axios from 'axios';
// 获取交易对列表
export const getPairListService = async (pageIndex, pageSize) => {
  const res = await axios.get('/pairlist', {
    params: {
      pageIndex,
      pageSize,
    },
  });
  return res.data;
};

// 更新单个交易对
export const updatePairInfoService = async (info) => {
  const res = await axios.post('/updatePair', {
    ...info,
  });
};
