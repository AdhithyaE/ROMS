package com.honors.packaginganddelivery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient


public class PackagingAndDeliveryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PackagingAndDeliveryServiceApplication.class, args);
	}

}
