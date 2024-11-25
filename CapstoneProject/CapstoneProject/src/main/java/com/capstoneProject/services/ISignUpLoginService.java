package com.capstoneProject.services;

import java.util.List;

import com.capstoneProject.domain.User;
import org.springframework.web.multipart.MultipartFile;

public interface ISignUpLoginService {
    User save(User user, MultipartFile userImage) throws Exception;
    public User findByUserEmailAndPassword(String userEmail, String userPassword);
    public byte[] findImage(String userEmail);
    List<User> getAllUser();
    boolean deleteUser(int userId);
    public String sendSimpleMail(User user);
}
