package com.example.demo.student;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.time.Month;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.HttpClientErrorException.BadRequest;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {
	
	@Mock
	private StudentRepository studentRepository;
	private StudentService studentService;
	
	@BeforeEach
	void setUp() {
		studentService = new StudentService(studentRepository);
	}

	@Test
	void itShouldGetStudents() {
		//when
		studentService.getStudents();
		
		//then
		//-- verify if studentRepository.findAll() is called into studentService
		verify(studentRepository).findAll();
	}

	@Test
	void itShouldAddNewStudent() {
		//given
		Student student = new Student("Jamila", "jamila@gmail.com", LocalDate.of(2002, Month.MARCH, 16));

		//when
		studentService.addNewStudent(student);
		
		//then
		ArgumentCaptor<Student> studentArgumentCaptor = ArgumentCaptor.forClass(Student.class);
		
		verify(studentRepository).save(studentArgumentCaptor.capture());
		
		Student capturedStudent = studentArgumentCaptor.getValue();
		
		//-- check if student added is the same as student inserted
		assertThat(capturedStudent).isEqualTo(student);
	}
	
	@Test
	void itShouldNotAddNewStudentWhenEmailIsTaken() {
		//given
		Student student = new Student("Jamila", "jamila@gmail.com", LocalDate.of(2002, Month.MARCH, 16));
		
		//when
		when(studentRepository.findStudentByEmail(student.getEmail())).thenReturn(Optional.of(student));

		//then
		assertThatThrownBy(() -> studentService.addNewStudent(student))
			.isInstanceOf(IllegalStateException.class)
			.hasMessageContaining("email: " + student.getEmail() + " taken");
		}

	@Test
	void itShouldDeleteStudent() {
		//given
		Student student = new Student(1L,"Jamila", "jamila@gmail.com", LocalDate.of(2002, Month.MARCH, 16));

		//when
		when(studentRepository.existsById(student.getId())).thenReturn(true);

		studentService.deleteStudent(student.getId());
		
		//then
		verify(studentRepository).deleteById(student.getId());
	}

}
