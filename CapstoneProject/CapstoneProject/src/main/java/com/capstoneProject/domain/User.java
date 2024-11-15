package com.capstoneProject.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;




@Entity
@Table(name="tbl_users")
public class User {
    @Id
/*userID,
* */
    private int userId;
    @NotNull(message = "User name must not be null") 
    @Size(min = 3,max = 15, message = "User name must be between 3 and 15 only.")
    private String userName;
    @NotBlank(message = "Email Id must not be blank")
    @Email(message = "Email should be valid")
    private String userEmailID;
    private String userPassword;


    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

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

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", userEmailID='" + userEmailID + '\'' +
                ", userPassword='" + userPassword + '\'' +
                '}';
    }




}
