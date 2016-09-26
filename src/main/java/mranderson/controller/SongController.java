package mranderson.controller;

import mranderson.dto.SongDTO;
import mranderson.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/songs/")
public class SongController {

	@Autowired
	private SongService songService;

	@PostMapping("upload")
	public void upload(@RequestParam("author") String author, @RequestParam("name") String name, @RequestParam("file") MultipartFile file) {
		songService.upload(new SongDTO(author, name), file);
	}
}
