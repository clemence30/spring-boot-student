package com.example.demo.student;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.time.Month;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class StudentRepositoryTest {
	
	@Autowired
	private StudentRepository studentRepository;
	
	@AfterEach
	void tearDown() {
		studentRepository.deleteAll();
	}

	@Test
	void itShouldfindStudentByEmailWhenEmailExists() {
		//given
		String email = "jamila@gmail.com";
		Student student = new Student("Jamila", email, LocalDate.of(2002, Month.MARCH, 16));
		studentRepository.save(student);
		
		//when
		Optional<Student> response = studentRepository.findStudentByEmail(email);
		
		//then
		assertThat(response.isPresent());
	}
	
	@Test
	void itShouldNotfindStudentByEmail() {
		//given
		String email = "jamila@gmail.com";
		
		//when
		Optional<Student> response = studentRepository.findStudentByEmail(email);
		
		//then
		assertThat(response.isEmpty());
	}

}
