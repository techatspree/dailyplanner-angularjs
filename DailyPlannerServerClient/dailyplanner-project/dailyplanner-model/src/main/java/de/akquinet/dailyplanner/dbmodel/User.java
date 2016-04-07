package de.akquinet.dailyplanner.dbmodel;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.Collection;
import java.util.HashSet;

@Entity
@Table(name = "cm_user")
public class User extends AbstractEntity {

    @Basic
    private String login;

    @Basic
    private String password;

    @Basic
    private String firstName;

    @Basic
    private String lastName;


    @ManyToMany(mappedBy = "users")
    private Collection<Role> roles = new HashSet<Role>();

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public boolean checkPassword(String password) {
        if (password == null) {
            return false;
        } else {
            return password.equals(this.password);
        }
    }

    public void changePassword(String passwordOld, String passwordNew) {
        if (checkPassword(passwordOld)) {
            this.password = passwordNew;
        }
    }

    public static User createUser(String login, String password, String firstName, String lastName) {
        User user = new User();
        user.setLogin(login);
        user.password = password;
        user.firstName = firstName;
        user.lastName = lastName;
        return user;
    }

    public void addRole(Role role) {
        if (!(roles.contains(role))) {
            roles.add(role);
            role.addUser(this);
        }
    }

}
