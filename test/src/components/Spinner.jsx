import React from "react";
import { Spin } from 'antd'

const Spinner = () => {
  return (
    <div className="center-content">
      <div className="spinner">
        <Spin size="large" />
      </div>
    </div>
  );
};

export default Spinner;
