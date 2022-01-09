package com.project.crudapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.project.crudapp.dao.BookRepository;
import com.project.crudapp.entity.Book;

// load some sample data
@Component
public class DatabaseLoader implements CommandLineRunner {
	private BookRepository bookRepository;
	
	@Autowired
	public DatabaseLoader(BookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}
	
	// run after all the beans are created and registered
	@Override
	public void run(String... args) throws Exception {
		this.bookRepository.save(new Book("Harry Potter", "JK Rolling", "Story about a wizard named Harry Potter.", "Fantasy Fiction", 10));
		this.bookRepository.save(new Book("Shoe Dog", "Phil Knight", "A Memoir by the Creator of Nike.", "Memoir", 10));
	}
}
