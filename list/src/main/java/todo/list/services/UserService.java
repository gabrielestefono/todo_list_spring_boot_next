package todo.list.services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import todo.list.dto.CreateUserRequest;
import todo.list.entities.User;
import todo.list.repositories.UserRepository;

@Service
public class UserService {
	private final UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public User createNewUser(CreateUserRequest createUserRequest){
		User user = new User();
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		String passwordEncoded = bCryptPasswordEncoder.encode(createUserRequest.senha());
		user.setEmail(createUserRequest.email());
		user.setSenha(passwordEncoded);
		user.setNome(createUserRequest.nome());
		return this.userRepository.save(user);
	}
}
