package ru.itis.javalab.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.itis.javalab.models.Document;

public interface DocumentRepository extends JpaRepository<Document, Long> {
}
