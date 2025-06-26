import React from 'react';
import ShowDetailPage from '../components/ShowDetailPage';
import { showData } from '../videoData';

export default function DPBOTBShow() {
  const data = showData['dpbotb'];

  return <ShowDetailPage {...data} />;
}
