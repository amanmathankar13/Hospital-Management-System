package com.hms.appointment.utility;

import java.util.List;

public class StringListConverter {
    

    public static String convertListtoString(List<String> str){
        if(str==null || str.isEmpty()){
            return "";
        }
        return String.join(",", str);
    }
    public static List<String> convertStringtoList(String str){
        if(str==null || str.isEmpty()){
            return List.of();
        }
        return List.of(str.split(","));
    }
}
