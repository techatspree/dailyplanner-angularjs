package de.akquinet.dailyplanner.dbmodel;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;

@Entity
@Table(name = "cm_role")
public class Role extends AbstractEntity {

    public Role(String name) {
        this.name = name;
    }

    @Basic
    private String name;

    @ManyToMany
    private Collection<User> users = new HashSet<User>();

    public Role() {
    }

    public String getName() {
        return name;
    }

    public Collection<User> getUsers() {
        return Collections.unmodifiableCollection(users);
    }

    public void addUser(User user) {
        if (!(users.contains(user))) {
            users.add(user);
            user.addRole(this);
        }
    }

}
