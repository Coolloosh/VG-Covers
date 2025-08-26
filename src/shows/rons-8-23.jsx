import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function RonsShow() {
  const data = showData['rons-8-23'];

  return <ShowDetailPage {...data} />;
}
