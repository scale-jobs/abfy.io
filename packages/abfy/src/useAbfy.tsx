import { useState } from "react";

type ExperimentResult = {
  experimentId: string;
  variantId: string;
};

type UseAbfyReturn = [
  Array<ExperimentResult>,
  (experimentId: string, variantId: string) => void,
];

function AbfyProvider(backendUrl: string): UseAbfyReturn {
  const [experimentData, setExperimentData] = useState<Array<ExperimentResult>>(
    []
  );

  const addExperimentResult = (experimentId: string, variantId: string) => {
    console.log("New Experiment Result added", experimentId, variantId);
    setExperimentData((prevData) => [...prevData, { experimentId, variantId }]);
    publishExperimentResult(experimentId, variantId, backendUrl);
  };

  return [experimentData, addExperimentResult];
}

export default AbfyProvider;

async function publishExperimentResult(
  experimentId: string,
  variantId: string,
  backendUrl: string
): Promise<void> {
  const payload = {
    experimentId,
    variantId,
    timestamp: new Date().toUTCString(),
  };

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to publish experiment result: ${response.statusText}`
      );
    }

    console.log("Experiment result published successfully.");
  } catch (error) {
    console.error("Error publishing experiment result:", error);
  }
}
