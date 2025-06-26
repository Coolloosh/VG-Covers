import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function DeerParkShow() {
  const data = showData['deer-park-3-7'];

  return <ShowDetailPage {...data} />;
}