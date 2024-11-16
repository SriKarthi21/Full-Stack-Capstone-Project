package com.task.todotask.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.task.todotask.domain.Task;
import com.task.todotask.service.ITaskService;

import jakarta.servlet.http.HttpServletRequest;



@RestController
@CrossOrigin(origins = "*")
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
	@GetMapping("/task/getTask/{taskId}")
	public ResponseEntity<?> getTaskById(@PathVariable Integer taskId){
		return responseEntity=new ResponseEntity<>(iTaskService.findById(taskId),HttpStatus.OK);
	}
	@PutMapping("/task/update/{taskId}")
	public ResponseEntity<?> updateTask(@RequestBody Task task,@PathVariable int taskId){
		return responseEntity=new ResponseEntity(iTaskService.updateTask(task,taskId),HttpStatus.OK);
	}
	@GetMapping("/task/email/{emailID}")
	public ResponseEntity<?> getTaskByEmailID(@PathVariable String emailID){
		System.out.println("getBYemail called");
		return responseEntity=new ResponseEntity(iTaskService.getTaskByEmailID(emailID),HttpStatus.OK);
	}
}
