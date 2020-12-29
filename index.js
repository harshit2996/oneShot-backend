require('./database')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const college = require('./models/colleges')
const student = require('./models/students')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())

const findStates = () =>{
  return college.distinct('State').exec()
}

const returnSet = async(state) => {
  let newset =   await(college.distinct("_id",{"State": state}))
  let l = newset.length
  return l
}  

const mainFunction = async() => {
  let result = []
  let States =  await findStates()
  for(state of States){
    result.push({name:state,value: await returnSet(state)})
  }
  // collegesByState =  result
  // console.log(result)
  return result
}

let collegesByState = mainFunction()

app.get('/collegesByStates', (req, res) => {
  collegesByState.then(doc => {
    res.send(doc)
  })
})

app.post('/collegesByStates', (req, res) => {
  let StateName = (Object.keys(req.body)[0])
  college.find({"State": StateName})
  .then(doc=>{
    res.send(doc)
  })
  .catch(err=>{
    console.log(err)
  })
})

app.post('/college', (req, res)=>{
  college.insertMany(req.body)
  .then(res.send({message:'success'}))
  .catch(err=>res.send({message:err}))
})

app.post('/student', (req, res)=>{
  student.insertMany(req.body)
  .then(res.send({message:'success'}))
  .catch(err=>res.send({message:err}))
})

app.post('/getCollegeDetails',(req,res)=>{
  collegeKey = (Object.keys(req.body)[0])
  console.log(collegeKey)
  college.find({
     "College Name":collegeKey   
  })
  .then(doc=>{
    console.log(doc)
    res.send(doc)
  })
  .catch(err=>{
    console.log(err)
    res.send(err)
  })

})

app.get('/getAllStudents', (req, res)=>{
  student.find({}).then(doc=>{
    res.send(doc)
  })
  .catch(err=>{
    res.send(err)
  })
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

