import { format } from "date-fns";
import { mongoose } from "mongoose";
import { tokenSchema } from "./schemas.mjs";
import { RefreshingAuthProvider } from "@twurple/auth";

export const USER_ID = "140442943";
export const USER_NAME = "mikkisguy";

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const INITIAL_ACCESS_TOKEN = process.env.INITIAL_ACCESS_TOKEN;
const INITIAL_REFRESH_TOKEN = process.env.INITIAL_REFRESH_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const DB_CONNECTION_STRING = `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27017/${DB_NAME}`;

// Create model (collection in MongoDB)
const Token = mongoose.model("Token", tokenSchema);

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

  // Check if token data is already initialized
  const initCheck = await Token.findById(1).exec();

  if (initCheck == undefined) {
    // Set initial token data
    const initialTokenData = new Token({
      _id: 1,
      accessToken: INITIAL_ACCESS_TOKEN,
      refreshToken: INITIAL_REFRESH_TOKEN,
      expiresIn: 0,
      obtainmentTimestamp: 0,
    });

    // Save to database
    await initialTokenData.save().then((saved) => {
      if (saved === initialTokenData) {
        logger("Initial token data saved");
      }
    });
  } else {
    return logger("Token data already initialized");
  }
};

export const refreshingAuthProvider = async () => {
  let tokenData = JSON.stringify(await Token.findById(1).exec());

  const handleRefresh = async (newTokenData) => {
    tokenData = await Token.findOneAndUpdate(
      { _id: 1 },
      {
        accessToken: newTokenData.accessToken,
        refreshToken: newTokenData.refreshToken,
        expiresIn: newTokenData.expiresIn,
        obtainmentTimestamp: newTokenData.obtainmentTimestamp,
      },
      { new: true }
    ).then(logger("Refreshed token data saved"));
  };

  return new RefreshingAuthProvider(
    {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      onRefresh: (newTokenData) => handleRefresh(newTokenData),
    },
    JSON.parse(tokenData)
  );
};
