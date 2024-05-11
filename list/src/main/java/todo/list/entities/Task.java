package todo.list.entities;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tasks")
public class Task implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(nullable = false)
	private String nome;
	
	@Column(nullable = false)
	private Boolean concluida = false;
	
	@Column(nullable = false)
	private Long elementoPai = Long.valueOf(0);
	
	@Column(nullable = false)
	private Date createdAt = new Date();

	@Column
	private Long descriptionId;

	@Column
	private Date updatedAt;

	public Task() {
		// Empty Constructor
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
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
		if(concluida == null){
			this.concluida = false;
		}else{
			this.concluida = concluida;
		}
	}

	public Long getElementoPai() {
		return elementoPai;
	}

	public void setElementoPai(Long elementoPai) {
		if(elementoPai == null){
			this.elementoPai = Long.valueOf(0);
		}else{
			this.elementoPai = elementoPai;
		}
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		if(createdAt == null){
			this.createdAt = new Date();
		}else{
			this.createdAt = createdAt;
		}
	}

	public Long getDescriptionId() {
		return descriptionId;
	}

	public void setDescriptionId(Long descriptionId) {
		this.descriptionId = descriptionId;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((nome == null) ? 0 : nome.hashCode());
		result = prime * result + ((concluida == null) ? 0 : concluida.hashCode());
		result = prime * result + ((elementoPai == null) ? 0 : elementoPai.hashCode());
		result = prime * result + ((createdAt == null) ? 0 : createdAt.hashCode());
		result = prime * result + ((descriptionId == null) ? 0 : descriptionId.hashCode());
		result = prime * result + ((updatedAt == null) ? 0 : updatedAt.hashCode());
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
		if (createdAt == null) {
			if (other.createdAt != null)
				return false;
		} else if (!createdAt.equals(other.createdAt))
			return false;
		if (descriptionId == null) {
			if (other.descriptionId != null)
				return false;
		} else if (!descriptionId.equals(other.descriptionId))
			return false;
		if (updatedAt == null) {
			if (other.updatedAt != null)
				return false;
		} else if (!updatedAt.equals(other.updatedAt))
			return false;
		return true;
	}	
}
