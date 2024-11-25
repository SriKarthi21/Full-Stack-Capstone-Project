package com.capstoneProject.services;

import com.capstoneProject.domain.User;
import com.capstoneProject.exception.EmailAlreadyExistsException;
import com.capstoneProject.repository.signUpLoginRepository;

import com.capstoneProject.utils.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class signUpLoginServiceImpl implements ISignUpLoginService {

    @Autowired
    private signUpLoginRepository signUpLoginRepository;

	@Value("${spring.mail.username}")
	private String sender;
	
	@Autowired
	private JavaMailSender javaMailSender;
    

    @Override
    public User save(User user,MultipartFile userImage) throws EmailAlreadyExistsException, IOException {
        User newUser;
        if (signUpLoginRepository.existsByUserEmailID(user.getUserEmailID())) {
            throw new EmailAlreadyExistsException();
        }
            newUser = User.builder()
                    .userName(user.getUserName())
                    .userEmailID(user.getUserEmailID())
                    .userPassword(user.getUserPassword())
                    .imageData(ImageUtils.compressImage(userImage.getBytes()))
                    .build();
        User userData = signUpLoginRepository.save(newUser);

        return userData;
    }


    @Override
    public User findByUserEmailAndPassword(String userEmail, String userPassword) {
        return signUpLoginRepository.findByUserEmailIDAndUserPassword(userEmail,userPassword);
    }

    @Override
    public byte[] findImage(String userEmail) {
        User user=signUpLoginRepository.findByUserEmailID(userEmail);
    if(user!=null){
        byte[] imageData=ImageUtils.decompressImage(user.getImageData());
        return imageData;
    }else{
        return null;
    }
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
			mailMessage.setCc("srikarthikeyan212001@gmail.com");
			javaMailSender.send(mailMessage);
			return "Mail Sent Successfully";

		} catch (Exception e) {
			System.out.println("error:"+e.getMessage());
			return "Error in sending an Email";
		}
//    	return null;
    }
}
