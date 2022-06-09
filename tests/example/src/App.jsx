import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

export default function App() {
  const {
    isLoading,
    error,
    data: query,
  } = useQuery("foo", () => axios("https://random.dog/woof.json"));

  // const [data, setData] = useState({});
  // const [isError, setError] = useState(false);
  // const [isLoading, setLoading] = useState(false);
  // const fetchData = async () => {
  //   setError(false);
  //   setLoading(true);
  //   try {
  //     const { data } = await axios();
  //     setData(data);
  //   } catch (err) {
  //     setError(true);
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  if (error) return <h1>{error.message}</h1>;
  if (isLoading) return <h2>Loading...</h2>;

  const { url } = query.data;
  return (
    <div>
      <img src={url} alt="image" />
    </div>
  );
}
