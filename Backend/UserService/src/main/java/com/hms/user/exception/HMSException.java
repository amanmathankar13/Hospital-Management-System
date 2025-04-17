package com.hms.user.exception;

public class HMSException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public HMSException(String message){
        super(message);
    }
}
