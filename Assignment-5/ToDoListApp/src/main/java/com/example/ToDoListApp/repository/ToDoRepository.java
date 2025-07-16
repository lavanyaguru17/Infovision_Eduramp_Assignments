package com.example.ToDoListApp.repository;

import com.example.ToDoListApp.entity.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ToDoRepository extends JpaRepository<ToDo, Long> {
}

