let mongoose = require('mongoose')

let student = new mongoose.Schema({
  "firstName":String, 
  "lastName":String, 
  "batch":String,
  "skills":Array, 
  "college_id":String, 
})

module.exports = mongoose.model('students', student)