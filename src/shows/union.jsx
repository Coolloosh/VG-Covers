import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function SmyrnaShow() {
  const data = showData['union'];

  return <ShowDetailPage {...data} />;
}
