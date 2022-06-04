import React from "react";
import { useQuery } from "react-query";
import { Card, Row, Button, Col, Typography, Alert } from "antd";

import Spinner from "./Spinner";
import Character from "./Character";

const Characters = () => {
  const [page, setPage] = React.useState(1);

  const fetchCharacters = async ({ queryKey }) => {
    /** since we are passing the page state as a prop (below) we can access the number in the queryKey array */
    const response = await fetch(
      "https://rickandmortyapi.com/api/character?page=" + queryKey[1]
    );
    return response.json();
  };

  const { status, data, error } = useQuery(
    ["characters", page],
    fetchCharacters
  );

  const paginate = (handler) => {
    if (handler === "back") {
      setPage((p) => p - 1);
    } else {
      setPage((p) => p + 1);
    }
  };
  const { Title, Paragraph } = Typography;

  if (status === "loading") return <Spinner />;
  if (status === "error") return <Alert message={error} type="error" />;

  return (
    <>
      <Typography
        style={{
          padding: 20,
        }}
      >
        <Title>Rick and Morty Characters</Title>
        <Paragraph>
          Every single character from the Rick and Morty Show
        </Paragraph>
        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={() => paginate("back")} disabled={page === 1}>
            {page - 1}
          </Button>
          <Button onClick={() => paginate("forward")} type="primary">
            {page}
          </Button>
        </div>
      </Typography>
      {data.results.length !== 0 && (
        <Row style={{ margin: "0 10px" }} gutter={12}>
          {data.results.map((character, idx) => {
            const { id, image, name, status } = character;
            return (
              <Col key={id} xs={6} sm={6} md={8} lg={12} xl={12}>
                <Character name={name} id={id} status={status} image={image} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default React.memo(Characters);
