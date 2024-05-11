package todo.list.exceptions.messages;

import java.io.Serializable;
import java.util.Date;

public class CustomMessage implements Serializable{
	private static final long serialVersionUID = 1L;

	private Date timestamp;
	
	private String message;

	public CustomMessage(Date timestamp, String message) {
		this.timestamp = timestamp;
		this.message = message;
	}

	public static Long getSerialversionuid() {
		return serialVersionUID;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
