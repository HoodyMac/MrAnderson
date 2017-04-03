package mranderson.user.controller;

import mranderson.song.domain.Song;
import mranderson.song.repository.SongRepository;
import mranderson.user.domain.UserAccount;
import mranderson.user.model.UserDTO;
import mranderson.user.model.UserParams;
import mranderson.user.repository.UserRepo;
import mranderson.user.repository.UserRepository;
import mranderson.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private SongRepository songRepository;

    @RequestMapping(method = RequestMethod.POST)
    public UserAccount create(@Valid @RequestBody UserParams params) {
        return userRepository.save(params.toUser());
    }

    @RequestMapping(value = "/me", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public UserDTO showMe() {
        return userService.findMe().orElseThrow(UserNotFoundException::new);
    }

    @ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "No user")
    private class UserNotFoundException extends RuntimeException {
    }

    @GetMapping("allUsers")
    public List<UserAccount> getUsers() {
        return userRepository.findAll();
    }

    @PostMapping("follow/{id}")
    public List<UserAccount> follow(@PathVariable("id") Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = auth.getName();

        UserAccount currentUser = userRepository.findByUsername(currentUserName);
        UserAccount user = userRepository.findOne(id);
        List<UserAccount> followings = currentUser.getFollowings();
        List<UserAccount> followers = user.getFollowers();

        if (currentUser.getId() == user.getId()) {
            throw new RuntimeException();
        }

        if (followings.contains(user)) {
            followings.remove(user);
            followers.remove(currentUser);
        }
        else
            followings.add(user);
            followers.add(currentUser);
        return userRepository.save(followings);

    }

    @GetMapping("feed")
    public List<Song> getMusic() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = auth.getName();
        UserAccount user = userRepository.findByUsername(currentUserName);

        List<UserAccount> iFollow = user.getFollowings();
        List<Song> songs = new ArrayList<>();

        for(int i = 0; i < iFollow.size(); i++)
        {
            songs.addAll(songRepository.findByUploaderId(iFollow.get(i).getId()));
        }

        return songs;
    }
}
