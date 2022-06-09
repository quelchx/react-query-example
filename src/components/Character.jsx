import React from "react";
import { Card } from "antd";

const Character = (props) => {
  const { name, id, status, image } = props;
  return (
    <Card title={name} cover={<img alt={id} src={image} />} hoverable>
      <p>Status: {status}</p>
    </Card>
  );
};

// this is just an example of using memo to compare prev and next props
// export default React.memo(Character, (prevProps, nextProps) => {
//   if (prevProps !== nextProps) return false;
//   return true;
// });

export default Character;
