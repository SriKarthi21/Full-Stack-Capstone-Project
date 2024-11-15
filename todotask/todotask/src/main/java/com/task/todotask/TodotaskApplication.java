package com.task.todotask;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import com.task.todotask.authentication.filter.JwtFilter;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TodotaskApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodotaskApplication.class, args);
	}

	@Bean
	FilterRegistrationBean jwtFilter(){
		System.out.println("In jwt Filter()");
		FilterRegistrationBean filter=new FilterRegistrationBean();
		filter.setFilter(new JwtFilter());
		filter.addUrlPatterns("/api/v1/task/*");
		return filter;
	}
}
