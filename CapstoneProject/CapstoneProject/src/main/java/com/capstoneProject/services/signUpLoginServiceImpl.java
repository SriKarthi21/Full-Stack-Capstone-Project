package com.capstoneProject.services;

import com.capstoneProject.domain.User;
import com.capstoneProject.exception.EmailAlreadyExistsException;
import com.capstoneProject.repository.signUpLoginRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class signUpLoginServiceImpl implements ISignUpLoginService {

    @Autowired
    private signUpLoginRepository signUpLoginRepository;

	@Value("${spring.mail.username}")
	private String sender;
	
	@Autowired
	private JavaMailSender javaMailSender;
    
    public signUpLoginServiceImpl(){
        System.out.println("In signUpLoginServiceImpl class -> no -args constructors");
    }
    @Override
    public User save(User user)  throws EmailAlreadyExistsException{
    	if(signUpLoginRepository.existsByUserEmailID(user.getUserEmailID()))
         {
    		throw new EmailAlreadyExistsException();
         }
    	else
    	{
    		return	signUpLoginRepository.save(user);
    	}
    	
    }

    @Override
    public User findByUserEmailAndPassword(String userEmail, String userPassword) {
        return signUpLoginRepository.findByUserEmailIDAndUserPassword(userEmail,userPassword);
    }

    @Override
    public List<User> getAllUser() {
        return (List<User>) signUpLoginRepository.findAll();
    }

    @Override
    public boolean deleteUser(int userId) {
        boolean flag=false;
        if(signUpLoginRepository.findById(userId).isPresent())
        {
            signUpLoginRepository.deleteById(userId);
            flag=true;
        }
        else
        {
            flag= false;
        }
        return flag;
    }
    @Override
    public String sendSimpleMail(User user) {
    	// TODO Auto-generated method stub
    	try {
			SimpleMailMessage mailMessage=new SimpleMailMessage();
			mailMessage.setFrom(sender);
			mailMessage.setTo(user.getUserEmailID());
			mailMessage.setText("Your EmailId has been Registered \n Registered Email Address: "+user.getUserEmailID());
			mailMessage.setSubject("Registered User-Mail Confirmation");
			mailMessage.setCc("balajimadhavan95@gmail.com");
			javaMailSender.send(mailMessage);
			return "Mail Sent Successfully";

		} catch (Exception e) {
			System.out.println("error:"+e.getMessage());
			return "Error in sending an Email";
		}
//    	return null;
    }
}
