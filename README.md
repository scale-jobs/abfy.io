
# ABfy: A Lightweight A/B Testing Library for React

ABfy is a simple yet powerful A/B testing library designed to make experimentation easy within your React applications. It provides intuitive components and utilities to help you define, track, and analyze A/B tests to optimize your user experience and drive better results.

## Features

* **Minimalistic API:**  Easily define experiments and variants using just two components: `<Experiment>` and `<Variant>`.
* **Session-Based Consistency:**  Ensures users see the same variant throughout their session, even if they refresh the page.
* **Automatic Experiment Detection:** The `<KeyAction>` component automatically associates user interactions with the correct experiment.
* **Customizable Tracking:**  Integrate with your backend or data storage solution to collect experiment data for analysis.
* **Lightweight:**  No external dependencies (except for `react`).  A simple, internal UUID-like generation is used for unique identifiers.

## Installation

```bash
npm install abfy
# or
yarn add abfy
```

## Usage

```javascript
import { ABfyProvider, Experiment, Variant, KeyAction } from "abfy";

function MyComponent() {
  return (
    <ABfyProvider backendUrl="https://your-backend-endpoint">
      <Experiment id="my-experiment">
        <Variant id="control">
          <button>Original Button</button>
        </Variant>
        <Variant id="variation">
          <button>New Button</button>
        </Variant>
      </Experiment>

      {/* Track user interactions within the experiment */}
      <KeyAction onClick={() => /* ... */}>
        Track this click!
      </KeyAction>
    </ABfyProvider>
  );
}
```

## Components

* **`<ABfyProvider>`:**  Wraps your application and provides configuration (like the backend URL).
* **`<Experiment>`:**  Defines an A/B test with a unique ID.
* **`<Variant>`:**  Represents a different version (variant) of your test.
* **`<KeyAction>`:**  Captures user interactions within an experiment for tracking.

## Advanced Usage

* **Custom Probabilities:**  Assign custom probabilities to each variant to control traffic allocation.
* **More Event Tracking:** Attach additional event handlers (e.g., `onSubmit`, `onChange`) to `<KeyAction>` to track different types of interactions.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

ABfy is open-source software licensed under the MIT License.

---
