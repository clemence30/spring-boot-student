import axios from "axios";
import React, { useState } from "react";
import { EditStudentForm } from "./StudentForm";
import { STUDENT_API_BASE_URL } from "./StudentUtils";

export const Student = ({student, fetchStudentList}) => {

    const [isEditable, setIsEditable] = useState(false);

    const handleDeleteStudent = (event, id) => {
        event.preventDefault()
        axios.delete(STUDENT_API_BASE_URL + "/" + id)
          .then(fetchStudentList)
          .catch(error => console.log(error))
      }

    return (
      <tr>
        <td>{student.name}</td>
        <td>{student.email}</td>
        <td>{student.age}</td>
        <td>{student.dob}</td>
        <td>
            <button className="btn me-2 btn-warning" onClick={() => {setIsEditable(!isEditable)}}>Edit</button>
            <button className="btn btn-danger" onClick={(event) => handleDeleteStudent(event, student.id)}>Delete</button>
            {isEditable && 
                <EditStudentForm student={student} fetchStudentList={fetchStudentList} setIsEditable={setIsEditable} />
            }
        </td>
      </tr>

      
    )
}
