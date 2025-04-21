package com.hms.profile.exception;

public class HMSException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public HMSException(String message){
        super(message);
    }
}
