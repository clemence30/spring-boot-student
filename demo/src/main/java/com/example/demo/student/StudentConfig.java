package com.example.demo.student;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StudentConfig {

	@Bean
	CommandLineRunner commandLineRunner(StudentRepository studentRepository) {
		return args -> {
			Student paul = new Student("Paul","paul@gmail.com", LocalDate.of(2000, Month.JANUARY, 5));
			Student sam = new Student("Sam","sam@gmail.com", LocalDate.of(2005, Month.JANUARY, 2));
			
			studentRepository.saveAll(List.of(paul,sam));
		};
	}
}
