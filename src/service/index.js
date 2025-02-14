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

// 获取推特热度
export const getTwitterLogHotService = async (address) => {
  const res = await axiosInstance.post('/getAddressHot', {
    address: address,
  });
  return res.data;
};

// 获取热门代币列表
export const getHotCoinListService = async () => {
  const res = await axiosInstance.get('/hotCoinlist');
  console.log(res);
  return res.data;
};

// 获取即将打满列表
export const getProgressCoinListService = async () => {
  const res = await axiosInstance.get('/progressCoinList');
  return res.data;
};

// 获取已开盘列表
export const getOpenedCoinListService = async () => {
  const res = await axiosInstance.get('/openedCoinList');
  return res.data;
}