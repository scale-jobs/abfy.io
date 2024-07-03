export type LoggerContext = {
  message: string;
  level: "INFO" | "ERROR" | "WARN";
  data?: any;
};

export type ExperimentContext = {
  variantId: string;
  context: any;
};

export type ABfySessionContext = {
  sessionId: string;
  experimentVariantMapping: Record<string, ExperimentContext>;
};

export type UseABfySessionProps = {
  abfySession: ABfySessionContext;
  setABfySession: (context: ABfySessionContext) => void;
};

export type AbfyProviderProps = {
  children: any;
  backendUrl: string;
};

export type ExperimentResultPayload = {
  experimentId: string;
  variantId: string;
  timestamp: string;
  renderId: string;
  context?: any;
  goalReached?: boolean;
  timeOnVariant?: boolean;
  error?: string;
};

export type ExperimentResultProps = {
  experimentId: string;
  variantId: string;
  backendUrl: string;
  renderId: string;
  context: any;
};
