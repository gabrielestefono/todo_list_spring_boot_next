package todo.list.entities;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tasks")
public class Task implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String nome;

	@Column(nullable = false)
	private Boolean concluida = false;

	@Column(nullable = false)
	private Long elementoPai = Long.valueOf(0);

	@Column(nullable = false)
	private Boolean temFilhos = false;

	@Column(nullable = false)
	private Date createdAt = new Date();

	@Column
	private Date updatedAt;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "description_id")
	private Description description;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	public Task() {
		// Empty Constructor
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Boolean getConcluida() {
		return concluida;
	}

	public void setConcluida(Boolean concluida) {
		this.concluida = concluida;
	}

	public Long getElementoPai() {
		return elementoPai;
	}

	public void setElementoPai(Long elementoPai) {
		this.elementoPai = elementoPai;
	}

	public Boolean getTemFilhos() {
		return temFilhos;
	}

	public void setTemFilhos(Boolean temFilhos) {
		this.temFilhos = temFilhos;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Description getDescription() {
		return description;
	}

	public void setDescription(Description description) {
		this.description = description;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((nome == null) ? 0 : nome.hashCode());
		result = prime * result + ((concluida == null) ? 0 : concluida.hashCode());
		result = prime * result + ((elementoPai == null) ? 0 : elementoPai.hashCode());
		result = prime * result + ((temFilhos == null) ? 0 : temFilhos.hashCode());
		result = prime * result + ((createdAt == null) ? 0 : createdAt.hashCode());
		result = prime * result + ((updatedAt == null) ? 0 : updatedAt.hashCode());
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((user == null) ? 0 : user.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Task other = (Task) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (nome == null) {
			if (other.nome != null)
				return false;
		} else if (!nome.equals(other.nome))
			return false;
		if (concluida == null) {
			if (other.concluida != null)
				return false;
		} else if (!concluida.equals(other.concluida))
			return false;
		if (elementoPai == null) {
			if (other.elementoPai != null)
				return false;
		} else if (!elementoPai.equals(other.elementoPai))
			return false;
		if (temFilhos == null) {
			if (other.temFilhos != null)
				return false;
		} else if (!temFilhos.equals(other.temFilhos))
			return false;
		if (createdAt == null) {
			if (other.createdAt != null)
				return false;
		} else if (!createdAt.equals(other.createdAt))
			return false;
		if (updatedAt == null) {
			if (other.updatedAt != null)
				return false;
		} else if (!updatedAt.equals(other.updatedAt))
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		return true;
	}
}
