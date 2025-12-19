package com.hms.appointment.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.appointment.dto.AppointmentRecordDTO;
import com.hms.appointment.dto.PrescriptionDetails;
import com.hms.appointment.dto.RecordDetails;
import com.hms.appointment.exception.HMSException;
import com.hms.appointment.service.AppointmentRecordService;
import com.hms.appointment.service.PrescriptionService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@CrossOrigin
@RequestMapping("/appointment/record")
@Validated
@RequiredArgsConstructor
public class AppointmentRecordController {

    private final AppointmentRecordService appointmentRecordService;

    private final PrescriptionService prescriptionService;

    @PostMapping("/create")
    public ResponseEntity<Long> createAppointmentRecord(@RequestBody AppointmentRecordDTO appointmentRecordDTO) {
        return new ResponseEntity<>(appointmentRecordService.createAppointmentRecord(appointmentRecordDTO), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateAppointmentRecord(@RequestBody AppointmentRecordDTO appointmentRecordDTO) {
        appointmentRecordService.updateAppointmentRecord(appointmentRecordDTO);
        return ResponseEntity.ok("Appointment Record updated successfully");
    }

    @GetMapping("/get/appointmentId/{id}")
    public ResponseEntity<AppointmentRecordDTO> getByAppointmentId(@PathVariable("id") Long appointmentId) {
        return ResponseEntity.ok(appointmentRecordService.getAppointmentRecordByAppointmentId(appointmentId));
    }

    @GetMapping("/getDetails/appointmentId/{id}")
    public ResponseEntity<AppointmentRecordDTO> getAppointmentDetailsByAppointmentId(@PathVariable("id") Long appointmentId) {
        return ResponseEntity.ok(appointmentRecordService.getAppointmentRecordDetailsByAppoitmentId(appointmentId));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<AppointmentRecordDTO> getById(@PathVariable("id") Long appointmentRecordId) {
        return ResponseEntity.ok(appointmentRecordService.getAppointmentRecordById(appointmentRecordId));
    }
    

    @GetMapping("/getRecordsByPatientId/{patientId}")
    public ResponseEntity<List<RecordDetails>> getRecordDetailsByPatientId(@PathVariable("patientId") Long patientId) throws HMSException {
        return ResponseEntity.ok(appointmentRecordService.getAppointmentRecordsByPatientId(patientId));
    }

    @GetMapping("/isRecordExists/{id}")
    public ResponseEntity<Boolean> isRecordExists(@PathVariable("id") Long recordId) throws HMSException {
        return new ResponseEntity<>(appointmentRecordService.isRecordExists(recordId), HttpStatus.OK);
    }

    @GetMapping("/getPrescriptionsByPatientId/{patientId}")
    public ResponseEntity<List<PrescriptionDetails>> getPrescriptionsByPatientId(@PathVariable("patientId") Long patientId) {
        return new ResponseEntity<>(prescriptionService.getPrescriptionsByPatientId(patientId), HttpStatus.OK);
    }
    
}
