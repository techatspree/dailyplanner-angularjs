package de.akquinet.dailyplanner.logic.rest;

import javax.ejb.Stateless;
import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Stateless
public class DtoConverter {

    private static class EntityDtoProperties {
        private final PropertyDescriptor[] dtoPropertyDescriptors;
        private final Map<String, PropertyDescriptor> entityPropertyDescriptorMap;

        private EntityDtoProperties(PropertyDescriptor[] dtoPropertyDescriptors,
                                    Map<String, PropertyDescriptor> entityPropertyDescriptorMap) {
            this.dtoPropertyDescriptors = dtoPropertyDescriptors;
            this.entityPropertyDescriptorMap = entityPropertyDescriptorMap;
        }

        public PropertyDescriptor[] getDtoPropertyDescriptors() {

            return dtoPropertyDescriptors;
        }

        public Map<String, PropertyDescriptor> getEntityPropertyDescriptorMap() {
            return Collections.unmodifiableMap(entityPropertyDescriptorMap);
        }
    }

    @SuppressWarnings("EjbProhibitedPackageUsageInspection")
    public void fillDtoFromEntity(Object entity, Object dto) {

        final EntityDtoProperties edps = analyseEntityDto(entity, dto);

        for (PropertyDescriptor dtoDescriptor : edps.getDtoPropertyDescriptors()) {

            final Method writeMethod = dtoDescriptor.getWriteMethod();
            // skip the RO properties, such as getClass()
            if (writeMethod != null) {

                final String property = dtoDescriptor.getName();

                final PropertyDescriptor entityDescriptor = edps.getEntityPropertyDescriptorMap().get(property);
                if (entityDescriptor == null) {
                    throw new RuntimeException("The DTO has the property" + property + " but the entity does not!");
                }
                final Method readMethod = entityDescriptor.getReadMethod();
                if (readMethod == null) {
                    throw new RuntimeException("The property " + property + " can not be read on the entity.");
                }
                try {
                    final Object value = readMethod.invoke(entity);
                    writeMethod.invoke(dto, value);

                } catch (Exception e) {
                    throw new RuntimeException("I cannot copy the property " + property + " from the entity to the dto.", e);
                }
            }
        }
    }

    private EntityDtoProperties analyseEntityDto(Object entity, Object dto) {
        final PropertyDescriptor[] dtoPropertyDescriptors = extractPropertyDescriptors(dto);

        final PropertyDescriptor[] entityPropertyDescriptors = extractPropertyDescriptors(entity);

        if (dtoPropertyDescriptors.length > entityPropertyDescriptors.length) {
            throw new RuntimeException("DTO has more properties than the entity.");
        }

        final Map<String, PropertyDescriptor> entityPropertyDescriptorMap = new HashMap<String, PropertyDescriptor>();
        for (PropertyDescriptor descriptor : entityPropertyDescriptors) {
            entityPropertyDescriptorMap.put(descriptor.getName(), descriptor);
        }
        return new EntityDtoProperties(dtoPropertyDescriptors, entityPropertyDescriptorMap);
    }

    private PropertyDescriptor[] extractPropertyDescriptors(Object bean) {
        final BeanInfo dtoBeanInfo;
        try {
            dtoBeanInfo = Introspector.getBeanInfo(bean.getClass());
        } catch (IntrospectionException e) {
            throw new RuntimeException("Cannot analyze the DTO", e);
        }
        return dtoBeanInfo.getPropertyDescriptors();
    }

    public void fillEntityFromDto(Object dto, Object entity) {

        final EntityDtoProperties edps = analyseEntityDto(entity, dto);

        for (PropertyDescriptor dtoDescriptor : edps.getDtoPropertyDescriptors()) {

            final Method readMethod = dtoDescriptor.getReadMethod();

            final String property = dtoDescriptor.getName();

            final PropertyDescriptor entityDescriptor = edps.getEntityPropertyDescriptorMap().get(property);
            if (entityDescriptor == null) {
                throw new RuntimeException("The DTO has the property" + property + " but the entity does not!");
            }
            final Method writeMethod = entityDescriptor.getWriteMethod();

            // ignore attributes such as class
            if (writeMethod != null) {
                try {
                    final Object value = readMethod.invoke(dto);
                    writeMethod.invoke(entity, value);

                } catch (Exception e) {
                    throw new RuntimeException("I cannot copy the property " + property + " from the dto to the entity.", e);
                }
            }
        }

    }
}
