# Publishing Experiment Results 

## Data format for Publishing 

## Experiment Result Payload

The `ExperimentResultPayload` type represents the data structure used to store information about experiment results in an A/B testing library for React. It includes the following fields:

- `experimentId` (string): Unique identifier for the experiment.
- `variantId` (string): Identifier for the variant or treatment group.
- `timestamp` (string): Timestamp indicating when the experiment result was recorded.
- `renderId` (string): Identifier for the render context in which the experiment was conducted.
- `context` (optional, any): Additional context or metadata related to the experiment.
- `goalReached` (optional, boolean): Indicates whether the experiment goal was reached (`true`) or not (`false`).
- `timeOnVariant` (optional, boolean): Indicates if time on variant was tracked (`true`) or not (`false`).
- `error` (optional, string): If an error occurred during the experiment, this field may contain an error message.

### Example

```json
{
  "experimentId": "exp-123",
  "variantId": "variant-a",
  "timestamp": "2024-06-29T15:00:00Z",
  "renderId": "render-456",
  "context": {
    "userId": "user-789",
    "browser": "Chrome"
  },
  "goalReached": true
}

## Data Posting Process with `<ABfyProvider>`

The `<ABfyProvider>` component in your React application facilitates the posting of experiment result data to a backend endpoint specified via the `backendUrl` prop. This endpoint typically handles storage, analysis, and reporting of A/B testing experiment results. Below is a guide on how data posting is managed:

### Usage

To integrate A/B testing functionality into your React application:

1. **Install ABfy Library**: Ensure you have installed the ABfy library in your project.

   ```bash
   npm install @eyeamkd/abfy

2. **Configure ABfyProvider**:
Import and wrap your application's root component with <ABfyProvider>, specifying the backendUrl prop with your backend endpoint URL. 

```tsx
import React from 'react';
import { ABfyProvider } from '@eyeamkd/abfy';

const App = () => {
  return (
    <ABfyProvider backendUrl="https://your-backend-endpoint">
      {/* Your application components */}
    </ABfyProvider>
  );
};

export default App;
``` 

3. **Data Posting Process**
- When recordExperimentResult(result) is called within your application using ABfy hooks or methods:

- Data Format: The result object conforms to the ExperimentResultPayload structure, containing experiment details like experimentId, variantId, timestamp, context, goalReached, etc.

- Backend Integration: ABfyProvider internally manages the HTTP POST request to the specified backendUrl. It sends the result data as JSON to the backend endpoint for storage and analysis.

- Error Handling: Ensure your backend endpoint handles errors gracefully and provides appropriate responses for data posting failures or validation issues.

4. **Security Considerations**

- Secure Backend: Ensure your backend endpoint (https://your-backend-endpoint) is secure and supports HTTPS to protect data transmission.

- Authentication: Consider implementing authentication mechanisms or using tokens to secure access to the backend endpoint, especially if it involves sensitive user data.
  
- ENV Variables: Make sure to pass the POST endpoint via ENV variable and whitelist ``abfy.io`` to post data to the endpoint