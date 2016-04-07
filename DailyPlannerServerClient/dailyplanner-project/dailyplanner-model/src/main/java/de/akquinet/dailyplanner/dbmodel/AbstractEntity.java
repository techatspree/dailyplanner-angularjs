package de.akquinet.dailyplanner.dbmodel;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @SuppressWarnings({"UnusedDeclaration"})
    private Long id;


    public Long getId() {
        return id;
    }

}
