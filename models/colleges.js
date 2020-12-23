let mongoose = require('mongoose')

let colleges = new mongoose.Schema({
  "College Name":String, 
  "Genders Accepted":String,
  "Campus Size":String, 
  "Total Student Enrollments":Number, 
  "Total Faculty": Number, 
  "Established Year":Number, 
  "Rating": Number, 
  "University": String, 
  "Courses":Array, 
  "Facilities":Array, 
  "City":String, 
  "State":String, 
  "Country":String,
  "College Type":String, 
  "Average Fees":Number
})

module.exports = mongoose.model('Colleges', colleges)