package todo.list.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import todo.list.entities.Description;

@Repository
public interface DescriptionRepository extends JpaRepository<Description, Long>{
}
