package com.honors.componentprocessing.controller;

import com.honors.componentprocessing.feignclient.AuthFeignClient;
import com.honors.componentprocessing.payload.ReturnRequestPayload;
import com.honors.componentprocessing.payload.ReturnResponsePayload;
import com.honors.componentprocessing.service.RequestProcessingService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/returns")
public class ComponentProcessingController {
	  private final AuthFeignClient authFeignClient;

	    private final RequestProcessingService requestProcessingService;

	    @Autowired
	    public ComponentProcessingController(AuthFeignClient authFeignClient, RequestProcessingService requestProcessingService) {
	        this.authFeignClient = authFeignClient;
	        this.requestProcessingService = requestProcessingService;
	    }
	    @GetMapping("")
	    public String msg(@RequestHeader("Authorization") String token) {
	    	return "Hello";
	    }
	    // processDetail
	    @PostMapping("/createReturnRequest")
	    public ReturnResponsePayload createReturnRequest(@RequestHeader("Authorization") String token,
	                                                     @RequestBody ReturnRequestPayload returnRequestPayload) {
	        authFeignClient.validateToken(token);
	        return requestProcessingService.processReturnRequest(returnRequestPayload);
	    }
	    @PostMapping("/completeProcessing/{requestId}/{cardNumber}/{creditLimit}/{processingCharge}")
	    public String completeProcessing( @RequestHeader("Authorization") String token,
	            @PathVariable("requestId") String requestId,
	            @PathVariable("cardNumber") long cardNumber,
	            @PathVariable("creditLimit") double creditLimit,
	            @PathVariable("processingCharge") double processingCharge) {
	    	 authFeignClient.validateToken(token);
		        return requestProcessingService.completeProcessing(requestId,cardNumber,creditLimit, processingCharge);
	    }
	    
}
