import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function CATSShow() {
  const data = showData['cats'];

  return <ShowDetailPage {...data} />;
}
