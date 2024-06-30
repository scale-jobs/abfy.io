export type LoggerContext = {
  message: string;
  level: "INFO" | "ERROR" | "WARN";
  data?: any;
};
