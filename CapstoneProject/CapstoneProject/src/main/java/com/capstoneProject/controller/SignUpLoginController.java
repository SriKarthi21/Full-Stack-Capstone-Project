package com.capstoneProject.controller;

import com.capstoneProject.domain.User;
import com.capstoneProject.exception.EmailAlreadyExistsException;
import com.capstoneProject.services.ISignUpLoginService;
import com.capstoneProject.services.SecurityTokenGenerator;

import jakarta.validation.Valid;

import java.util.Map;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class SignUpLoginController {

	public SignUpLoginController() {
		System.out.println("In SignUp Login Controller -> no-arg constructor ");
	}

	@Autowired
	private ISignUpLoginService iSignUpLoginService;
	private ResponseEntity responseEntity;
	@Autowired
	private SecurityTokenGenerator securityTokenGenerator;

	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid	@RequestBody User user) throws EmailAlreadyExistsException {
		//responseEntity = new ResponseEntity(iSignUpLoginService.save(user), HttpStatus.CREATED);
		try {
		//iSignUpLoginService.sendSimpleMail(user);
			System.out.println("Email response is:"+iSignUpLoginService.sendSimpleMail(user));
		responseEntity=new ResponseEntity(iSignUpLoginService.save(user),HttpStatus.CREATED);
		}catch (EmailAlreadyExistsException e) {
			// TODO: handle exception
			throw new EmailAlreadyExistsException();
		}
		catch (Exception e) {
			// TODO: handle exception
			responseEntity=new ResponseEntity(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return responseEntity;
	}

	@PostMapping("/login-check")
	public ResponseEntity<?> login(@RequestBody User user) {
		User result = null;
		user = iSignUpLoginService.findByUserEmailAndPassword(user.getUserEmailID(), user.getUserPassword());
		if (user != null) {
			Map<String, String> map = securityTokenGenerator.generateToken(user);
			String token = map.get("token");
			System.out.println("Token is:" + token);
			responseEntity = new ResponseEntity(securityTokenGenerator.generateToken(user), HttpStatus.OK);
		} else {
			responseEntity = new ResponseEntity("Email and Password is null", HttpStatus.NO_CONTENT);
		}
		return responseEntity;
	}
}
