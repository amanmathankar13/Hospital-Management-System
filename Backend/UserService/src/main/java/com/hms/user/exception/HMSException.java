package com.hms.user.exception;

import java.io.Serial;

public class HMSException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    public HMSException(String message){
        super(message);
    }
}
