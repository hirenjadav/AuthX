import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../.env') })

const username = ''
const password = ''
const host = 'localhost'
const dbName = 'finance'

const credentials = username && password ? `${username}:${password}@` : ''
const protocol = host?.includes('mongodb.net') ? 'mongodb+srv' : 'mongodb'
const uri = `${protocol}://${credentials}${host}/${dbName}?retryWrites=true&w=majority`

const client = new MongoClient(uri)

async function createAdminUser() {
  try {
    await client.connect()

    const db = client.db(dbName)
    console.time('time')

    const existingUser = await db.collection('users').findOne({
      $or: [{ userName: 'test' }, { email: 'test@asbl.in' }],
    })
    if (existingUser) {
      return
    }

    const hashedPassword = await bcrypt.hash('Asbl@1234', 10)

    const newUser = {
      firstName: 'Test',
      lastName: 'User',
      userName: 'test',
      phoneNumber: '1234567890',
      email: 'test@asbl.in',
      password: hashedPassword,
      projects: [],
      isActive: true,
      isSuperAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await db.collection('users').insertOne(newUser)
    console.timeEnd('time')
  } catch (error) {
    console.error('Error:', error.message)
  } finally {
    await client.close()
  }
}

createAdminUser()
