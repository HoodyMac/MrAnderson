package mranderson.song.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mranderson.song.domain.Song;
import mranderson.song.repository.SongRepository;

@RestController
@RequestMapping("api/")
public class SearchController {

	@Autowired
	private SongRepository songRepository;

	@GetMapping("search/{search}")
	public ResponseEntity<List<Song>> findByArtist(@PathVariable("search") String search) {


		List<Song> songs = songRepository.search(search);

		return new ResponseEntity<List<Song>>(songs, HttpStatus.OK);
	}
}
