package todo.list.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import todo.list.dto.CreateUserRequest;
import todo.list.entities.User;
import todo.list.services.UserService;



@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping( value = "/create", produces = "application/json", consumes = "application/json")
	public User postMethodName(@RequestBody CreateUserRequest createUserRequest) {
		return this.userService.createNewUser(createUserRequest);
	}
}
