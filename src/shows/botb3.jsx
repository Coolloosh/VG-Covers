import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function BOTB3Show() {
  const data = showData['botb3'];

  return <ShowDetailPage {...data} />;
}
