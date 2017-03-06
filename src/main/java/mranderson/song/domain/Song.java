package mranderson.song.domain;

import mranderson.song.model.SongDTO;
import mranderson.user.domain.UserAccount;

import javax.persistence.*;

@Entity
public class Song {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String artist;
	private String title;
	private String token;
	@ManyToOne
	@JoinColumn(name = "uploader_id")
	private UserAccount uploader;

	public Song() {
	}

	public Song(String artist, String title, String token, UserAccount uploader) {
		this.artist = artist;
		this.title = title;
		this.token = token;
		this.uploader = uploader;
	}

	public void update(SongDTO songDTO) {
		this.artist = songDTO.getArtist();
		this.title = songDTO.getTitle();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getArtist() {
		return artist;
	}

	public void setArtist(String artist) {
		this.artist = artist;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public UserAccount getUploader() {
		return uploader;
	}

	public void setUploader(UserAccount uploader) {
		this.uploader = uploader;
	}
}
