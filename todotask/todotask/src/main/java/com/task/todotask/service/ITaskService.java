package com.task.todotask.service;

import java.util.Date;
import java.util.List;


import com.task.todotask.domain.Task;



public interface ITaskService {

	public Task addTask(Task task);

public	boolean deleteTask(int taskId);

	public List<Task> getAllTask();
	
	public void findTasksDueTomorrow();
	
	 public String sendSimpleMail(Task task);
	
}
