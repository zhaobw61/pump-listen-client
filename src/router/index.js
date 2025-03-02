import CoinList from '../view/coinList';
import CoinHot from '../view/coinHot';
import CoinScoreList from '../view/coinScoreList';
import { Navigate } from 'react-router-dom';

const routes = [
  {
    path: '/',
    element: <Navigate to='/coinList' />,
  },
  {
    path: '/coinList',
    element: <CoinList />,
  },
  {
    path: '/coinScoreList',
    element: <CoinScoreList />,
  },
  // 捕获所有未匹配的路径
  // { path: '*', element: <Navigate to='/' /> },
];

export default routes;
