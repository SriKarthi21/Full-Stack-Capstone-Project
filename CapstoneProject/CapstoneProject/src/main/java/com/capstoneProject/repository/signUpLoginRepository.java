package com.capstoneProject.repository;

import org.springframework.data.repository.CrudRepository;

import com.capstoneProject.domain.User;

import java.util.List;

public interface signUpLoginRepository extends CrudRepository<User, Integer> {

    User findByUserEmailIDAndUserPassword(String userEmail, String userPassword);
    String findByUserEmailID(String userEmailID);
    boolean existsByUserEmailID(String email);

}
