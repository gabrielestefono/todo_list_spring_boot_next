package todo.list.exceptions.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException{
	private static final long serialVersionUID = 1L;

	public BadRequestException(String string){
		super(string);
	}
}