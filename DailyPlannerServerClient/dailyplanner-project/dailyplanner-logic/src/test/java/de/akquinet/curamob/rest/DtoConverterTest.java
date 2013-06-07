package de.akquinet.curamob.rest;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class DtoConverterTest {

    private final DtoConverter converter = new DtoConverter();

    class Entity {
        private Long id;
        private String login;
        private String password;

        Entity(Long id, String login, String password) {
            this.id = id;
            this.login = login;
            this.password = password;
        }

        public Long getId() {
            return id;
        }

        public String getLogin() {
            return login;
        }

        public void setLogin(String login) {
            this.login = login;
        }

        public void changePassword(String oldPassword, String newPassword) {
            if (password.equals(oldPassword)) {
                password = newPassword;
            }
        }
    }

    class Dto {
        private Long id;
        private String login;


        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getLogin() {
            return login;
        }

        public void setLogin(String login) {
            this.login = login;
        }
    }


    @Test
    public void testFillDtoFromEntity() {

        Entity entity = new Entity(4711L, "login", "password");
        Dto dto = new Dto();

        converter.fillDtoFromEntity(entity, dto);

        assertEquals(entity.getId(), dto.getId());
        assertEquals(entity.getLogin(), dto.getLogin());
    }


    @Test
    public void testFillEntityFromDto() {

        final Dto dto = new Dto();
        dto.setId(1234L);
        dto.setLogin("login");


        final long originalId = 4711L;
        Entity entity = new Entity(originalId, "otherLogin", "password");

        converter.fillEntityFromDto(dto, entity);

        assertEquals((Long) entity.getId(), (Long) originalId);
        assertEquals(entity.getLogin(), dto.getLogin());
    }
}
