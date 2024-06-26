import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Confirmation from "./components/Confirmation";

function App() {
  const [submittedData, setSubmittedData] = useState(null);

  return (
    <div className="app">
      <h1 className="py-6 text-sky-950">BOOK YOUR TICKETS</h1>
      {!submittedData ? (
        <Form setSubmittedData={setSubmittedData} />
      ) : (
        <Confirmation
          submittedData={submittedData}
          resetForm={() => setSubmittedData(null)}
        />
      )}
    </div>
  );
}

export default App;