package mranderson.user.repository;

import mranderson.user.domain.UserAccount;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

public class UserRepositoryImpl implements UserRepo {

    @PersistenceContext
    private EntityManager em;


    @Override
    public Boolean findFollowing(Long idCurrentUser, Long following) {
        Query query = em.createQuery("SELECT a from UserAccount a JOIN a.followings f where a.id=?1 AND f.id=?2");
        query.setParameter(1, idCurrentUser);
        query.setParameter(2, following);
        List<UserAccount> followings = query.getResultList();

        return followings.size() != 0;
    }
}
