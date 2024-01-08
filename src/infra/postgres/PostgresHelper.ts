import path from 'path'
import { Pool } from 'pg'
import * as dotenv from 'dotenv'
dotenv.config({ path: path.join(__dirname, '../../../.env') })

const pool = new Pool({
  host: process.env.DW_POSTGRES_HOST,
  user: process.env.DW_POSTGRES_USER,
  database: process.env.DW_POSTGRES_DB,
  password: process.env.DW_POSTGRES_PASS,
  ssl: true,
  port: 5432
})

export const dwdb = {
  query: (text, params) => pool.query(text, params)
}

export const getClient = async (): Promise<any> => {
  return pool.connect()
}
