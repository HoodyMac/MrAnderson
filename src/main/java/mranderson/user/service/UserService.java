package mranderson.user.service;

import mranderson.user.model.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface UserService extends UserDetailsService {

    Optional<UserDTO> findOne(Long id);

    Optional<UserDTO> findMe();
}
