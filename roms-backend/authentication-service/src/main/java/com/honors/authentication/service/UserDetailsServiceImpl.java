package com.honors.authentication.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.honors.authentication.entity.User;
import com.honors.authentication.repository.UserRepository;
import com.honors.authentication.exception.UserNotFoundException;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	UserRepository userRepository;
	    @Autowired
	    public UserDetailsServiceImpl(UserRepository userRepository) {
	        this.userRepository = userRepository;
	    }

	    /*
	    * Updating the logic of the user detail service, with our check of the username.
	    * */
	    @Override
	    @Transactional
	    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	        Optional<User> users = userRepository.findByUsername(username);
	        if (users.isEmpty()) {
	            throw new UserNotFoundException(username);
	        }
	        return users.map(UserDetailsImpl::new).get();
	    }
}
