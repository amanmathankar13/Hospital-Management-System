package com.hms.profile.service;

import com.hms.profile.dto.PatientDTO;
import com.hms.profile.exception.HMSException;

public interface PatientService {

    public Long savePatient(PatientDTO patientDTO) throws HMSException;
    public PatientDTO getPatientById(Long id) throws HMSException;
    public PatientDTO updatePatient(PatientDTO patient) throws HMSException;
    public Boolean patientExists(Long id) throws HMSException;

}
