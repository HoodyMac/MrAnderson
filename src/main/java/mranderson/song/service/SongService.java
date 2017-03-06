package mranderson.song.service;

import mranderson.song.model.SongDTO;
import mranderson.song.domain.Song;
import mranderson.song.repository.SongRepository;
import mranderson.song.repository.storage.StorageService;
import mranderson.song.utils.AndersonFileUtils;
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

	public Song edit(Long id, SongDTO songDTO) {
		Song song = songRepository.getOne(id);
		song.update(songDTO);
		return songRepository.save(song);
	}
}
