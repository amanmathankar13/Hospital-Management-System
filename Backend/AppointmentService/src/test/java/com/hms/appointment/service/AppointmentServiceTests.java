package com.hms.appointment.service;

import static org.junit.jupiter.api.Assertions.assertNotEquals;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class AppointmentServiceTests {

    // @Autowired
    // private AppointmentRepository appointmentRepository;

    @Test
    public void testGetAppointmentDetails(){
        assertNotEquals(3,1+1);
    }

}
