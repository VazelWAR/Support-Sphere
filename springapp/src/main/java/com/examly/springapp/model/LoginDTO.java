package com.examly.springapp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// @Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {

    String token;
    String username;
    String email;
    String password;
    String userRole;
    Long userId;
    
}
