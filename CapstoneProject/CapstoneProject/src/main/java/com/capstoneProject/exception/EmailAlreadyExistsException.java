package com.capstoneProject.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT , reason = "Email Already Exists")
public class EmailAlreadyExistsException extends Exception {

}
