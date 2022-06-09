import React, { useCallback } from "react";
import { useQuery } from "react-query";
import { Row, Button, Col, Typography, Alert } from "antd";

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

  const hour = 1000 * 60 * 60;
  const { status, data, error, isFetching } = useQuery(
    ["characters", page],
    fetchCharacters,
    // this is good for data that isn't changing often (this is useful when we navigate away from this component and it would trigger the fetch again)
    {
      cacheTime: hour / 2,
      staleTime: hour / 4,
      refetchOnMount: false,
      // refetchOnWindowFocus: true,
    }
  );

  // console.log(isFetching);

  const paginate = useCallback(
    (handler) => {
      switch (handler) {
        case "back":
          return setPage((p) => p - 1);
        case "forward":
          return setPage((p) => p + 1);
        default:
          return;
      }
    },
    [setPage]
  );

  const { Title, Paragraph } = Typography;

  if (status === "loading") return <Spinner />;
  if (status === "error") return <Alert message={error} type="error" />;

  return (
    <>
      <Typography
        style={{
          padding: 16,
        }}
      >
        <Title>Rick and Morty Characters</Title>
        <Paragraph>
          Every single character from the Rick and Morty Show
        </Paragraph>
        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={() => paginate("back")} disabled={page === 1}>
            Back
          </Button>
          <div style={{ padding: "4px 8px" }}>
            {page} / {data.info.pages}
          </div>
          <Button onClick={() => paginate("forward")} type="primary">
            Forward
          </Button>
        </div>
      </Typography>
      {data.results.length !== 0 && (
        <Row style={{ margin: "0 10px" }} gutter={12}>
          {data.results.map((character, idx) => {
            const { id, image, name, status } = character;
            return (
              <Col key={id} xs={12} sm={12} md={8} lg={6} xl={6}>
                <Character name={name} id={id} status={status} image={image} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default Characters;
