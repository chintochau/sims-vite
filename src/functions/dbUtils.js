const baseUrl = "http://localhost:3000";

export const getAgentData = async (agentId, type = "memory") => {
  const response = await fetch(`${baseUrl}/sims/agent/${agentId}/${type}`);
  const data = await response.json();
  return data;
};

export const updateAgentData = async (agentId, data) => {
  const response = await fetch(`${baseUrl}/sims/agent/${agentId}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

export const getAgentObservation = async (agentId) => {
  const response = await fetch(`${baseUrl}/sims/agent/${agentId}/observe`);
  const data = await response.json();
  return data.observation;
};

export const modifyMemory = async (memoryId, data) => {
  const response = await fetch(`${baseUrl}/sims/memory/${memoryId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};
