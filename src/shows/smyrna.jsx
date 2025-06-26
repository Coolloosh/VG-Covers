import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function SmyrnaShow() {
  const data = showData['smyrna'];

  return <ShowDetailPage {...data} />;
}
