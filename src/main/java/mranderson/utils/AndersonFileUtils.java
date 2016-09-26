package mranderson.utils;

import org.springframework.web.multipart.MultipartFile;

public class AndersonFileUtils {

	public static String getMultipartFileExtension(MultipartFile file) {
		return '.' + file.getOriginalFilename().split("\\.")[1];
	}
}
