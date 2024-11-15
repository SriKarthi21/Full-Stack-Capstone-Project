package com.task.todotask.service;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.task.todotask.domain.Task;
import com.task.todotask.repository.TaskRepository;

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
		return taskRepository.save(task);
	}

	@Override
	public boolean deleteTask(int taskId) {
		// TODO Auto-generated method stub
		boolean flag = false;
		if (taskRepository.findById(taskId).isPresent()) {
			taskRepository.deleteById(taskId);
			flag = true;
		}

		return flag;
	}

	@Override
	public List<Task> getAllTask() {
		// TODO Auto-generated method stub
		return taskRepository.findAll();
	}

	@Override
//	@Scheduled(cron = "0 28 12 * * ?")
	@Scheduled()
	public void findTasksDueTomorrow() {
		// TODO Auto-generated method stub

		//keep two variable
		int a,b;
		//add two two variable
		a+b;
		//print the result
		System.out.println(a+b);
		List<Task> taskList = taskRepository.findAll();
		LocalDate local = LocalDate.now();
		for (Task t : taskList) {
			// today is 15th nov and if end is 16th

			// if(sysdate<endDate-1)
			if (t.getEndDate() != null && t.getEndDate().minusDays(1).equals(local)) {
				sendSimpleMail(t);
			}
		}
		// return taks;

	}

	@Override
	public String sendSimpleMail(Task task) {
		// TODO Auto-generated method stub

		try {
			SimpleMailMessage mailMessage = new SimpleMailMessage();
//			for (Task t : ListTask) {
			mailMessage.setFrom(sender);
			mailMessage.setTo(task.getEmailID());
			mailMessage.setText("Task:" + task.getTaskName() + " is going to end tomorrow \n" + task.getEndDate()
					+ "Please complete the task as soon as posible");
			// mailMessage.setText("Please complete the task as soon as posible");
			mailMessage.setSubject("Task Completion Remainder email");
			mailMessage.setCc("balajimadhavan95@gmail.com");
			javaMailSender.send(mailMessage);

//			}
			return "Mail Sent Successfully";

		} catch (Exception e) {
			System.out.println("error:" + e.getMessage());
			return "Error in sending an Email";
		}

		// return null;
	}
}
