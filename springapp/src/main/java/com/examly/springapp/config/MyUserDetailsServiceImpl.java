package com.examly.springapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;
 

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class MyUserDetailsServiceImpl implements UserDetailsService {
    UserRepo userRepo;

    private static final Logger logger = LoggerFactory.getLogger(MyUserDetailsServiceImpl.class);
 
    @Autowired
    public MyUserDetailsServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }
 
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email);
        
        if (user == null) {
            logger.warn("User not found for email: {}", email);
            throw new UsernameNotFoundException("User not found from exception");
        }
        return new UserPrinciple(user);
    }

}