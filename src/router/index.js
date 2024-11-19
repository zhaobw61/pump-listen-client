import CoinList from '../view/coinList';
import CoinHot from '../view/coinHot';
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
    path: '/coinHot/:address',
    element: <CoinHot />,
  },
  // 捕获所有未匹配的路径
  // { path: '*', element: <Navigate to='/' /> },
];

export default routes;
