import axios from "axios";
import React, { useEffect, useState } from "react";
import { AddStudentForm } from "./StudentForm";
import { ListStudent } from "./StudentList";
import { STUDENT_API_BASE_URL } from "./StudentUtils";

export const StudentComponent = () => {

    const [studentList, setStudentList] = useState([]);
      
    const fetchStudentList = () => {
      axios.get(STUDENT_API_BASE_URL)
        .then(res => setStudentList(res.data.sort((a, b) => a.id > b.id ? 1 : -1)))
        .catch(error => console.log(error))
    }
  
    useEffect(() => {
      fetchStudentList()
    },[])
  
    return (
        <div className="my-4">
            <h1 className="mt-2">Student Rest</h1>
            <AddStudentForm fetchStudentList={fetchStudentList} />
            <ListStudent fetchStudentList={fetchStudentList} studentList={studentList} />
        </div>
    )
}
