package mranderson.security.service;

import mranderson.user.domain.UserAccount;

public interface SecurityContextService {
    UserAccount currentUserAccount();
}
