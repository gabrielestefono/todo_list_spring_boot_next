package todo.list.services;

import java.util.List;

import org.springframework.stereotype.Service;

import todo.list.dto.ChangeNameRequestDto;
import todo.list.entities.Task;
import todo.list.exceptions.errors.BadRequestException;
import todo.list.repositories.TaskRepository;

@Service
public class TaskService {

	private TaskRepository taskRepository;

	public TaskService(TaskRepository taskRepository) {
		this.taskRepository = taskRepository;
	}

	public List<Task> findAll(){
		return this.taskRepository.findAll();
	}

	public Task create(Task task){
		return this.taskRepository.save(task);
	}

	public Task findById(Long id) {
    return this.taskRepository.findById(id).orElseThrow(() -> new BadRequestException("A tarefa não existe!"));
	}

	public Task changeName(Long id, ChangeNameRequestDto taskName){
		Task taskFound = this.findById(id);
		taskFound.setNome(taskName.getName());
		return this.taskRepository.save(taskFound);
	}

	public Task maskAsMade(Long id){
		Task taskFound = this.findById(id);
		taskFound.setConcluida(true);
		return this.taskRepository.save(taskFound);
	}

	public void delete(Long id){
		Task taskFound = this.findById(id);
		this.taskRepository.delete(taskFound);
	}
}
