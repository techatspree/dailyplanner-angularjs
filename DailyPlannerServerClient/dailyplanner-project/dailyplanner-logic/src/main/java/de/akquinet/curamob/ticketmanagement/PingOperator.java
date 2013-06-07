package de.akquinet.curamob.ticketmanagement;

import javax.ejb.Stateless;

@Stateless
public class PingOperator {
    public String operate(String input) {
        return input;
    }

    public boolean checkInput(Object input) {
        return (input != null) && (input instanceof String);
    }
}
