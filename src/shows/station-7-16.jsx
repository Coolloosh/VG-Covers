import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function StationShow() {
  const data = showData['station-7-16'];

  return <ShowDetailPage {...data} />;
}
