const mongoose = require('mongoose')

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MANGO_URL, {
      connectTimeoutMS: 60000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    })
    console.log(`Connected to mangdb Database`)
  } catch (error) {
    console.log(`Mangodb Database Error ${error}`)
  }
}
module.exports = connectDb
