package com.task.todotask.controller;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import com.task.todotask.domain.SequenceGeneratorService;
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


	private final ITaskService iTaskService;
	private ResponseEntity responseEntity;
	private HttpServletRequest httpServletRequest;

	@Autowired
	private SequenceGeneratorService sequenceGeneratorService;
	@Autowired
	public TaskController(ITaskService iTaskService,HttpServletRequest httpServletRequest,SequenceGeneratorService sequenceGeneratorService) {
		this.iTaskService = iTaskService;
		this.httpServletRequest=httpServletRequest;
		this.sequenceGeneratorService=sequenceGeneratorService;
	}

	@PostMapping("/task/addTask")
	public ResponseEntity<?> addTask(@RequestBody Task task){
		String emailID=(String) httpServletRequest.getAttribute("emailID");
		task.setTaskId(sequenceGeneratorService.generateSequence(Task.SEQUENCE_NAME));
		return responseEntity=new ResponseEntity(iTaskService.addTask(task),HttpStatus.CREATED);
	}
	
	@GetMapping("/task/getAllTask")
	public ResponseEntity<?> getAllTask(){
		return responseEntity=new ResponseEntity(iTaskService.getAllTask(),HttpStatus.OK);
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
		return responseEntity=new ResponseEntity(iTaskService.getTaskByEmailID(emailID),HttpStatus.OK);
	}
	//	Hard/permanent delete
	@DeleteMapping("/task/delete/{taskId}")
	public ResponseEntity<?> addTask(@PathVariable int taskId){
		return responseEntity=new ResponseEntity(iTaskService.deleteTask(taskId),HttpStatus.OK);
	}
//	move to bin
	@PostMapping("task/softDelete/{taskId}")
	public ResponseEntity<?> softDelete(@PathVariable int taskId){
		return responseEntity=new ResponseEntity(iTaskService.softDeleteTask(taskId),HttpStatus.OK);
	}
//	restore
	@GetMapping("task/restore/{taskId}")
	public  ResponseEntity<?> restore(@PathVariable int taskId){
		return responseEntity=new ResponseEntity(iTaskService.restoreTask(taskId),HttpStatus.OK);
	}
//	getDeletedTask
	@GetMapping("task/getAllDeletedTask/{emailID}")
	public ResponseEntity<?> getAllDeletedTask(@PathVariable String emailID){
		return responseEntity=new ResponseEntity(iTaskService.getAllDeletedTask(emailID),HttpStatus.OK);
	}
}
