package de.akquinet.dailyplanner.dbmodel;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;

@Entity
@Table(name = "cm_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Basic
    private String login;

    // TODO: use a hash, maybe with a salt
    @Basic
    private String password;

    @Basic
    private String firstName;

    @Basic
    private String lastName;

    @Basic
    private Date birthday;

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

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = (Date) birthday.clone();
    }

    public long getId() {
        return id;
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

    public static User createUser(String login, String password, String firstName, String lastName, Date birthday) {
        User user = new User();
        user.setLogin(login);
        user.password = password;
        user.firstName = firstName;
        user.lastName = lastName;
        user.birthday = birthday;
        return user;
    }

    public void addRole(Role role) {
        if (!(roles.contains(role))) {
            roles.add(role);
            role.addUser(this);
        }
    }
}
