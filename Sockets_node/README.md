# **Chat-Sockets-Node**  
Chat TCP Seguro con Node.js  

## **Descripción**  
Esta es una aplicación de chat basada en el protocolo TCP desarrollada en Node.js. Permite la comunicación en tiempo real entre múltiples usuarios conectados a un servidor central. Además, incorpora mecanismos de cifrado y verificación de integridad para garantizar la seguridad de los mensajes transmitidos.  

---

## **Características**  

- **Cifrado de Mensajes**: Implementa AES-256-CBC para proteger la confidencialidad de los mensajes.  
- **Autenticación HMAC**: Verifica la integridad de los mensajes utilizando HMAC con SHA-256.  
- **Reconexión Automática**: El cliente intenta reconectarse al servidor en caso de desconexión.  
- **Diferenciación Visual de Mensajes**: Usa `chalk` para resaltar mensajes del servidor, notificaciones y mensajes de otros usuarios.  
- **Múltiples Clientes**: Soporta la conexión de múltiples usuarios simultáneamente.
- **Persistencia de Mensajes**: Los mensajes que se envian a un cliente que se encuentre fuera de linea se almacenan en el servidor hasta que éste vuelva estar disponible, seguidamente 
  cuando el usuario se reconecta el servidor le reenvia estos mensajes.

---

## **Seguridad**  

**Cifrado** 
- Los mensajes se cifran usando AES-256-CBC, una técnica de cifrado simétrico. 
- Clave de cifrado: 11111111111111111111111111111111  
- Vector de inicialización (IV): 0000000000000000
**Autenticación** 
- Cada mensaje lleva un HMAC generado con SHA-256 para asegurar su integridad. 
- Se utiliza la clave secreta admin123 para generar los HMAC. 

---

## **Requisitos del Sistema**  

- **Node.js** versión 14.0 o superior.  

---

## **Instalación**  

1. **Clona el repositorio:**  

2. **Instala las dependencias:**

   ```bash
   npm install
   
---

## **Uso**

1. **Inicia el servidor**
   
     ```bash
     cd server
     node ./server.js

2. **Inicia un cliente**
    
    En otra terminal ejecuta lo siguiente:
   
    ```bash
    cd client
    node ./client.js
       
---

## **Estructura de Archivos**
   ```bash
    📂 sockets_node
   ├── 📂 client 
   │    └── client.js
   ├── 📂 server 
   │    └── server.js
   ├── package.json
   ├── README.md
   └── node_modules/



