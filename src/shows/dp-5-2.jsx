import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function DeerParkShow() {
  const data = showData['dp-5-2'];

  return <ShowDetailPage {...data} />;
}