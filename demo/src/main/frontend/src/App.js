import axios from "axios";
import React, { useEffect, useState } from "react";

export const STUDENT_API_BASE_URL = "http://localhost:8080/api/v1/student";

const StudentComponent = () => {

  const [studentList, setStudentList] = useState([])
  
  const [student, setStudent] = useState({name : '', dob : '', email : ''});

  const fetchStudentList = () => {
    axios.get("http://localhost:8080/api/v1/student")
      .then(res => setStudentList(res.data))
      .catch(error => console.log(error))
  }

  const handleDeleteStudent = (event, id) => {
    event.preventDefault()
    axios.delete("http://localhost:8080/api/v1/student/" + id)
      .then(fetchStudentList)
      .catch(error => console.log(error))
  }

  const handleAddStudent = (event) => {
    event.preventDefault()
    console.log(JSON.stringify(student))
    axios.post("http://localhost:8080/api/v1/student", student)
      .then(fetchStudentList)
      .then(setStudent({name : '', dob : '', email : ''}))      
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchStudentList()
  },[])

    return (
      <div className="my-4">
        <h1 className="mt-2">Student Rest</h1>
        <AddStudentForm handleAddStudent={handleAddStudent} student={student} setStudent={setStudent} />
        <ListStudent handleDeleteStudent={handleDeleteStudent} studentList={studentList} />
      </div>
    )
}

const AddStudentForm = ({handleAddStudent, student, setStudent}) => {
  return (
    <form className="my-4" onSubmit={handleAddStudent}>  
      <div className="mb-2">
        <label className="me-2 form-label" htmlFor="inputName">Name:</label>
        <input type="text" value={student.name} name="name" id="inputName" onChange={(event) => setStudent({...student, name : event.target.value })} />
      </div>
      <div className="mb-2">
        <label className="me-2 form-label" htmlFor="inputEmail">Email:</label>
        <input type="text" value={student.email} name="email" id="inputEmail" onChange={(event) => setStudent({...student, email : event.target.value })} />
      </div>
      <div className="mb-2">
        <label className="me-2 form-label" htmlFor="inputDob">Dob:</label>
        <input type="date" value={student.dob} name="dob" id="inputDob" onChange={(event) => setStudent({...student, dob : event.target.value })} />
      </div>
      <button type="submit" className="btn btn-success">Add student</button>
      </form>
  )
}

const Student = ({student, handleDeleteStudent}) => {

  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.email}</td>
      <td>{student.age}</td>
      <td>{student.dob}</td>
      <td>
        <button className="btn btn-danger" onClick={(event) => handleDeleteStudent(event, student.id)}>Delete</button>
      </td>
    </tr>
    
  )
}

const ListStudent = ({handleDeleteStudent, studentList}) => {

  const students = 
      studentList.map( (student, index) =>
        <Student key={index} student={student} handleDeleteStudent={handleDeleteStudent} />)

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Age</th>
          <th scope="col">Dob</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {students}
      </tbody>
    </table>
  )
}

function App() {
  return (
    <div className="App">
      <div className="container">
        <StudentComponent />
      </div>
    </div>
  );
}

export default App;
