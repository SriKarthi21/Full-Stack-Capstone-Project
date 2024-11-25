package com.capstoneProject.controller;

import com.capstoneProject.domain.User;
import com.capstoneProject.exception.EmailAlreadyExistsException;
import com.capstoneProject.services.ISignUpLoginService;
import com.capstoneProject.services.SecurityTokenGenerator;

import jakarta.validation.Valid;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "*")
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
	public ResponseEntity<?> register(@Valid	@ModelAttribute User user, @RequestParam("image")MultipartFile userImage) throws EmailAlreadyExistsException {
		//responseEntity = new ResponseEntity(iSignUpLoginService.save(user), HttpStatus.CREATED);
		try {
		//iSignUpLoginService.sendSimpleMail(user);
			System.out.println("Email response is:"+iSignUpLoginService.sendSimpleMail(user));
		responseEntity=new ResponseEntity(iSignUpLoginService.save(user,userImage ),HttpStatus.CREATED);
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
			Map<String, String> map=securityTokenGenerator.generateToken(user);
			String token=map.get("token");
			System.out.println("Token is:"+token);
			responseEntity = new ResponseEntity(securityTokenGenerator.generateToken(user), HttpStatus.OK);
		}
		return responseEntity;
	}

	@GetMapping("/getImage/{userEmail}")
	public ResponseEntity<?> login(@PathVariable String userEmail) {
		User result = null;
		byte[] image=iSignUpLoginService.findImage(userEmail);
		System.out.println("ImageDB"+image);
		if (image != null) {
			return ResponseEntity.status(HttpStatus.OK)
					.contentType(MediaType.valueOf("image/png"))
					.body(image);
		}else {
			responseEntity = new ResponseEntity("User Image is null", HttpStatus.NO_CONTENT);
		}
		return responseEntity;
	}
}
