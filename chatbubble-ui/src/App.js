import React, { useState } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";

const App = () => {
  const themeHook = useState("peru");
  return (
    <React.StrictMode>
      <div>
        <header>
          <Link to="/">ChatBubble</Link>
        </header>
        {/* <Router> */}
        {/* <SearchParams path="/" /> */}
        {/* <Details path="/details/:id" /> */}
        {/* </Router> */}
      </div>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));
