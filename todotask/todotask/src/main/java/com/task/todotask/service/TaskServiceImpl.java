package com.task.todotask.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.task.todotask.domain.Task;
import com.task.todotask.repository.TaskRepository;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class TaskServiceImpl implements ITaskService {

	@Autowired
	private TaskRepository taskRepository;

	@Value("${spring.mail.username}")
	private String sender;

	@Autowired
	private JavaMailSender javaMailSender;

	@Override
	public Task addTask(Task task) {
		// TODO Auto-generated method stub
//		task.setDeleted(false);
//		task.setDeletedAt(LocalDate.now());
		return taskRepository.save(task);
	}


	@Override
	public List<Task> getAllTask() {
		// TODO Auto-generated method stub
		return taskRepository.findAll();
	}

	@Override
	@Scheduled(cron = "0 28 12 * * ?")
	public void findTasksDueTomorrow() {
		// TODO Auto-generated method stub
		List<Task> taskList = taskRepository.findAll();
		LocalDate local = LocalDate.now();
		for (Task t : taskList) {
			if (t.getEndDate() != null && t.getEndDate().minusDays(1).equals(local)) {
				sendSimpleMail(t);
			}
		}
	}

	@Override
	public String sendSimpleMail(Task task) {
		// TODO Auto-generated method stub

		try {
			SimpleMailMessage mailMessage = new SimpleMailMessage();
			mailMessage.setFrom(sender);
			mailMessage.setTo(task.getEmailID());
			mailMessage.setText("Task:" + task.getTaskName() + " is going to end tomorrow \n" + task.getEndDate()
					+ "Please complete the task as soon as posible");
			mailMessage.setSubject("Task Completion Remainder email");
			mailMessage.setCc("balajimadhavan95@gmail.com");
			javaMailSender.send(mailMessage);

			return "Mail Sent Successfully";

		} catch (Exception e) {
			System.out.println("error:" + e.getMessage());
			return "Error in sending an Email";
		}
	}

	@Override
	public List<Task> getTaskByEmailID(String emailID) {
		return taskRepository.findByEmailID(emailID);
	}

	@Override
	public Task updateTask(Task task, int taskId) {
		try{
			Task existingTask= taskRepository.findByTaskId(taskId);
			task.setTaskId(existingTask.getTaskId());
			return taskRepository.save(task);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public Optional<Task> findById(Integer taskId) {
		return Optional.ofNullable(taskRepository.findByTaskId(taskId));
	}
	@Scheduled(cron = "0 28 12 * * ?")
	public void findTaskInBinMoreThanSevenDays() {
		// TODO Auto-generated method stub
		List<Task> deletedTaskList = taskRepository.findByIsDeletedTrue();
		LocalDate local = LocalDate.now();
		for (Task deletedTask : deletedTaskList) {
			if (deletedTask.getDeletedAt() != null && deletedTask.getDeletedAt().plusDays(3).equals(local)) {
				deleteTask(deletedTask.getTaskId());
			}
		}
	}
//	permanent delete delete method
	@Override
	public boolean deleteTask(int taskId) {
		boolean flag = false;
		if (taskRepository.findById(taskId).isPresent()) {
			taskRepository.deleteById(taskId);
			flag = true;
		}
		return flag;
	}
//	for softDelete  put method
	@Override
	public Task softDeleteTask(Integer taskId) {
		Task task = taskRepository.findByTaskId(taskId);
			try {
				task.setDeleted(true);
				task.setDeletedAt(LocalDate.from(LocalDateTime.now()));
				return taskRepository.save(task);
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
    }

//for restore  put method
	@Override
	public Task restoreTask(Integer taskId) {
		Task task = taskRepository.findByTaskId(taskId);
		try{
			task.setDeleted(false);
			task.setDeletedAt(null);
			return taskRepository.save(task);

		} catch (Exception e) {
			throw new RuntimeException(e);
		}
    }
	//	for bin to show deleted task getmethod
	@Override
	public List<Task> getAllDeletedTask(@PathVariable String emailID) {
		return taskRepository.findByEmailIDAndIsDeletedTrue(emailID);
	}


}
