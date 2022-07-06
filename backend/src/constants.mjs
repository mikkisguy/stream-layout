import { format } from "date-fns";
import { mongoose } from "mongoose";
import { configSchema } from "./schemas.mjs";

const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = `mongodb://mikkisguy:${DB_PASSWORD}@localhost:27017/mikkisguy-stream`;
const INITIAL_ACCESS_TOKEN = process.env.INITIAL_ACCESS_TOKEN;
const INITIAL_REFRESH_TOKEN = process.env.INITIAL_REFRESH_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export const logger = (message, error = false) => {
  const date = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const type = error ? "ERROR" : "INFO";

  return console.log(`${date} | ${type} | ${message}`);
};

export const initDatabase = async () => {
  try {
    mongoose.connect(DB_CONNECTION_STRING);
  } catch (error) {
    logger(error, true);
  }

  await mongoose.connection.on("connected", () => logger("Database connected"));

  // Create model (collection in MongoDB)
  const Config = mongoose.model("Config", configSchema);

  // Check if config is already initialized
  const initCheck = await Config.findById(1).exec();

  if (initCheck == undefined) {
    // Set initial config
    const initialConfig = new Config({
      _id: 1,
      token: {
        access: INITIAL_ACCESS_TOKEN,
        refresh: INITIAL_REFRESH_TOKEN,
        expiresIn: 0,
        obtainmentTimestamp: 0,
      },
      client: { id: CLIENT_ID, secret: CLIENT_SECRET },
    });

    // Save to database
    await initialConfig.save().then((savedConfig) => {
      if (savedConfig === initialConfig) {
        logger("Initial config saved");
      }
    });
  } else {
    return logger("Config already initialized");
  }
};
