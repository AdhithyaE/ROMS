package com.honors.componentprocessing.service;

import com.honors.componentprocessing.feignclient.PackagingDeliveryFeignClient;
import com.honors.componentprocessing.entity.ReturnRequest;
import com.honors.componentprocessing.payload.ReturnRequestPayload;
import com.honors.componentprocessing.payload.ReturnResponsePayload;
import com.honors.componentprocessing.repository.ReturnRequestRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.UUID;

@Service
@Slf4j
public class RequestProcessingService {
	 private final ReturnRequestRepository returnRequestRepository;
	 
	 private final PackagingDeliveryFeignClient packagingDeliveryFeignClient;

	    @Autowired
	    public RequestProcessingService(
	            ReturnRequestRepository returnRequestRepository,
	            PackagingDeliveryFeignClient packagingDeliveryFeignClient) {
	        this.returnRequestRepository = returnRequestRepository;
	        this.packagingDeliveryFeignClient = packagingDeliveryFeignClient;
	    }

	    public ReturnResponsePayload processReturnRequest(ReturnRequestPayload returnRequestPayload) {
	        ReturnRequest returnRequest = new ReturnRequest();
	        ReturnResponsePayload returnResponsePayload = new ReturnResponsePayload();

	        BeanUtils.copyProperties(returnRequestPayload, returnRequest);
	       int processingDays =returnRequestPayload.getComponentType().equalsIgnoreCase("integral") ? 5 : 2;
	    		   //5;
	        
	        double processingCharge = returnRequestPayload.getComponentType().equalsIgnoreCase("integral") ? 500 : 300;

//	        if (returnRequestPayload.getComponentType().equalsIgnoreCase("integral") && returnRequestPayload.isPriorityRequest()) {
//	            processingDays = 2;
//	            processingCharge += 200;
//	        }
	        LocalDate date = LocalDate.now().plusDays(processingDays);
	        returnRequest.setProcessingCharge(processingCharge);
	        returnRequest.setDateOfDelivery(Date.from(date.atStartOfDay(ZoneId.systemDefault()).toInstant()));
	       // returnRequest.setRequestId(UUID.randomUUID().toString().replace("-", ""));
	        returnRequest.setRequestId("RID"+UUID.randomUUID().toString().substring(18).toUpperCase().replace("-", ""));

	        returnRequest.setPackageAndDeliveryCharge(packagingDeliveryFeignClient.getPackagingAndDeliveryCharge(
	                returnRequestPayload.getComponentType(), returnRequestPayload.getQuantity())
	        );

	        returnRequestRepository.save(returnRequest);

	        BeanUtils.copyProperties(returnRequest, returnResponsePayload);

	        return returnResponsePayload;

	    }
    public String completeProcessing(String requestId,long cardNumber,double creditLimit,double processingCharge) {
    	ReturnRequest returnRequest=returnRequestRepository.findByRequestId(requestId);
    
    	returnRequest.setCardNumber(cardNumber);
    	
    	if(creditLimit>=processingCharge) {
    		returnRequest.setStatus("success");
    		returnRequestRepository.save(returnRequest);
    		return "success";
    	}
    	else {
    		returnRequest.setStatus("failed");
    		returnRequestRepository.save(returnRequest);
    		return "failed";
    	}
    	
    }
	  
}
