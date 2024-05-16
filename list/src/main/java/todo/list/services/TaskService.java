package todo.list.services;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import todo.list.dto.ChangeNameRequestDto;
import todo.list.dto.FindSpecificTaskDTO;
import todo.list.entities.Description;
import todo.list.entities.Task;
import todo.list.exceptions.errors.BadRequestException;
import todo.list.repositories.DescriptionRepository;
import todo.list.repositories.TaskRepository;

@Service
public class TaskService {
	private final TaskRepository taskRepository;
	private final DescriptionRepository descriptionRepository;

	public TaskService(TaskRepository taskRepository, DescriptionRepository descriptionRepository) {
		this.taskRepository = taskRepository;
		this.descriptionRepository = descriptionRepository;
	}

	private List<Task> findWhereId(Long id) {
		return this.taskRepository.findByElementoPai(id);
	}

	private Task findById(Long id) {
		return this.taskRepository.findById(id).orElseThrow(() -> new BadRequestException("A tarefa não existe!"));
	}

	private void deleteCascade(Task task){
		if(task.getTemFilhos()){
			List<Task> tasks = this.findWhereId(task.getId());
			for (Task taskItem : tasks) {
				this.deleteCascade(taskItem);
			}
			this.taskRepository.delete(task);
		}else{
			this.taskRepository.delete(task);
		}
	}

	public List<Task> findAll() {
		return this.findWhereId(Long.valueOf(0));
	}

	public Task create(Task task) {
		if(!Objects.equals(task.getElementoPai(), Long.valueOf(0))){
			Task elementoPai = this.findById(task.getElementoPai());
			elementoPai.setTemFilhos(true);
			this.taskRepository.save(elementoPai);
		}
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

	public void deleteAll(Long id) {
		Task taskFound = this.findById(id);
		this.deleteCascade(taskFound);
	}

	public void deleteOne(Long id){
		Task taskFound = this.findById(id);
		List<Task> listaTasks = this.findWhereId(taskFound.getId());
		for (Task task : listaTasks) {
			task.setElementoPai(Long.valueOf(0));
			this.taskRepository.save(task);
		}
		this.taskRepository.delete(taskFound);
	}

	public Task addDescription(Long id, Description description) {
		Task taskFound = this.findById(id);
		if(taskFound.getDescription() == null){
			Description savedDescription = this.descriptionRepository.save(description);
			taskFound.setDescription(savedDescription);
		}else{
			description.setId(taskFound.getDescription().getId());
			Description updatedDescription = this.descriptionRepository.save(description);
			taskFound.setDescription(updatedDescription);
		}
		return this.taskRepository.save(taskFound);
	}
}
