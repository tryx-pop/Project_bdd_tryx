import { readFile } from "node:fs/promises"
import { DB_PATH } from "../constants.js"

export const readDatabase = async () => {
  try {
    const json = await readFile(DB_PATH, { encoding: "utf-8" })

    return JSON.parse(json)
  } catch (err) {
    return []
  }
}
