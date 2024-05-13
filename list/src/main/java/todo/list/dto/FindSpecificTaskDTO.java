package todo.list.dto;

import java.util.List;

import todo.list.entities.Task;

public class FindSpecificTaskDTO {
	private Task taskAtual;
	private List<Task> tasksFilhas;
	
	public FindSpecificTaskDTO(Task taskAtual, List<Task> tasksFilhas) {
		this.taskAtual = taskAtual;
		this.tasksFilhas = tasksFilhas;
	}

	public Task getTaskAtual() {
		return taskAtual;
	}

	public void setTaskAtual(Task taskAtual) {
		this.taskAtual = taskAtual;
	}

	public List<Task> getTasksFilhas() {
		return tasksFilhas;
	}

	public void setTasksFilhas(List<Task> tasksFilhas) {
		this.tasksFilhas = tasksFilhas;
	}
}
