package com.honors.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.honors.authentication.entity.User;
import com.honors.authentication.repository.UserRepository;

@SpringBootApplication
@EnableDiscoveryClient
public class AuthenticationServiceApplication implements CommandLineRunner {
	@Autowired
	 UserRepository userRepository;
	 PasswordEncoder passwordEncoder;
	 @Autowired
		public AuthenticationServiceApplication(UserRepository userRepository, PasswordEncoder passwordEncoder) {
			this.userRepository = userRepository;
			this.passwordEncoder = passwordEncoder;
		}
	public static void main(String[] args) {
		SpringApplication.run(AuthenticationServiceApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {
		userRepository.save(new User("adhithya", passwordEncoder.encode("edassery")));
		userRepository.save(new User("naruto", passwordEncoder.encode("naruto")));
		userRepository.save(new User("mikasa", passwordEncoder.encode("attack")));
	}
	}
