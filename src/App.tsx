import { useState } from "react";
import "./App.css";

const init_graph = (n: number) => {
  const list = new Array(n).fill([]);
  for (let i = 0; i < n; i++) {
    list[i] = new Array(n).fill(0);
  }
  return list;
};

const get_boundary = (graph: number[][]) => {
  const n = graph.length;
  const list = new Array(n).fill([]);
  for (let i = 0; i < n; i++) {
    list[i] = new Array(n).fill(0);
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (graph[i][j] === 1) {
        continue;
      }
      for (let k = 0; k < 4; k++) {
        const ni = (i + ((k - 1) % 2) + n) % n;
        const nj = (j + ((k - 2) % 2) + n) % n;
        if (graph[ni][nj] === 1) {
          list[i][j] = 1;
        }
      }
    }
  }
  return list;
};

const sum_boundary = (boundary: number[][]) => {
  return boundary.reduce((acc, row) => {
    return acc + row.reduce((acc, v) => acc + v, 0);
  }, 0);
};

function App() {
  const [n, setN] = useState(5);
  const [graph, setGraph] = useState(init_graph(n));
  const [boundary, setBoundary] = useState(get_boundary(graph));

  const handleResize = (num: number) => {
    const newGraph = new Array(n + num);
    for (let i = 0; i < n + num; i++) {
      newGraph[i] = new Array(n + num).fill(0);
    }
    setBoundary(get_boundary(newGraph));
    setGraph(newGraph);
    setN(n + num);
  };

  const handleClick = (i: number, j: number) => {
    const newGraph = [...graph];
    newGraph[i][j] = 1 - newGraph[i][j];
    setGraph(newGraph);
    setBoundary(get_boundary(newGraph));
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => handleResize(-1)}>-</button>
        <div>n = {n}</div>
        <button onClick={() => handleResize(1)}>+</button>
      </div>
      <div>boundary count: {sum_boundary(boundary)}</div>

      {graph.map((row, i) => (
        <div key={`row-${i}`} style={{ display: "flex" }}>
          {row.map((v: number, j: number) => (
            <div
              key={i * n + j}
              style={{
                width: 50,
                height: 50,
                margin: 2,
                borderRadius: 50,
                backgroundColor:
                  boundary[i][j] === 1
                    ? "#93c9ff"
                    : v === 1
                      ? "#ff93c9"
                      : "white",
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
