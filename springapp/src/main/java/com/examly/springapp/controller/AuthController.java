package com.examly.springapp.controller;
 
import java.util.HashMap;
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
 
 
import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.config.MyUserDetailsServiceImpl;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;
 
import jakarta.validation.Valid;
 
@RestController
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtils jwtUtil;
 
    @Autowired
    private UserService userService;
 
    @Autowired
    private MyUserDetailsServiceImpl myUserDetailsServiceImpl;
 
   
 
    @PostMapping("/api/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginDTO) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
            UserDetails userDetails = myUserDetailsServiceImpl.loadUserByUsername(loginDTO.getEmail());
            final String jwt = jwtUtil.generateToken(userDetails);
            User user = userService.findByEmail(loginDTO.getEmail());
   
            HashMap<String, Object> response = new HashMap<>();
            response.put("token", jwt);
            response.put("user", user);
            return new ResponseEntity<>(response, HttpStatus.OK);
   
        } catch (Exception e) {
            HashMap<String, String> error = new HashMap<>();
            error.put("message", "Authentication failed: " + e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
        }
    }
   
    @PostMapping("/api/register")
    public ResponseEntity<?> signup(@Valid @RequestBody User user) {
        return new ResponseEntity<>(userService.createUser(user), HttpStatus.CREATED);
    }
 
}