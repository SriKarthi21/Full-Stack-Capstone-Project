package com.capstoneProject.services;

import java.util.Map;

import com.capstoneProject.domain.User;



public interface SecurityTokenGenerator {
	Map<String,String> generateToken(User user);
}
