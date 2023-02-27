import * as mongoose from "mongoose";
// supress eslint for whole file.
/* eslint-disable */

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose
if (!cached) cached = (global as any).mongoose = { conn: null, promise: null }

async function mongooseConnector(uri: string) {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose
        .connect(uri, {bufferCommands: false})
        .then((mongoose) => mongoose)
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default mongooseConnector