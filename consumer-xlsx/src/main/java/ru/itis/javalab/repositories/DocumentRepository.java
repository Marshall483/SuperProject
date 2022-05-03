package ru.itis.javalab.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.itis.javalab.models.Document;

@Repository
public interface DocumentRepository extends CrudRepository<Document, Long> {
}
