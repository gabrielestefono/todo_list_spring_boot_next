package todo.list.controllers;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import todo.list.dto.CreateUserRequest;
import todo.list.entities.User;
import todo.list.repositories.UserRepository;



@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

	private final UserRepository userRepository;

	public UserController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@PostMapping( value = "/create", produces = "application/json", consumes = "application/json")
	public User postMethodName(@RequestBody CreateUserRequest createUserRequest) {
		User user = new User();
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		String passwordEncoded = bCryptPasswordEncoder.encode(createUserRequest.senha());
		user.setEmail(createUserRequest.email());
		user.setSenha(createUserRequest.senha());
		user.setNome(passwordEncoded);
		return this.userRepository.save(user);
	}
}
