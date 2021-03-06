package mranderson.user.repository;

import mranderson.user.domain.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserAccount, Long> {

    Optional<UserAccount> findOneByUsername(String username);
    UserAccount findByUsername(String userName);
}
