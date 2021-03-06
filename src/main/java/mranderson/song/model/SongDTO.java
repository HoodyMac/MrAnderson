package mranderson.song.model;

public class SongDTO {

	private String artist;
	private String title;

	public SongDTO() {
	}

	public SongDTO(String artist, String title) {
		this.artist = artist;
		this.title = title;
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
}
