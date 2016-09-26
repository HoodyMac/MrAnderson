package mranderson.controller;

import mranderson.dto.SongDTO;
import mranderson.model.Song;
import mranderson.repository.SongRepository;
import mranderson.service.SongService;
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

	@GetMapping("all")
	public List<Song> get() {
		return songRepository.findAll();
	}

	@PostMapping("upload")
	public void upload(@RequestParam("author") String author, @RequestParam("name") String name, @RequestParam("file") MultipartFile file) {
		songService.upload(new SongDTO(author, name), file);
	}
}
