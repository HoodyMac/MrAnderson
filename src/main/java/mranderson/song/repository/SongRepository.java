package mranderson.song.repository;

import mranderson.song.domain.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {

	@Query("select s from Song s where s.artist like %?1% or s.title like %?1%")
	List<Song> search(String query);
	List<Song> findByToken(String token);
	@Query("select s from Song s where s.uploader.id = ?1")
	List<Song> findByUploaderId(Long id);
}
