package todo.controllers;

import org.springframework.web.bind.annotation.RestController;

import todo.interfaces.Task;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("tasks")
public class Tasks {
	public final List<Task> taskList = new ArrayList<>();

	@GetMapping("")
	public List<Task> index() {
		return this.taskList;
	}

	@PostMapping("")
	public Task store(@RequestBody Task task) {
		this.taskList.add(task);
		return task;
	}

	@GetMapping("/{id}")
	public Task show(@PathVariable Integer id) {
		return this.taskList.get(id);
	}

	@PutMapping("/{id}")
	public Task update(@PathVariable Integer id, @RequestBody Task task) {
		Task novaTask = this.taskList.get(id);
		novaTask.concluida = task.concluida;
		novaTask.createdAt = task.createdAt;
		novaTask.descriptionId = task.descriptionId;
		novaTask.elementoPai = task.elementoPai;
		novaTask.nome = task.nome;
		novaTask.updatedAt = task.updatedAt;
		novaTask.userId = task.userId;
		return novaTask;
	}

	@PatchMapping("/{id}")
	public Task markAsConcluded(@PathVariable Integer id) {
		Task novaTask = this.taskList.get(id);
		novaTask.concluida = true;
		return novaTask;
	}

	@DeleteMapping("/{id}")
	public void deleteMethodName(@PathVariable String id) {
		this.taskList.remove(0);
	}
}
