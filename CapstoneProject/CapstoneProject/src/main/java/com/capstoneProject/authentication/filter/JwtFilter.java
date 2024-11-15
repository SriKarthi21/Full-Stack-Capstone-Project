package com.capstoneProject.authentication.filter;

import java.io.IOException;

import org.springframework.web.filter.GenericFilterBean;

import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtFilter extends GenericFilterBean{

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
			throws IOException, ServletException {
		HttpServletRequest httpServletRequest=(HttpServletRequest)servletRequest;
        HttpServletResponse httpServletResponse=(HttpServletResponse) servletResponse;
        ServletOutputStream pw=httpServletResponse.getOutputStream();
        pw.println("any message here");  // this dipplay the message on browser
      String header=  httpServletRequest.getHeader("Authorization");
      pw.println(header); // Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJLYXJ0aWsiLCJpc3MiOiJqd3QtYXBwIiwiaWF0IjoxNzI5MDU5MjQ3fQ.ELnMS4W-Pq4GeJX8aMmUhuQ1j7lSOUwZmo58YxMw4lE
      if(header==null || !header.startsWith("Bearer") ){
        httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        pw.println("Missing and invalid token");
        pw.close();
      }
      else{
          // extracting the token form the header
           String jwtToken= header.substring(7);  // Bearer ==> 6+1 since token begin from Bearer
           // token validation
          //parse the payload of the token
            String email=Jwts.parser().setSigningKey("secretkey").parseClaimsJws(jwtToken).getBody().getSubject();
            httpServletRequest.setAttribute("emailID",email);
            // pass the claims in the request
         filterChain.doFilter(servletRequest,servletResponse);  // sending request to more filter , controller
      } 

	}
}