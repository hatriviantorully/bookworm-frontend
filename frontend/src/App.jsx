import { useEffect } from "react";
import { testConnection } from "./api";

function App() {
  console.log(" ✅ Frontend Connected");
  useEffect(() => {
    testConnection();
  }, []);

  return <h1>Frontend Connected ✅</h1>;
}

export default App;
