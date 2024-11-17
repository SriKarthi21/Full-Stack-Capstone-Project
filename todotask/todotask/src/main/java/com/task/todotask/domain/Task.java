package com.task.todotask.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Task {
	@Transient
	public static final String SEQUENCE_NAME = "users_sequence";

	@Id
	private int taskId;
	private String taskName;
	private String description;
	private String emailID;
	private LocalDate startDate;
	private LocalDate endDate;
	
	private String priority;
	private boolean isDeleted;
	private LocalDate deletedAt;
	
	public Task() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getTaskId() {
		return taskId;
	}
	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getEmailID() {
		return emailID;
	}
	public void setEmailID(String emailID) {
		this.emailID = emailID;
	}

	
	

	public LocalDate getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}
	public LocalDate getEndDate() {
		return endDate;
	}
	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}
	public String getPriority() {
		return priority;
	}
	public void setPriority(String priority) {
		this.priority = priority;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean deleted) {
		isDeleted = deleted;
	}

	public LocalDate getDeletedAt() {
		return deletedAt;
	}

	public void setDeletedAt(LocalDate deletedAt) {
//		this.deletedAt = LocalDate.of(9999, 01,01);
		this.deletedAt=deletedAt;
	}

	public Task(int taskId, String taskName, String description, String emailID, LocalDate startDate, LocalDate endDate, String priority, boolean isDeleted, LocalDate deletedAt) {
		this.taskId = taskId;
		this.taskName = taskName;
		this.description = description;
		this.emailID = emailID;
		this.startDate = startDate;
		this.endDate = endDate;
		this.priority = priority;
		this.isDeleted = isDeleted;
		this.deletedAt = deletedAt;
	}



}
