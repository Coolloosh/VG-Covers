import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function SwimShow() {
  const data = showData['swim'];

  return <ShowDetailPage {...data} />;
}