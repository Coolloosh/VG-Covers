import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function ConchIslandShow() {
  const data = showData['conch-6-20'];

  return <ShowDetailPage {...data} />;
}
