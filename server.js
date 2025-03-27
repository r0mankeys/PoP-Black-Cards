import express from 'express'
import DB from './db.js'
import cors from 'cors'
import { doesUersExistInDB, addUserToDB } from './serverUtils.js'

const APP = express()
const PORT = 3000

APP.use(express.json())
APP.use(express.static('client'))
APP.use(express.static('client/assets'))
APP.use(cors())

APP.get('/', (request, response) => {
  response.sendStatus(200)
})

APP.post('/checkuser', async (request, response) => {
  try {
    const { blackCardNumber, email } = request.body
    const userExists = await doesUersExistInDB(DB, blackCardNumber, email)
    if (userExists) {
      return response.status(200).send('User already exists in DB')
    } else {
      return response.status(404).send('User does not exist in DB')
    }
  } catch (error) {
    console.error('Failed to check user in DB', error)
    return response.status(500).send(error.message)
  }
})

APP.post('/thankyou', async (request, response) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    age,
    email,
    homeAddress,
    blackCardNumber,
  } = request.body
  try {
    const userAdded = await addUserToDB(DB, {
      fullName: `${firstName} ${lastName}`,
      cardNumber: blackCardNumber,
      DOB: new Date(dateOfBirth).toISOString(), // For PostgresSQL format
      age: age,
      email: email,
      address: homeAddress,
    })
    if (userAdded) {
      response.redirect('/thankyou.html')
    }
  } catch (error) {
    console.error('Failed to add user to DB', error)
    response.status(500).send(error.message)
  }
})

APP.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
