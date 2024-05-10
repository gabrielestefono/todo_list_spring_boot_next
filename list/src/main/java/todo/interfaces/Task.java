package todo.interfaces;

import java.util.Date;

public class Task {
	public String nome;
	public Boolean concluida;
	public Integer elementoPai;
	public Integer descriptionId;
	public Integer userId;
	public Date createdAt;
	public Date updatedAt;

	public Task(
			String nome,
			Boolean concluida,
			Integer elementoPai,
			Integer descriptionId,
			Integer userId,
			Date createdAt,
			Date updatedAt) {
		if (nome == null) {
			throw new IllegalArgumentException("Nome não pode ser null");
		}

		if (userId == null) {
			throw new IllegalArgumentException("UserId não pode ser null");
		}
		this.nome = nome;
		this.userId = userId;

		if (concluida == null) {
			concluida = false;
		}
		this.concluida = concluida;

		if (elementoPai == null) {
			elementoPai = 0;
		}
		this.elementoPai = elementoPai;

		if (createdAt == null) {
			createdAt = new Date();
		}

		this.createdAt = createdAt;
		this.descriptionId = descriptionId;
		this.updatedAt = updatedAt;
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

	public Integer getelementoPai() {
		return elementoPai;
	}

	public void setelementoPai(Integer elementoPai) {
		this.elementoPai = elementoPai;
	}

	public Integer getDescriptionId() {
		return descriptionId;
	}

	public void setDescriptionId(Integer descriptionId) {
		this.descriptionId = descriptionId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
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
}
