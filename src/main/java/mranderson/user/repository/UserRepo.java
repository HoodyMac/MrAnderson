package mranderson.user.repository;

public interface UserRepo {

    Boolean findFollowing(Long idCurrentUser, Long following);

}
