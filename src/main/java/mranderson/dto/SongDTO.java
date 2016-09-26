package mranderson.dto;

import org.springframework.web.multipart.MultipartFile;

public class SongDTO {

	private String author;
	private String name;

	public SongDTO(String author, String name) {
		this.author = author;
		this.name = name;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
