package com.example.demo.student;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

	//-- @Query is optional
	//@Query("SELECT s FROM Student s WHERE s.email = ?")
	Optional<Student> findStudentByEmail(String email);
}
