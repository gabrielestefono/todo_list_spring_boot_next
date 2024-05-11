package todo.list.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import todo.list.entities.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
