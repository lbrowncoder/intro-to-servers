// getting our libraries
const express = require('express')
const cors = require('cors')

const lbProfile = { 
  firstName: 'Lamara',
  lastName: "Brown",
  preferences: {
    foods: ["Saturday Soup", "Popcorn"],
    dreamHoliday: "Anywhere hot",
    number: 7
  },
  hoursOfSleep: "what is sleep?"
}

const db = {
  profiles: {
    1000: lbProfile,
  books: {
    0: {
      title: "Animal Farm",
      author: "George Orwell"
    },
    1: {
      title: "The Blacker the Berry",
      author: "Wallace Thurman"
    },
    2: {
      title: "I Am Watching You",
      author: "Teresa Driscoll",
    },
  },
clothes: {
  0: {
    favouriteShoe: "nike trainers",
  },
  tv: {
    0: {
      favouriteChannel: "Netflix",
      favouriteShow: "Queen of the South",
      lengthOfTimeWatchingTvPerDay: "4",
    }
  }
}}}

const jsProfile = { 
  firstName: "John",
  lastName: "Smith",
  preferences: {
    foods: ["Indian", "Is beer a food?"],
    dreamHoliday: "Spain",
    number: 4
  },
  hoursOfSleep: 7,
}
const db1 = {
  profiles: {
    1001: jsProfile,
  books: {
    0: {
      title: "Tricks of The Mind",
      author: "Darren Brown"
    },
    1: {
      title: "No Mercy",
      author: "Martina Cole"
    },
    2: {
      title: "Troubled Blood",
      author: " Robert Galbraith",
    },
  },
clothes: {
  0: {
    favouriteShoe: "brogues",
  },
  tv: {
    0: {
      favouriteChannel: 'BBC1',
      favouriteShow: 'Match of The Day',
      lengthOfTimeWatchingTvPerDay:'7',
    }
  }
}}}


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
