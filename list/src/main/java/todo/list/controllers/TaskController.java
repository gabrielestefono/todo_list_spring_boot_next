package todo.list.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import todo.list.dto.ChangeNameRequestDto;
import todo.list.dto.FindSpecificTaskDTO;
import todo.list.entities.Description;
import todo.list.entities.Task;
import todo.list.services.TaskService;



@RestController
@RequestMapping("/task")
@CrossOrigin("*")
public class TaskController {

    private final TaskService taskService;
    
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping(produces = "application/json")
    public List<Task> findAll() {
       return this.taskService.findAll();
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public Task create(@RequestBody Task task) {
        return this.taskService.create(task);
    }
    
    @GetMapping(value = "/{id}", produces = "application/json")
    public FindSpecificTaskDTO findById(@PathVariable Long id) {
        return this.taskService.findSpecificTask(id);
    }

    @PatchMapping(value = "/name/{id}", consumes = "application/json", produces = "application/json")
    public Task changeName(@PathVariable Long id, @RequestBody ChangeNameRequestDto name) {
        return this.taskService.changeName(id, name);
    }
    @PatchMapping(value = "/made/{id}", produces = "application/json")
    public Task maskAsMade(@PathVariable Long id) {
        return this.taskService.maskAsMade(id);
    }

    @PatchMapping(value = "/description/{id}")
    public Task delete(@PathVariable Long id, @RequestBody Description description) {
        return this.taskService.addDescription(id, description);
    }

    @DeleteMapping(value = "/delete-all/{id}")
    public void deleteAll(@PathVariable Long id) {
        this.taskService.deleteAll(id);
    }

    @DeleteMapping(value = "/delete-one/{id}")
    public void deleteOne(@PathVariable Long id) {
        this.taskService.deleteOne(id);
    }
}