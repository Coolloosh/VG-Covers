import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function CatsShow() {
  const data = showData['cats'];

  return <ShowDetailPage {...data} />;
}
