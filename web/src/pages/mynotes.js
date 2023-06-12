import React, { useEffect } from "react";

const MyNotes = () => {
  useEffect(() => {
    document.title = "My Notes - Notedly";
  }, []);

  return (
    <div>
      <h1>Notedly</h1>
      <p>This is my notes page</p>
    </div>
  );
};

export default MyNotes;
