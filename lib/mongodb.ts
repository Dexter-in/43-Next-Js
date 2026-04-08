import mongoose from 'mongoose';

// Define the type for our cached connection
type MongooseConnection = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Extend the global object to include our mongoose cache
declare global {
  var mongoose: MongooseConnection | undefined;
}

// Retrieve MongoDB URI from environment variables.
// Intentionally validated at call time (not module init) so the app can build even
// when the environment is missing/partial (e.g. misconfigured deploy envs).
const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached: MongooseConnection = global.mongoose || { conn: null, promise: null };

// Initialize the global cache if it doesn't exist
if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Caches the connection to prevent multiple connections during development.
 * 
 * @returns {Promise<typeof mongoose>} The Mongoose instance
 */
async function connectDB(): Promise<typeof mongoose> {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }

  // Return the cached connection if it exists
  if (cached.conn) {
    return cached.conn;
  }

  // If no cached connection exists but a promise is in progress, await it
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Create a new connection promise
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    // Await the connection promise and cache the result
    cached.conn = await cached.promise;
  } catch (e) {
    // Reset the promise cache on error to allow retry
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
