import { useEffect, useState } from "react";
const baseUrl = "http://localhost:3000";

function App() {
  const [agents, setAgents] = useState([]);

  const getData = async () => {
    const response = await fetch(`${baseUrl}/sims/data`);
    const data = await response.json();
    console.log(data.agents);
    setAgents(data.agents);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-screen justify-center bg-slate-950">
      <h1 className="text-5xl font-bold text-white my-2">AI-Sims</h1>
      <div className="flex ">
        {/* <PhaserGame ref={phaserRef} /> */}
        {/* <GameMenu /> */}
        {agents &&
          agents.map((agent, index) => (
            <CharacterComponent key={index} character={agent} />
          ))}
      </div>

      <GridComponent agents={agents} />
    </div>
  );
}
const CharacterComponent = ({ character }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {character.name}
      </h2>
      <ul className="space-y-3 overflow-y-auto max-h-60">
        <li className="border-b pb-2">
          <strong className="text-gray-700">Current Action:</strong>{" "}
          <span className="text-gray-600">{character.currentAction}</span>
        </li>
        <li className="border-b pb-2">
          <strong className="text-gray-700">Goal:</strong>{" "}
          <span className="text-gray-600">{character.goal}</span>
        </li>
        <li className="border-b pb-2">
          <strong className="text-gray-700">Location:</strong>{" "}
          <span className="text-gray-600">
            ({character.location.x}, {character.location.y})
          </span>
        </li>
        <li className="border-b pb-2">
          <strong className="text-gray-700">Memory:</strong>
          <ul className="pl-4 mt-2 space-y-2">
            <li>
              <strong className="text-gray-700">Schedule:</strong>{" "}
              <span className="text-gray-600">{character.memory.schedule}</span>
            </li>
            <li>
              <strong className="text-gray-700">Personality:</strong>{" "}
              <span className="text-gray-600">
                {character.memory.personality}
              </span>
            </li>
            <li>
              <strong className="text-gray-700">Past Observations:</strong>{" "}
              <span className="text-gray-600">
                {character.memory.pastObservations.length} observations
              </span>
            </li>
            <li>
              <strong className="text-gray-700">Reflections:</strong>{" "}
              <span className="text-gray-600">
                {character.memory.reflections.length} reflections
              </span>
            </li>
          </ul>
        </li>
        <li className="border-b pb-2">
          <strong className="text-gray-700">Name:</strong>{" "}
          <span className="text-gray-600">{character.name}</span>
        </li>
        <li className="border-b pb-2">
          <strong className="text-gray-700">State:</strong>{" "}
          <span className="text-gray-600">{character.state}</span>
        </li>
        <li className="border-b pb-2">
          <strong className="text-gray-700">ID:</strong>{" "}
          <span className="text-gray-600">{character._id}</span>
        </li>
        <li>
          <strong className="text-gray-700">Version:</strong>{" "}
          <span className="text-gray-600">{character.__v}</span>
        </li>
      </ul>
    </div>
  );
};

const GridComponent = ({ agents }) => {
  const gridSize = 50;

  const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));

  agents.forEach((agent) => {
    const { x, y } = agent.location;
    // each cell is 32*32, so we need to divide by 32 to get the index
    const cellX = Math.floor(x / 32);
    const cellY = Math.floor(y / 32);
    grid[cellY][cellX] = 1;
  });

  return (
    <div>
      <h2>Agent Grid</h2>
      <div
        className="grid grid-cols-[repeat(50,_minmax(0,_1fr))] gap-0.5"
        style={{ aspectRatio: "1 / 1" }} // Optional for perfect square cells
      >
        {Array.from({ length: 2500 }).map((_, index) => (
          <div
            key={index}
            className="w-5 h-5 bg-slate-950 border border-gray-700"
          >
            {grid[Math.floor(index / 50)][index % 50] === 1 && (
              <div className="w-full h-full bg-blue-500"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
