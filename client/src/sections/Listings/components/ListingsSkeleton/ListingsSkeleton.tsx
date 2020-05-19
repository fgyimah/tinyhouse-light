import React from 'react';

import { Skeleton, Divider } from 'antd';

import './styles/ListingsSkeleton.css';

interface Prop {
  title: string;
}

export const ListingsSkeleton = ({ title }: Prop) => {
  return (
    <div className="listings-skeleton">
      <h2> {title}</h2>
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
    </div>
  );
};
