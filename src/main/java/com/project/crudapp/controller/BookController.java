package com.project.crudapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.crudapp.dao.BookRepository;
import com.project.crudapp.entity.Book;

@RestController
@RequestMapping("/api")
public class BookController {

	@Autowired
	private BookRepository bookRepository;

	@GetMapping("/books")
	public List<Book> getBooks() {
		return bookRepository.findAll();
	}

	@GetMapping("/books/{id}")
	public Book getBook(@PathVariable int id) {
		// return the book with the following id if found
		return bookRepository.findById(id).orElseThrow(RuntimeException::new);
	}

	@PostMapping("/books")
	public Book saveBook(@RequestBody Book book) {
		return bookRepository.save(book);
	}

	@PutMapping("/books/{id}")
	public Book editBook(@PathVariable int id, @RequestBody Book newBook) {
		// find the book by id then update accordingly
		Book editingBook = bookRepository.findById(id).orElseThrow(RuntimeException::new);
		editingBook.setBookName(newBook.getBookName());
		editingBook.setAuthor(newBook.getAuthor());
		editingBook.setDescription(newBook.getDescription());
		editingBook.setGenre(newBook.getGenre());
		editingBook.setRating(newBook.getRating());
		return bookRepository.save(editingBook);
	}

	@DeleteMapping("/books/{id}")
	public void deleteBook(@PathVariable int id) {
		bookRepository.deleteById(id);
	}
}
