import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function UdanceShow() {
  const data = showData['UDANCEBOTB'];

  return <ShowDetailPage {...data} />;
}
