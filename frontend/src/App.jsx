import { useEffect } from 'react'
import { testConnection } from "./api";

function App() {
 useEffect(() => {
    testConnection();
  }, []);

  return (
    <h1>Frontend Connected ✅</h1>
  );
}

export default App;