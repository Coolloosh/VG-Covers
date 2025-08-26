import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function ConchShow() {
  const data = showData['conch-8-8'];

  return <ShowDetailPage {...data} />;
}
