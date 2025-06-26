import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function TraptShow() {
  const data = showData['trapt'];

  return <ShowDetailPage {...data} />;
}
