import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function BayardShow() {
  const data = showData['bayard-7-25'];

  return <ShowDetailPage {...data} />;
}
