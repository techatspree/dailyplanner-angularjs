package de.akquinet.dailyplanner.web.rest;

@SuppressWarnings("UnusedDeclaration")
public class AuthenticatedUserDto {

    private String login;
    private String[] roles;

    public AuthenticatedUserDto(String login, String[] roles) {
        this.login = login;
        this.roles = roles;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String[] getRoles() {
        return roles;
    }

    public void setRoles(String[] roles) {
        this.roles = roles;
    }
}
