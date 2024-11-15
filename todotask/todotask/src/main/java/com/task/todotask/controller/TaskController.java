package com.task.todotask.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.task.todotask.domain.Task;
import com.task.todotask.service.ITaskService;

import jakarta.servlet.http.HttpServletRequest;



@RestController
@RequestMapping("/api/v1")
public class TaskController {

	@Autowired
	private ITaskService iTaskService;
	private ResponseEntity responseEntity;
	@Autowired
	private HttpServletRequest httpServletRequest;
	@PostMapping("/task/addTask")
	public ResponseEntity<?> addTask(@RequestBody Task task){
		String emailId=(String) httpServletRequest.getAttribute("emailID");
		task.setEmailID(emailId);
		return responseEntity=new ResponseEntity(iTaskService.addTask(task),HttpStatus.CREATED);
	}
	
	@GetMapping("/task/getAllTask")
	public ResponseEntity<?> getAllTask(){
		return responseEntity=new ResponseEntity(iTaskService.getAllTask(),HttpStatus.OK);
	}
	
	@DeleteMapping("/task/delete/{taskId}")
	public ResponseEntity<?> addTask(@PathVariable int taskId){
		return responseEntity=new ResponseEntity(iTaskService.deleteTask(taskId),HttpStatus.OK);
	}
	
	@GetMapping("/task/datesBetween")
	public ResponseEntity<?> getDatesBetween(){
		// responseEntity=new ResponseEntity(iTaskService.getDatesBetween(date1, date2),HttpStatus.OK);

		iTaskService.findTasksDueTomorrow();
		 responseEntity=new ResponseEntity(HttpStatus.OK);
		 return responseEntity;
	}
}
