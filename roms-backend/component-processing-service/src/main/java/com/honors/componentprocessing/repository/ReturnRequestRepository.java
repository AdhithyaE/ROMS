package com.honors.componentprocessing.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.honors.componentprocessing.entity.ReturnRequest;

@Repository
public interface ReturnRequestRepository extends JpaRepository<ReturnRequest, Integer>{

	ReturnRequest findByRequestId(String requestId);

}
