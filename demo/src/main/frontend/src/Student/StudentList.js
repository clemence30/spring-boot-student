import React from "react";
import { Student } from "./Student";

export const ListStudent = ({fetchStudentList, studentList}) => {

    const students = 
        studentList.map( (student, index) =>
          <Student key={index} student={student} fetchStudentList={fetchStudentList} />)
  
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
  