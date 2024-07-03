import { Environments, LogLevels } from "./constants";
import { LoggerContext } from "./types";

export const logger = (context: LoggerContext) => {
  if (process.env.NODE_ENV === Environments.development) {
    switch (context.level) {
      case LogLevels.ERROR:
        return console.error(context.message, context.data);
      case LogLevels.INFO:
        return console.log(context.message, context.data);
      case LogLevels.WARN:
        return console.warn(context.message, context.data);
      default:
        throw Error("Improper Log Input");
    }
  } else {
    if (context.level === LogLevels.ERROR) {
      return console.error(context.message, context.data);
    }
  }
};
