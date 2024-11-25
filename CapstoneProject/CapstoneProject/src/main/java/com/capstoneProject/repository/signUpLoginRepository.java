package com.capstoneProject.repository;

import org.springframework.data.repository.CrudRepository;

import com.capstoneProject.domain.User;

import java.util.Optional;

public interface signUpLoginRepository extends CrudRepository<User, Integer> {

    User findByUserEmailIDAndUserPassword(String userEmail, String userPassword);
    User findByUserEmailID(String userEmailID);
    boolean existsByUserEmailID(String email);

//    Optional<User> findByimageData(String fileName);

}
