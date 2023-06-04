"use client";

import { useEffect } from "react";

const favorites = () => {
  useEffect(() => {
    // update the document title
    document.title = "Favorites - Notedly";
  }, []);

  return (
    <div>
      <h1>Notedly</h1>
      <p>These are my favorites</p>
    </div>
  );
};

export default favorites;
