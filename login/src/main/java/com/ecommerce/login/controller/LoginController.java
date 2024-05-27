package com.ecommerce.login.controller;




// @RestController
// @CrossOrigin
// @RequestMapping("api/v1/employee")
// public class LoginController {


//     @Autowired
//     private UserService userService;
    
//     @GetMapping(path="/")
//     public String home(Principal principal) {
//     	return "Hello "+principal.getName();
//     }


//     @PostMapping(path = "/save")
//     public String saveUser(@RequestBody UserDTO userDTO)
//     {

//         String id = userService.addUser(userDTO);
//         return id;
//     }

//     @PostMapping(path = "/login")
//     public ResponseEntity<?> loginEmployee(@RequestBody SignupDto loginDTO)
//     {
    	
//     	LoginMesage loginResponse = userService.loginUser(loginDTO);
//         return ResponseEntity.ok(loginResponse);
//     }
//     @GetMapping(path = "/userinfo")
//     public ResponseEntity<?> userInfo() {
//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         if (authentication instanceof JwtAuthenticationToken) {
//             JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) authentication;
//             return ResponseEntity.ok(jwtAuthenticationToken.getTokenAttributes());
//         }
//         return ResponseEntity.badRequest().body("User information not found");
//     }
// }

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.login.config.UserAuthenticationProvider;
import com.ecommerce.login.dto.CredentialsDto;
import com.ecommerce.login.dto.SignUpDto;
import com.ecommerce.login.dto.UserDTO;
import com.ecommerce.login.service.UserService;

import java.net.URI;

@RequiredArgsConstructor
@RestController
public class LoginController {

    private final UserService userService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody @Valid CredentialsDto credentialsDto) {
        UserDTO userDto = userService.login(credentialsDto);
        userDto.setToken(userAuthenticationProvider.createToken(userDto.getEmail()));
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody @Valid SignUpDto user) {
        UserDTO createdUser = userService.register(user);
        createdUser.setToken(userAuthenticationProvider.createToken(user.getEmail()));
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
    }

}