package mranderson.song.repository;

import mranderson.song.model.Song;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {

	@Query("select s from Song s where s.artist like %?1% or s.title like %?1%")
	List<Song> findByArtist(String search);
}
