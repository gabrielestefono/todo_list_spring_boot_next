package todo.list.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import todo.list.entities.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
