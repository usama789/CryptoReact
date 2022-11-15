import { isError, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useAsyncMutation } from "../hooks/useAsyncMutation";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const Home = () => {
  const [search, setSearch] = useState("");    //input 
  const [crypto,setCrypto] = useState({});    //this is for the response from server
  console.log(crypto);
  const { coin } = useParams();
  // console.log(search);
  console.log(crypto);
  const { data, isLoading, isError } = useQuery(["id", coin], () => {
    return axios
      .get(
        "https://api.coingecko.com/api/v3/coins/bitcoin?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true"
      )
      .then((res) => res.data);
  });
    const fetchTodos = (search) => {
     axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${search}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`
        )
        .then((res) => {
          setCrypto(res.data);
          console.log(res.data);
          // console.log(crypto);
        }
          ).catch((err)=> console.log(err));
        
    };

  //   const query = useQuery({ queryKey: ["todos"], queryFn: fetchTodos });

  // console.log(data);

  const plainMutate = useAsyncMutation(() => {
    alert("clicked");
  });

  if (isError) {
    return <h1>Sorry, there was an error</h1>;
  }

  if (isLoading) {
    return <h1>Loading ... </h1>;
  }
  return (
    <>
      <h1>this is Home page</h1>
      <p>{data?.name}</p>
      <form>
        <button onClick={() => plainMutate()}>Run plain Mutation</button>
        <input placeholder="Search the coin" onChange={(e)=> setSearch(e.target.value)}></input>
        <Link to="/coin">
          <button onClick={()=> fetchTodos(search)}>Update the coin</button>
        </Link>
      </form>
    </>
  );
};
