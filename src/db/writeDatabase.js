import { writeFile } from "fs/promises"
import { DB_PATH } from "../constants.js"

export const writeDatabase = async (db) => {
  const json = JSON.stringify(db)

  await writeFile(DB_PATH, json, { encoding: "utf-8" })
}
