import axios from "axios";
import React, {useState } from "react";
import { STUDENT_API_BASE_URL } from "./StudentUtils";

const StudentForm = ({handleStudent, student, setStudent, isEditable = false}) => {
    return (
      <form className={isEditable ? "my-2 p-2 bg-white border border-1" : "my-4"} onSubmit={handleStudent}>  
        <div className="mb-2">
          <label className="me-2 form-label" htmlFor="inputName">Name:</label>
          <input type="text" value={student.name} name="name" id="inputName" onChange={(event) => setStudent({...student, name : event.target.value })} />
        </div>
        <div className="mb-2">
          <label className="me-2 form-label" htmlFor="inputEmail">Email:</label>
          <input type="text" value={student.email} name="email" id="inputEmail" onChange={(event) => setStudent({...student, email : event.target.value })} />
        </div>
        {!isEditable && 
            <div className="mb-2">
                <label className="me-2 form-label" htmlFor="inputDob">Dob:</label>
                <input type="date" value={student.dob} name="dob" id="inputDob" onChange={(event) => setStudent({...student, dob : event.target.value })} />
            </div>
        }
        <button type="submit" className="btn btn-success">{isEditable ? "Confirm" : "Add student"}</button>
        </form>
    )
}

export const AddStudentForm = ({fetchStudentList}) => {

    const [student, setStudent] = useState({name : '', dob : '', email : ''});

    const handleAddStudent = (event) => {
        event.preventDefault()
        console.log(JSON.stringify(student))
        axios.post(STUDENT_API_BASE_URL, student)
          .then(fetchStudentList)
          .then(setStudent({name : '', dob : '', email : ''}))      
          .catch(error => console.log(error))
      }

    return (
        <StudentForm handleStudent={handleAddStudent} student={student} setStudent={setStudent} />
    )
}

export const EditStudentForm = ({fetchStudentList, setIsEditable, setErrorMessage, student}) => {

    const [studentEditable, setStudentEditable] = useState(student);

    const handleEditStudent = (event) => {
        event.preventDefault()
        console.log(JSON.stringify(studentEditable))
        axios.put(STUDENT_API_BASE_URL + "/" + studentEditable.id + "?name=" + studentEditable.name + "&email=" + studentEditable.email)
          .then(fetchStudentList)
          .then(() => {setIsEditable(false); setStudentEditable({name : '', dob : '', email : ''})})      
          .catch(error => console.log(error))
      }

    return (
        <StudentForm handleStudent={handleEditStudent} student={studentEditable} 
        setStudent={setStudentEditable} isEditable={true} />
    )
}
