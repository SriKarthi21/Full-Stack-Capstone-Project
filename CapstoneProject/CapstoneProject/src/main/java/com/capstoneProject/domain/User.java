package com.capstoneProject.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.util.Arrays;


@Entity
@Table(name="tbl_users")
@Builder
public class User {
    @Id

    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userId;
//    @NotNull(message = "User name must not be null")
//    @Size(min = 3,max = 15, message = "User name must be between 3 and 15 only.")
    private String userName;
//    @NotBlank(message = "Email Id must not be blank")
//    @Email(message = "Email should be valid")
    private String userEmailID;
    private String userPassword;
    @Lob
    private byte[] imageData;

    public User() {
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) { this.userId = userId;   }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmailID() {
        return userEmailID;
    }

    public void setUserEmailID(String userEmailID) {
        this.userEmailID = userEmailID;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public byte[] getImageData() {return imageData;}

    public void setImageData(byte[] imageData) {this.imageData = imageData;}

    public User(int userId, String userName, String userEmailID, String userPassword, byte[] imageData) {
        this.userId = userId;
        this.userName = userName;
        this.userEmailID = userEmailID;
        this.userPassword = userPassword;
        this.imageData = imageData;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", userEmailID='" + userEmailID + '\'' +
                ", userPassword='" + userPassword + '\'' +
                ", imageData=" + Arrays.toString(imageData) +
                '}';
    }
}
