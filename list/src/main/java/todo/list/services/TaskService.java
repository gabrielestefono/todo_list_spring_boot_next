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

	private List<Task> findWhereDadIsId(Long id) {
		return this.taskRepository.findByElementoPai(id);
	}

	private Task findById(Long id) {
		return this.taskRepository.findById(id).orElseThrow(() -> new BadRequestException("A tarefa não existe!"));
	}

	private void deleteCascade(Task task){
		if(task.getTemFilhos()){
			List<Task> tasks = this.findWhereDadIsId(task.getId());
			for (Task taskItem : tasks) {
				this.deleteCascade(taskItem);
			}
			if(task.getDescription() != null){
				Description description = task.getDescription();
				task.setDescription(null);
				this.taskRepository.save(task);
				this.descriptionRepository.delete(description);
			}
			this.taskRepository.delete(task);
		}else{
			if(task.getDescription() != null){
				Description description = task.getDescription();
				task.setDescription(null);
				this.taskRepository.save(task);
				this.descriptionRepository.delete(description);
			}
			this.taskRepository.delete(task);
		}
	}

	private void markAllChildAsMade(Task task){
		if(task.getTemFilhos()){
			List<Task> tasksFilhas = this.findWhereDadIsId(task.getId());
			for (Task taskFilha : tasksFilhas) {
				if(taskFilha.getTemFilhos()){
					this.markAllChildAsMade(taskFilha);
				}
				taskFilha.setConcluida(true);
				this.taskRepository.save(taskFilha);
			}
		}else{
			task.setConcluida(true);
			this.taskRepository.save(task);
		}
		task.setConcluida(true);
		this.taskRepository.save(task);
	}

	private void markAllChildAsUnmade(Task task){
		if(task.getTemFilhos()){
			List<Task> tasksFilhas = this.findWhereDadIsId(task.getId());
			for (Task taskFilha : tasksFilhas) {
				if(taskFilha.getTemFilhos()){
					this.markAllChildAsUnmade(taskFilha);
				}
				taskFilha.setConcluida(false);
				this.taskRepository.save(taskFilha);
			}
		}else{
			task.setConcluida(false);
			this.taskRepository.save(task);
		}
		task.setConcluida(false);
		this.taskRepository.save(task);
	}

	private void markAllParentAsMade(Task task){
		if(!Objects.equals(task.getElementoPai(), Long.valueOf(0))){
			List<Task> tasksIrmas = this.findWhereDadIsId(task.getElementoPai());
			boolean irmasConcluidas = true;
			for(Task taskIrma : tasksIrmas) {
				if(!taskIrma.getConcluida()){
					irmasConcluidas = false;
				}
			}
			if(irmasConcluidas){
				Task taskPai = this.findById(task.getElementoPai());
				taskPai.setConcluida(true);
				this.taskRepository.save(taskPai);
				this.markAllParentAsMade(taskPai);
			}
		}
	}

	private void markAllParentAsUnmade(Task task){
		if(!Objects.equals(task.getElementoPai(), Long.valueOf(0))){
			Task taskPai = this.findById(task.getElementoPai());
			taskPai.setConcluida(false);
			this.taskRepository.save(taskPai);
			this.markAllParentAsUnmade(taskPai);
		}
	}

	public List<Task> findAll() {
		return this.findWhereDadIsId(Long.valueOf(0));
	}

	public Task create(Task task) {
		if(!Objects.equals(task.getElementoPai(), Long.valueOf(0))){
			Task elementoPai = this.findById(task.getElementoPai());
			elementoPai.setTemFilhos(true);
			elementoPai.setFilhosFeitos(false);
			this.taskRepository.save(elementoPai);
		}
		return this.taskRepository.save(task);
	}

	public FindSpecificTaskDTO findSpecificTask(Long id){
		Task taskAtual = this.findById(id);
		List<Task> tarefasFilhas = this.findWhereDadIsId(taskAtual.getId());
		return new FindSpecificTaskDTO(taskAtual, tarefasFilhas);
	}

	public Task changeName(Long id, ChangeNameRequestDto taskNome) {
		Task taskFound = this.findById(id);
		taskFound.setNome(taskNome.getNome());
		return this.taskRepository.save(taskFound);
	}

	public void deleteAll(Long id) {
		Task taskFound = this.findById(id);
		this.deleteCascade(taskFound);
	}

	/**
	 * @param id
	 * Descrição: Deleta somente a tarefa que quer deletar
	 * 1 - Busca a tarefa por ID
	 * 2 - Pega todas as tarefas que são filha da tarefa encontrada
	 * 3 - Caso exista, seta o elemento pai das tarefas filhas como o elemento pai da tarefa encontrada
	 * 3 - Se a tarefa não tiver filhos
	 * 4 - Verifica se o elemento pai tem mais filhos
	 * 5 - Caso não, marca que não tem
	 */
	public void deleteOne(Long id){
		Task taskFound = this.findById(id);
		List<Task> listaTasks = this.findWhereDadIsId(taskFound.getId());
		for (Task task : listaTasks) {
			task.setElementoPai(taskFound.getElementoPai());
			this.taskRepository.save(task);
		}
		if(!taskFound.getTemFilhos()){
			List<Task> tasks = this.findWhereDadIsId(taskFound.getElementoPai());
			if(tasks.size() == 1 && taskFound.getElementoPai() != 0){
				Task elementoPai = this.findById(taskFound.getElementoPai());
				elementoPai.setTemFilhos(false);
				this.taskRepository.save(elementoPai);
			}
		}
		if(taskFound.getDescription() != null){
			Description description = taskFound.getDescription();
			taskFound.setDescription(null);
			this.taskRepository.save(taskFound);
			this.descriptionRepository.delete(description);
		}
		this.taskRepository.delete(taskFound);
	}

	public Task maskAsMade(Long id){
		Task task = this.findById(id);
		this.markAllChildAsMade(task);
		this.markAllParentAsMade(task);
		return task;
	}

	public Task maskAsUnmade(Long id){
		Task task = this.findById(id);
		this.markAllChildAsUnmade(task);
		this.markAllParentAsUnmade(task);
		return task;
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
