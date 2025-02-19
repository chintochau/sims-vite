import React, { useEffect, useState } from "react";
import {
  getAgentData,
  getAgentObservation,
  modifyMemory,
  updateAgentData,
} from "../functions/dbUtils";
import dayjs from "dayjs";
import { cn } from "../functions/mapUtils";

const AgentDetail = ({ selectedAgent, setShouldRefresh }) => {
  const { agentId } = selectedAgent || {};
  const [memories, setMemories] = useState([]);
  const [newX, setNewX] = useState(0);
  const [newY, setNewY] = useState(0);
  const [observation, setObservation] = useState("");
  const [newAction, setNewAction] = useState("");

  const getData = async () => {
    const data = await getAgentData(agentId, "memory");
    setMemories(data);
  };

  useEffect(() => {
    if (agentId) {
      getData();
    }
  }, [agentId]);

  const getObservation = async () => {
    const data = await getAgentObservation(agentId);
    setObservation(data);
  };

  const updateAgentInformation = async (data) => {
    const response = await updateAgentData(agentId, data);
    setShouldRefresh(true);
  };

  const deleteMemory = async (memoryId, memoryIndex) => {
    const response = await modifyMemory(memoryId, {
      type: "delete",
    });
    memories.splice(memoryIndex, 1);
    setMemories([...memories]);
    
    setShouldRefresh(true);
  };

  return (
    <>
      {selectedAgent && (
        <div className="p-6 space-y-6">
          {/* Agent Information Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Agent Details
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="w-24 font-medium text-gray-600">Name:</span>
                <span className="text-gray-800">{selectedAgent.name}</span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="w-24 font-medium text-gray-600">Action:</span>
                <span className="text-gray-800">
                  {selectedAgent.currentAction}
                </span>
                <form
                  className="flex items-center space-x-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateAgentInformation({
                      currentAction: newAction,
                    });
                  }}
                >
                  <input
                    type="text"
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value)}
                    className="px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="New action"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Update
                  </button>
                </form>
              </div>

              <div className="flex items-center space-x-4">
                <span className="w-24 font-medium text-gray-600">Goal:</span>
                <span className="text-gray-800">{selectedAgent.goal}</span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="w-24 font-medium text-gray-600">
                  Location:
                </span>
                <span className="text-gray-800">
                  ({selectedAgent.location.x}, {selectedAgent.location.y})
                </span>
                <form
                  className="flex items-center space-x-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateAgentInformation({
                      location: {
                        x: newX,
                        y: newY,
                      },
                    });
                  }}
                >
                  <input
                    type="number"
                    value={newX}
                    onChange={(e) => setNewX(e.target.value)}
                    className="w-20 px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    value={newY}
                    onChange={(e) => setNewY(e.target.value)}
                    className="w-20 px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Update
                  </button>
                </form>
              </div>

              <div className="flex items-center space-x-4">
                <span className="w-24 font-medium text-gray-600">State:</span>
                <span className="text-gray-800">{selectedAgent.state}</span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="w-24 font-medium text-gray-600">ID:</span>
                <span className="text-gray-800">{selectedAgent._id}</span>
              </div>
            </div>
          </div>

          {/* Observation Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Observation
            </h2>
            <button
              onClick={getObservation}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Get Observation
            </button>
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="whitespace-pre-line text-gray-700">{observation}</p>
            </div>
          </div>

          {/* Memories Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Memories</h2>
            <div className="space-y-4">
              {memories.map((memory, index) => (
                <div
                  key={memory._id}
                  className="p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <p className="whitespace-pre-line text-gray-700 mb-2 max-h-96 overflow-y-auto">
                    {memory.content}
                  </p>
                  <div className="flex">
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>
                        <span className="font-medium">Created at:</span>{" "}
                        {dayjs(memory.createdAt).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}
                      </p>
                      <p>
                        <span className="font-medium">Last access:</span>{" "}
                        {dayjs(memory.recentAccessTimestamp).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}
                      </p>
                      <p>
                        <span className="font-medium">Importance:</span>{" "}
                        <span>{memory.importance}</span>
                      </p>
                    </div>

                    <button
                      className=" cursor-pointer"
                      onClick={() => deleteMemory(memory._id, index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 ml-auto text-red-500 hover:text-red-600 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AgentDetail;
