import React from "react";
import { useQuery } from "react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { CoinPage } from "./pages/CoinPage";

// async function fetchPosts() {
//   const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts') return data }

function App() {
  const [client] = React.useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coin" element={<CoinPage />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
