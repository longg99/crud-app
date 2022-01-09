package com.project.crudapp.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Book {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int Id;
	private String bookName;
	private String author;
	private String description;
	private String genre;
	private int rating;

	// private constructor
	private Book() {
	}

	public Book(String bookName, String author, String description, String genre, int rating) {
		this.bookName = bookName;
		this.author = author;
		this.description = description;
		this.genre = genre;
		this.rating = rating;
	}

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		this.Id = id;
	}

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	};

	@Override
	public String toString() {
		return "Book [id=" + Id + ", bookName=" + bookName + ", author=" + author + ", description=" + description
				+ ", genre=" + genre + ", rating=" + rating + "]";
	}
}
