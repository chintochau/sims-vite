import { useEffect, useState } from "react";
import { getColorForGrid } from "./functions/mapUtils";
import AgentDetail from "./components/AgentDetail";
import Map from "./components/Map";
import { updateAgentData } from "./functions/dbUtils";
const baseUrl = "http://localhost:3000";

function App() {
  const [agents, setAgents] = useState([]);
  const [worldGrid, setWorldGrid] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState(true);

  const getData = async () => {
    const response = await fetch(`${baseUrl}/sims/data`);
    const data = await response.json();
    setAgents(data.agents);
    setWorldGrid(data.world.grid);
  };

  const moveObject = async (oldPosition, newPosition, agentId) => {
    if (agentId) {
      const response = await updateAgentData(agentId, {
        location: { x: newPosition.x, y: newPosition.y },
      });
      setShouldRefresh(true);
      return response;
    }

    const response = await fetch(`${baseUrl}/sims/map/object/move`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldPosition, newPosition, agentId }),
    });
    const data = await response.json();
    setShouldRefresh(true);
  };

  useEffect(() => {
    if (shouldRefresh) {
      getData();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  return (
    <div className="flex w-full ">
      <div className="flex-col items-center flex-[2]  ">
        <div className="sticky top-0 ">
          <Map
            agents={agents}
            worldGrid={worldGrid}
            setSelectedAgent={setSelectedAgent}
            moveObject={moveObject}
          />
          <div className="px-8 py-2">
            <AgentDetail
              selectedAgent={selectedAgent}
              setShouldRefresh={setShouldRefresh}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-[1]">
        {agents &&
          agents.map((agent, index) => (
            <CharacterComponent
              key={index}
              character={agent}
              setSelectedAgent={setSelectedAgent}
            />
          ))}
      </div>
    </div>
  );
}
const CharacterComponent = ({ character, setSelectedAgent }) => {
  return (
    <div className="p-2 border border-gray-300 shadow rounded-md">
      <h2 className="text-xl font-bold mb-4">{character.name}</h2>
      <ul className="space-y-1 overflow-y-auto max-h-60 text-sm">
        <li className="">
          <strong className="text-gray-700">Current Action:</strong>{" "}
          <span className="">{character.currentAction}</span>
        </li>
        <li className="">
          <strong className="text-gray-700">Goal:</strong>{" "}
          <span className="">{character.goal}</span>
        </li>
        <li className="">
          <strong className="text-gray-700">Location:</strong>{" "}
          <span className="">
            ({character.location.x}, {character.location.y})
          </span>
        </li>
        <li className="">
          <strong className="text-gray-700">State:</strong>{" "}
          <span className="">{character.state}</span>
        </li>
        <li className="">
          <strong className="text-gray-700">ID:</strong>{" "}
          <span className="">{character._id}</span>
        </li>
      </ul>
    </div>
  );
};

export default App;
