import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function UnionShow() {
  const data = showData['union'];

  return <ShowDetailPage {...data} />;
}
