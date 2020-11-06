// getting our libraries
const express = require('express')
const cors = require('cors')

const lbProfile = {
  firstName: 'Lamara',
  lastName: "Brown",
  preferences: {
    foods: ["Saturday Soup", "Popcorn", ""],
    dream holiday: "oanywher hot",
    number: 7
  },
  hoursOfSleep: "what is sleep?"
}

const db = {
  profiles: {
    1000: lbProfile,
  },
  books: {
        0: {
          title: 'The Blacker the Berry',
          author: 'Wallace Thurman '
        },
        1: {
            title: 'Here To Stay',
            author: ' Mark Edwards '
          },
          2: {
            title: 'I Am Watching You',
            author: 'Teresa Driscoll '
          },
}

const app = express()
app.use(cors())
app.use(express.json()) // for parsing application/json


// GET /profiles
app.get('/profiles', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: db.profiles
  })
})

// POST /profiles
app.post('/profiles', (req, res) => {

  // find the largest key and increment it
  const existingIds = Object.keys(db.profiles)
  const largestKey = Math.max(...existingIds)

  const newKey = largestKey + 1

  db.profiles[newKey] = req.body

  res.status(201).json({
    status: 'success',
    message: `Created a profile with id of ${newKey}`
  })
})

app.get('/profiles/:userId', (req, res) => {
  console.log(req.params.userId)

  const matchingProfile = db.profiles[req.params.userId]

  if (matchingProfile) {
    res.json({
      status: 'success',
      data: matchingProfile
    })
  } else {
    res.status(404).json({
      message: "Couldn't find user with that id"
    })
  }
  
})


app.delete('/profiles/:userId', (req, res) => {

  delete db.profiles[req.params.userId]

  res.status(200).json({
    status: 'success',
    message: 'deleted profile 1000'
  })
})


app.put('/profiles/:userId', (req, res) => {
  const idToUpdate = req.params.userId

  db.profiles[idToUpdate] = req.body


  res.status(200).json({
    message: "User updated"
  })
})

app.patch('/profiles/:userId', (req, res) => {

  db.profiles[req.params.userId] = {
    ...db.profiles[req.params.userId],
    ...req.body
  }

  res.status(200).json({
    message: "User updated"
  })
})


app.listen(4000, () => {
  console.log('server is running!')
})