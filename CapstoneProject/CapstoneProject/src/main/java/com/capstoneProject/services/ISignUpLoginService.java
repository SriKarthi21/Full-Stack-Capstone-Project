package com.capstoneProject.services;

import java.util.List;

import com.capstoneProject.domain.User;

public interface ISignUpLoginService {
    User save(User user) throws Exception;
    User findByUserEmailAndPassword(String userEmail,String userPassword);
    List<User> getAllUser();
    boolean deleteUser(int userId);
    public String sendSimpleMail(User user);
}
