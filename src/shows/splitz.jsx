import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function SplitzShow() {
  const data = showData['splitz'];

  return <ShowDetailPage {...data} />;
}
