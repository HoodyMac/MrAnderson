package mranderson.service;

import mranderson.dto.SongDTO;
import mranderson.model.Song;
import mranderson.repository.SongRepository;
import mranderson.repository.storage.StorageService;
import mranderson.utils.AndersonFileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class SongService {

	@Autowired
	private StorageService storageService;

	@Autowired
	private SongRepository songRepository;

	public Song upload(SongDTO songDTO, MultipartFile file) {
		if (file == null) {
			return null;
		}
		String token = null;
		try {
			token = DigestUtils.md5DigestAsHex(file.getInputStream());
		} catch (IOException e) {
			e.printStackTrace();
		}
		if (token == null) {
			return null;
		}
		token = token + AndersonFileUtils.getMultipartFileExtension(file);
		Song song = new Song(songDTO.getArtist(), songDTO.getTitle(), token);
		storageService.store(file, token);
		return songRepository.save(song);
	}
}
