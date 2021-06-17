import React, { useState } from "react";
import "./App.css";
import UserList from "./components/UserList";
import Register from "./components/Register";

function App() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center max-w-screen-2xl mx-auto ">
      <Register open={open} setOpen={setOpen} />
      <UserList />
    </div>
  );
}

export default App;
