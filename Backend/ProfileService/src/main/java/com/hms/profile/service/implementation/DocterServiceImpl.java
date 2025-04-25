package com.hms.profile.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.profile.dto.DoctorDTO;
import com.hms.profile.exception.HMSException;
import com.hms.profile.repository.DoctorRepository;
import com.hms.profile.service.DoctorService;

@Service
public class DocterServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public Long addDoctor(DoctorDTO doctorDTO) {
        if(doctorDTO.getEmail()!=null && doctorRepository.findByEmail(doctorDTO.getEmail()).isPresent()){
            throw new HMSException("DOCTOR_ALREADY_EXISTS");
        }
        if(doctorDTO.getLicenseNumber() != null && doctorRepository.findByLicenseNumber(doctorDTO.getLicenseNumber()).isPresent()){
            throw new HMSException("DOCTOR_ALREADY_EXISTS");
        }

        return doctorRepository.save(doctorDTO.toEntity()).getId();
    }

    @Override
    public DoctorDTO getDoctorById(Long id) {
        return doctorRepository.findById(id).orElseThrow(()-> new HMSException("DOCTOR_NOT_FOUND")).toDTO();
    }

    @Override
    public DoctorDTO updateDoctor(DoctorDTO doctorDTO) throws HMSException {
        if(!doctorRepository.findById(doctorDTO.getId()).isPresent()){
            throw new HMSException("DOCTOR_NOT_FOUND");
        }
        return doctorRepository.save(doctorDTO.toEntity()).toDTO();
    }
    
}
