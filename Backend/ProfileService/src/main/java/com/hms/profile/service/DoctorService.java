package com.hms.profile.service;

import com.hms.profile.dto.DoctorDTO;
import com.hms.profile.exception.HMSException;

public interface DoctorService {
    public Long addDoctor(DoctorDTO doctorDTO) throws HMSException;
    public DoctorDTO getDoctorById(Long id) throws HMSException;
}
