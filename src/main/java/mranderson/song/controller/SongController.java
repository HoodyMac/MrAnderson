package mranderson.song.controller;

import mranderson.song.dto.SongDTO;
import mranderson.song.model.Song;
import mranderson.song.repository.SongRepository;
import mranderson.song.repository.storage.StorageService;
import mranderson.song.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/songs/")
public class SongController {

	@Autowired
	private SongService songService;

	@Autowired
	private SongRepository songRepository;

	@Autowired
	private StorageService storageService;

	@GetMapping("all")
	public List<Song> get() {
		return songRepository.findAll();
	}

	@PostMapping("upload")
	public Song upload(@RequestParam("artist") String artist, @RequestParam("title") String title, @RequestParam("file") MultipartFile file) {
		Song song = songService.upload(new SongDTO(artist, title), file);
		return song;
	}

	@PutMapping("edit/{id}")
	public Song edit(@RequestBody SongDTO songDTO, @PathVariable("id") Long id) {
		return songService.edit(id, songDTO);
	}

	@DeleteMapping("delete/{id}")
	public void delete(@PathVariable("id") Long id)
	{
		Song song = songRepository.findOne(id);
		songRepository.delete(id);
		List<Song> songs = songRepository.findByToken(song.getToken());
		if(songs != null || songs.isEmpty()) {
			storageService.delete(song.getToken());
		}

	}
}
