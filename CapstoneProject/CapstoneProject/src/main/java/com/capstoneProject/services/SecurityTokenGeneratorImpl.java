package com.capstoneProject.services;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;

import com.capstoneProject.domain.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class SecurityTokenGeneratorImpl implements SecurityTokenGenerator {

	


	@Override
	public Map<String, String> generateToken(User user) {
		// TODO Auto-generated method stub
		
		Map<String, String> map=new HashMap<String, String>();
		
		String jwtToken=Jwts.builder().setSubject(user.getUserEmailID()).setIssuer("jwt-app")
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256,"secretkey").compact();
map.put("token", jwtToken);
map.put("message", "token generated.");
		return map;
	}

}
