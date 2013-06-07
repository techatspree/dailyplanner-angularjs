package de.akquinet.curamob.ticketmanagement;

import java.io.Serializable;

public class RequestHolder<I,O> implements Serializable {

    private static final long serialVersionUID = 1L;
    private OperationType operationType;

    public static enum State {REQUESTED, OPERATED}
    public static enum OperationType {PING}



    private State state;
    private O output;

    private final I input;

    public RequestHolder(OperationType operationType, I input) {
        this.operationType = operationType;
        this.input = input;
        state = State.REQUESTED;

    }

    public void putOutput(O result) {
        state = State.OPERATED;
        this.output = result;
    }

    public State getState() {
        return state;
    }

    public O getOutput() {
        return output;
    }

    public I getInput() {
        return input;
    }

    public OperationType getOperationType() {
        return operationType;
    }
}
