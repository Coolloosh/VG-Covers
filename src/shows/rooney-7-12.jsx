import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function RooneyShow() {
  const data = showData['rooney-7-12'];

  return <ShowDetailPage {...data} />;
}
