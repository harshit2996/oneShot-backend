require('./database')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const college = require('./models/colleges')


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
  console.log(result)
  return result
}

let collegesByState = mainFunction()


app.get('/', (req, res) => {
  college
  .find({
  })
  .then(doc => {
    res.send(doc)
  })
  .catch(err => {
    console.error(err)
    res.send('err')
  })
})

app.get('/collegesByStates', (req, res) => {
  collegesByState.then(resolveData => {
    result = resolveData
    res.send(result)
  })
})

app.post('/', (req, res) => {
  let coll = req.body
  let newCollege = new college({
    "College Name":coll["College Name"], 
    "Genders Accepted":coll["Genders Accepted"],
    "Campus Size":coll["Campus Size"], 
    "Total Student Enrollments": coll["Total Student Enrollments"], 
    "Total Faculty": coll["Total Faculty"], 
    "Established Year":coll["Established Year"], 
    "Rating": coll["Rating"], 
    "University": coll["University"], 
    "Courses":coll["Courses"], 
    "Facilities":coll["Facilities"], 
    "City":coll["City"], 
    "State":coll["State"], 
    "Country":coll["Country"],
    "College Type":coll["College Type"], 
    "Average Fees": coll["Average Fees"]
  })
  newCollege.save()
  .then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.error(err)
  })
  
  
  
  res.send({message:'success'})
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



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

