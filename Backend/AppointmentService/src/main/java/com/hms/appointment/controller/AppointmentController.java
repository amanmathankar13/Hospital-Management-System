package com.hms.appointment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.dto.AppointmentDetails;
import com.hms.appointment.exception.HMSException;
import com.hms.appointment.service.AppointmentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;





@RestController
@RequestMapping("/appointment")
@Validated
@CrossOrigin
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/schedule")
    public ResponseEntity<Long> scheduleAppointment(@RequestBody AppointmentDTO appointmentDTO) throws HMSException {
        return new ResponseEntity<>(appointmentService.scheduleAppointment(appointmentDTO), HttpStatus.CREATED);
    }

    @PostMapping("/cancel/{id}")
    public ResponseEntity<String> cancelAppointment(@PathVariable Long id) throws HMSException {
        appointmentService.cancelAppointment(id);
        return new ResponseEntity<>("Appointment cancelled successfully", HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<AppointmentDTO> getAppointmentDetails(@PathVariable Long id) throws HMSException {
        return new ResponseEntity<>(appointmentService.getAppointmentDetails(id),HttpStatus.OK);
    }

    @GetMapping("/get/details/{appointmentId}")
    public ResponseEntity<AppointmentDetails> getAppointmentDetailsWithName(@PathVariable Long appointmentId) {
        return new ResponseEntity<>(appointmentService.getAppointmentDetailsWithName(appointmentId), HttpStatus.OK);
    }

    @GetMapping("/get/detailsByPatientId/{patientId}")
    public ResponseEntity<List<AppointmentDetails>> getAppointmentDetailsByPatientId(@PathVariable("patientId") Long patientId) {
        return ResponseEntity.ok(appointmentService.getAppointmentDetailsByPatientId(patientId));
    }

    @GetMapping("/get/detailsByDoctorId/{doctorId}")
    public ResponseEntity<List<AppointmentDetails>> getAppointmentDetailsByDoctorId(@PathVariable("doctorId") Long doctorId) {
        return ResponseEntity.ok(appointmentService.getAppointmentDetailsByDoctorId(doctorId));
    }
    
}
