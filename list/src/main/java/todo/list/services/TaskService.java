package todo.list.services;

import java.util.List;

import org.springframework.stereotype.Service;

import todo.list.dto.ChangeNameRequestDto;
import todo.list.dto.FindSpecificTaskDTO;
import todo.list.entities.Task;
import todo.list.exceptions.errors.BadRequestException;
import todo.list.repositories.TaskRepository;

@Service
public class TaskService {

	private TaskRepository taskRepository;

	public TaskService(TaskRepository taskRepository) {
		this.taskRepository = taskRepository;
	}

	private List<Task> findWhereId(Long id) {
		return this.taskRepository.findByElementoPai(id);
	}

	private Task findById(Long id) {
		return this.taskRepository.findById(id).orElseThrow(() -> new BadRequestException("A tarefa não existe!"));
	}

	public List<Task> findAll() {
		return this.findWhereId(Long.valueOf(0));
	}

	public Task create(Task task) {
		return this.taskRepository.save(task);
	}

	public FindSpecificTaskDTO findSpecificTask(Long id){
		Task taskAtual = this.findById(id);
		List<Task> tarefasFilhas = this.findWhereId(taskAtual.getId());
		return new FindSpecificTaskDTO(taskAtual, tarefasFilhas);
	}

	public Task changeName(Long id, ChangeNameRequestDto taskNome) {
		Task taskFound = this.findById(id);
		taskFound.setNome(taskNome.getNome());
		return this.taskRepository.save(taskFound);
	}

	public Task maskAsMade(Long id) {
		Task taskFound = this.findById(id);
		taskFound.setConcluida(!taskFound.getConcluida());
		return this.taskRepository.save(taskFound);
	}

	public void delete(Long id) {
		Task taskFound = this.findById(id);
		this.taskRepository.delete(taskFound);
	}
}
