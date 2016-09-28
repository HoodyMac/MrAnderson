package mranderson.utils;

import org.springframework.web.multipart.MultipartFile;

public class AndersonFileUtils {

	public static String getMultipartFileExtension(MultipartFile file) {
		String[] parts = file.getOriginalFilename().split("\\.");
		return '.' + parts[parts.length-1];
	}
}
