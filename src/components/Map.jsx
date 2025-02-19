import React, { useState } from "react";
import { cn, getCellSymbol, getColorForGrid } from "../functions/mapUtils";

const Map = ({
  agents,
  worldGrid,
  setSelectedAgent,
  moveObject,
  moveAgent,
}) => {
  const [selectedObject, setSelectedObject] = useState(null);

  const handleDragStart = (e, oldPosition, agentId = null) => {
    console.log("drag start", oldPosition, agentId);
    
    e.dataTransfer.setData("text", JSON.stringify(oldPosition));
    e.dataTransfer.setData("agentId", JSON.stringify(agentId));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, { newPosition }) => {
    const oldPosition = JSON.parse(e.dataTransfer.getData("text"));
    const agentId = JSON.parse(e.dataTransfer.getData("agentId"));
    moveObject(oldPosition, newPosition, agentId);
  };

  const getAgentAtPosition = (x, y) => {
    return agents.find(
      (agent) => agent.location.x === x && agent.location.y === y
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center px-2 py-10">
        {worldGrid &&
          worldGrid.map((col, colIndex) => (
            <div key={colIndex} className="flex flex-col">
              {col.map((cell, cellIndex) => (
                <div
                  key={cellIndex}
                  className={`size-4 border-gray-300 text-[10px] ${getColorForGrid(
                    cell
                  )}`}
                  onDragOver={handleDragOver}
                  onDrop={(e) =>
                    handleDrop(e, {
                      oldPosition: { x: colIndex, y: cellIndex },
                      newPosition: { x: colIndex, y: cellIndex },
                    })
                  }
                >
                  {getAgentAtPosition(colIndex, cellIndex) ? (
                    <div
                      className="w-full h-full  cursor-pointer"
                      draggable
                      onDragStart={(e) =>
                        handleDragStart(
                          e,
                          {
                            x: colIndex,
                            y: cellIndex,
                          },
                          getAgentAtPosition(colIndex, cellIndex).agentId
                        )
                      }
                      onClick={() =>
                        setSelectedAgent(getAgentAtPosition(colIndex, cellIndex))
                      }
                    >
                      <p className=" bg-red-900 h-full w-full rounded-full  text-center relative text-red-50">
                        {getAgentAtPosition(colIndex, cellIndex).name}
                      </p>
                    </div>
                  ) : (
                    <p
                      className={cn(
                        "text-center text-sm absolute",
                        cell.object && "cursor-pointer"
                      )}
                      onClick={() => setSelectedObject(cell)}
                      draggable
                      onDragStart={(e) =>
                        handleDragStart(e, { x: colIndex, y: cellIndex })
                      }
                    >
                      {getCellSymbol(cell)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
      </div>

      {selectedObject && (
        <div className="flex flex-col px-8 gap-2">
          <h2 className="text-xl font-bold">Selected Object</h2>
          {selectedObject.object &&
            Object.entries(selectedObject.object).map(([key, value]) => (
              <div key={key}>
                {key !== "actions" ? (
                  <p>
                    <span className="font-bold">{key}</span>: {value}
                  </p>
                ) : (
                  <>
                    <span className="font-bold">Actions:</span>
                    {value.map((action, index) => (
                      <p key={index}>
                        {index + 1}. {action}
                      </p>
                    ))}
                  </>
                )}
              </div>
            ))}
          {JSON.stringify(selectedObject)}
        </div>
      )}
    </div>
  );
};

export default Map;
