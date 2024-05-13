import { useState } from "react";
import "./App.css";

const init_graph = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

function App() {
  const n = 5;
  const [graph, setGraph] = useState(init_graph);

  const handleClick = (i: number, j: number) => {
    const newGraph = [...graph];
    newGraph[i][j] = 1 - newGraph[i][j];
    setGraph(newGraph);
  };

  return (
    <>
      {graph.map((row, i) => (
        <div key={`row-${i}`} style={{ display: "flex" }}>
          {row.map((v, j) => (
            <div
              key={i * n + j}
              style={{
                width: 50,
                height: 50,
                margin: 2,
                borderRadius: 50,
                backgroundColor: v === 0 ? "white" : "red",
                border: "1px solid black",
              }}
              onClick={() => handleClick(i, j)}
            />
          ))}
        </div>
      ))}
    </>
  );
}

export default App;
