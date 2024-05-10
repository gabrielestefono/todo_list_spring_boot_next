package todo.list;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = { "todo.controllers", "todo" })
public class ListApplication {

	public static void main(String[] args) {
		SpringApplication.run(ListApplication.class, args);
	}
}
