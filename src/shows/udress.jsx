import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function UdressShow() {
  const data = showData['udress'];

  return <ShowDetailPage {...data} />;
}
