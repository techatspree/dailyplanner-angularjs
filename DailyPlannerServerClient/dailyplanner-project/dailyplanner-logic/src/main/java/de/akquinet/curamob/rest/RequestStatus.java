package de.akquinet.curamob.rest;


public class RequestStatus {

    public final static int REQUESTED_STATE = 1;
    public final static int OPERATED_STATE = 2;
    public final static int UNKNOWN_STATE = 2;


    private int state;

    private Object result;


    @SuppressWarnings({"unused"})
    public Object getResult() {
        return result;
    }

    public void setResult(Object result) {
        this.result = result;
    }

    @SuppressWarnings({"unused"})
    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }
}
