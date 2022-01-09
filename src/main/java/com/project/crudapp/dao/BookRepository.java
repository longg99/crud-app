package com.project.crudapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.crudapp.entity.Book;

// this interface provides the CRUD operation
// without the need of a DAO
// the entity type is Book and id is int
public interface BookRepository extends JpaRepository<Book, Integer> {

	// custom selector to sort the result by the order of book name, ascending
	public List<Book> findAllByOrderByBookNameAsc();
}
