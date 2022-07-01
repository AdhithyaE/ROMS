package com.honors.componentprocessing.payload;

import java.util.Date;
import lombok.Data;

@Data
public class ReturnResponsePayload {

	 private String requestId;
	    private double processingCharge;
	    private double packageAndDeliveryCharge;
	    private Date dateOfDelivery;

}
