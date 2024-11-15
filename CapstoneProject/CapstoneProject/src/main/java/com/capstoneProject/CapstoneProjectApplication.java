package com.capstoneProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import com.capstoneProject.authentication.filter.JwtFilter;



@SpringBootApplication
public class CapstoneProjectApplication {

	public static void main(String[] args) {

		SpringApplication.run(CapstoneProjectApplication.class, args);
		System.out.println("Capstone Project Application -> main()");
	}

}
