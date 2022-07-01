package com.honors.componentprocessing.feignclient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "packaging-and-delivery-service")
public interface PackagingDeliveryFeignClient {
	 @GetMapping("/packagingAndDelivery/getCharge/{componentType}/{count}")
	    double getPackagingAndDeliveryCharge(@PathVariable String componentType, @PathVariable int count);

}
