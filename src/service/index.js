import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: '/api',
});
// 获取交易对列表
export const getPairListService = async (pageIndex, pageSize) => {
  const res = await axiosInstance.get('/pairlist', {
    params: {
      pageIndex,
      pageSize,
    },
  });
  return res.data;
};

// 更新单个交易对
export const updatePairInfoService = async (info) => {
  const res = await axiosInstance.post('/updatePair', {
    ...info,
  });
};

// 删除交易对
export const deletePairService = async (address) => {
  const res = await axiosInstance.post('/deletePair', {
    address: address,
  });
};
