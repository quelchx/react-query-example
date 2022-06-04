import React from "react";
import { Card } from "antd";

const Character = (props) => {
  const { name, id, status, image } = props;
  console.log('render character card')
  return (
    <Card title={name} cover={<img alt={id} src={image} />} hoverable>
      <p>Status: {status}</p>
    </Card>
  );
};

export default React.memo(Character);
