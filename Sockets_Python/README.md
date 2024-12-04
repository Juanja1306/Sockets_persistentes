# Descripción del Proyecto

Este proyecto implementa un sistema de chat seguro basado en sockets TCP y asegura la comunicación entre clientes y servidor mediante HMAC (Hash-Based Message Authentication Code). Además, incluye una funcionalidad de **mensajes persistentes** que permite almacenar los mensajes no entregados y reenviarlos a los clientes cuando se reconectan.

## Componentes principales:

1. **Servidor de chat**: Coordina las comunicaciones entre los clientes y verifica la autenticidad de los mensajes. También gestiona los mensajes persistentes.
2. **Cliente de chat**: Proporciona una interfaz gráfica para enviar y recibir mensajes. Los clientes también pueden recibir mensajes no entregados si se reconectan al servidor.

El sistema garantiza la integridad y autenticidad de los mensajes mediante el uso de una clave secreta compartida y ofrece una experiencia mejorada de reconexión para los usuarios.

---

## Requisitos Previos

Antes de ejecutar el sistema, asegúrate de cumplir con los siguientes requisitos:

- **Python 3.9 o superior** instalado en tu sistema.
- Librerías estándar de Python (no se necesitan instalaciones adicionales).
- Una red local configurada para permitir conexiones en el puerto `5555`.

---

## Cómo Ejecutar el Sistema

### 1. Servidor

1. **Ubicación del archivo**: Asegúrate de tener el archivo `server.py` en tu sistema.
2. **Pasos**:
   - Abre una terminal.
   - Navega al directorio donde se encuentra `server.py`.
   - Ejecuta el comando:

     ```bash
     python server.py
     ```

3. **Estado**:
   - Verás mensajes en la terminal indicando:
     - Conexiones entrantes.
     - Desconexiones.
     - Errores y mensajes transmitidos.
   - El servidor ahora también maneja el historial de mensajes no entregados y los envía a los clientes que se reconectan.

4. **Por defecto**:
   - El servidor se ejecutará en `127.0.0.1` (localhost) en el puerto `5555`.

---

### 2. Cliente

1. **Ubicación del archivo**: Asegúrate de tener el archivo `cliente.py` en tu sistema.
2. **Pasos**:
   - Abre una terminal.
   - Navega al directorio donde se encuentra `cliente.py`.
   - Ejecuta el comando:

     ```bash
     python cliente.py
     ```

3. **Interacción**:
   - Se abrirá una interfaz gráfica donde podrás:
     - Ingresar tu nickname (se pedirá al inicio).
     - Enviar mensajes al chat público.
     - Ver una lista de usuarios conectados.
   - Los mensajes que no se hayan entregado durante una desconexión anterior se enviarán automáticamente cuando el cliente se reconecte.

4. **Reconexión Automática**:
   - Si la conexión con el servidor se pierde, el cliente intentará reconectarse automáticamente cada 5 segundos.

---

## Funcionalidad de Mensajes Persistentes

- **Almacenamiento de mensajes no entregados**: Los mensajes enviados mientras un cliente no está conectado se almacenan temporalmente en el servidor.
- **Recuperación de mensajes no entregados**: Cuando un cliente se reconecta, el servidor le envía todos los mensajes pendientes de entrega.

---

## Seguridad

- **HMAC**: Cada mensaje incluye un HMAC calculado con una clave secreta compartida entre servidor y clientes. Esto asegura la integridad de los mensajes en tránsito.
- **Clave secreta**: Está definida en los archivos `server.py` y `cliente.py`. **Debe mantenerse privada y no compartirse con terceros.**
- **Rechazo de mensajes corruptos**: Los mensajes con un HMAC inválido son descartados automáticamente.

---

## Notas Adicionales

1. **Configuración de IP**: Este sistema está configurado para ejecutarse en `localhost` por defecto. Para ejecutarlo en una red, actualiza la dirección IP en ambos archivos.
2. **Puerto**: Si el puerto `5555` ya está en uso, puedes cambiarlo en los archivos.
3. **Detener el servidor**: Usa `CTRL+C` en la terminal donde se ejecuta el servidor para detenerlo manualmente.

