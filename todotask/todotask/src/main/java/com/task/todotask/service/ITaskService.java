package com.task.todotask.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;


import com.task.todotask.domain.Task;



public interface ITaskService {

	public Task addTask(Task task);

	public boolean deleteTask(int taskId);

	public List<Task> getAllTask();

	public void findTasksDueTomorrow();

	public String sendSimpleMail(Task task);

	public List<Task> getTaskByEmailID(String emailID);

	public Task updateTask(Task task, int taskId);

	public Optional<Task> findById(Integer taskId);

	public Task softDeleteTask(Integer taskId);

	public Task restoreTask(Integer taskId);

	public List<Task> getAllDeletedTask(String emailID);
}
