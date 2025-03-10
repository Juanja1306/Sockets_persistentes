# Sockets: Chat en Tiempo Real con Mensajes Persistentes

Este proyecto consiste en el desarrollo de una aplicación de comunicación grupal en tiempo real, implementando sockets TCP para gestionar la comunicación cliente-servidor. Además, se aplicarán protocolos de verificación de la integridad de los mensajes y/o encriptación de datos y se presentará un informe detallado y un video demostrativo del funcionamiento del sistema.

---

## Objetivos del Proyecto

1. **Investigación sobre Sockets**  
   Ampliar el conocimiento sobre los mecanismos de comunicación en red, específicamente en lo relacionado con el uso de sockets.

2. **Desarrollo de una Aplicación de Chat Grupal en Tiempo Real**  
   - Diseñar una arquitectura centralizada de tipo cliente-servidor para conectar múltiples clientes a un servidor central que gestione el intercambio de mensajes.
   - Implementar sockets TCP en los nodos del sistema para permitir la comunicación entre ellos.
   - Garantizar la seguridad de la comunicación mediante verificación de la integridad de los mensajes y/o encriptación de datos.
   - Gestionar adecuadamente las conexiones y desconexiones de los clientes, incluyendo reconexión automática en caso de pérdida de conexión.
   - Diseñar una interfaz de usuario amigable para facilitar la interacción con el sistema, permitiendo enviar y recibir mensajes fácilmente.

3. **Demostración del Funcionamiento**  
   Crear un video que muestre el funcionamiento de la aplicación en diferentes escenarios.

4. **Informe Técnico**  
   Elaborar un informe detallado que documente:
   - El proceso de investigación y diseño.
   - Las decisiones técnicas tomadas.
   - La implementación y los resultados obtenidos.

---

# Implementación de Persistencia de Mensajes Ante la Desconexión de Clientes

La implementación de persistencia de mensajes ante la desconexión de clientes permite que los mensajes enviados mientras un cliente no está conectado se almacenen en el servidor. Cuando el cliente se reconecta, recibe automáticamente los mensajes pendientes de entrega. Esta funcionalidad mejora la experiencia del usuario, asegurando que no se pierdan mensajes importantes incluso después de una desconexión temporal.

---

# NOTA
Esta actividad se desarrolló en **dos versiones diferentes** utilizando tecnologías distintas:

- **Python**
- **Node.js**

