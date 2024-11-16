package com.task.todotask.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.task.todotask.domain.Task;

public interface TaskRepository extends MongoRepository<Task, Integer>{

	List<Task> findByEmailID(String emailID);

	Task findByTaskId(Integer taskId);

	List<Task> findByDeletedAtIsNull();
	List<Task> findByDeletedAtIsNotNull();
//	@Query("{ 'endDate' : { $gt: ?0, $lt: ?1 } }")
//	List<Task> findTasksBetweenEndDate(Date d1,Date d2);

	@Query("{ 'endDate' : { $eq: { $dateAdd: { startDate: ?0, unit: 'day', amount: 1 } } } }")
	List<Task> findTasksDueTomorrow(String currentDate);
}
