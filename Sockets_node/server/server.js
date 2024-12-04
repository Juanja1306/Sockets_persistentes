const net = require('net');
const crypto = require('crypto');
const chalk = require('chalk');
const ora = require('ora');

// Configuración para cifrado y HMAC
const ALG = 'aes-256-cbc';
const KEY = '11111111111111111111111111111111'; // 32 bits
const IV = Buffer.from('0000000000000000'); // 16 bits
const HMAC_SECRET = 'admin123';

// Mapa para gestionar usuarios
const users = new Map(); // { username: { socket, active, queue } }

// Funciones de cifrado y HMAC (sin cambios)
function encryptMessage(message) {
    const cipher = crypto.createCipheriv(ALG, KEY, IV);
    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decryptMessage(encryptedMessage) {
    const decipher = crypto.createDecipheriv(ALG, KEY, IV);
    let decrypted = decipher.update(encryptedMessage, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

function generateHMAC(message) {
    return crypto.createHmac('sha256', HMAC_SECRET).update(message).digest('hex');
}

function verifyHMAC(message, hmac) {
    const calculatedHMAC = generateHMAC(message);
    return hmac === calculatedHMAC;
}

// Crear servidor
const server = net.createServer((socket) => {
    let username = null;

    console.log(chalk.green.bold(`Cliente conectado: ${socket.remoteAddress}:${socket.remotePort}`));

    socket.on('data', (data) => {
        try {
            const [encryptedMessage] = data.toString().split('|');
            const decryptedData = decryptMessage(encryptedMessage).split('|');
            const [message, hmac] = decryptedData;

            // Verificar HMAC
            if (!verifyHMAC(message, hmac)) {
                console.log(chalk.red.bold('Error: Integridad del mensaje comprometida.'));
                socket.write('Error: Integridad del mensaje comprometida.\n');
                return;
            }

            if (!username) {
                username = message;

                // Registrar o actualizar el usuario
                if (users.has(username)) {
                    // Usuario existente: actualizar estado a activo y asociar socket
                    const userData = users.get(username);
                    userData.active = true;
                    userData.socket = socket;

                    // Enviar mensajes pendientes
                    const queue = userData.queue;
                    if (queue.length > 0) {
                        socket.write(chalk.green.bold('Tienes mensajes pendientes:\n'));
                        queue.forEach((queuedMessage) => {
                            socket.write(`${chalk.green.bold(queuedMessage)}\n`);
                        });
                        userData.queue = []; // Vaciar la cola
                    }

                    console.log(chalk.blue.bold(`Usuario reconectado: ${username}`));
                } else {
                    // Nuevo usuario: registrar
                    users.set(username, { socket, active: true, queue: [] });
                    console.log(chalk.blue.bold(`Nuevo cliente registrado: ${username}`));
                }

                socket.write(`¡Bienvenido, ${username}!\n`);
            } else {
                // Difundir mensaje
                broadcast(`${username}: ${message}`, username);
            }
        } catch (err) {
            console.error(chalk.red.bold('Error al procesar el mensaje:', err.message));
        }
    });

    socket.on('close', () => {
        if (username) {
            console.log(chalk.yellow.bold(`Cliente desconectado: ${username}`));

            // Marcar usuario como inactivo
            const userData = users.get(username);
            if (userData) {
                userData.active = false;
                userData.socket = null; // Desasociar el socket
            }
        }
    });

    socket.on('error', (err) => {
        console.error(chalk.red.bold('Error en el cliente:', err.message));
    });
});

// Difundir mensajes
function broadcast(message, senderName) {
    users.forEach((userData, username) => {
        if (username !== senderName) {
            if (userData.active && userData.socket) {
                // Enviar mensaje al usuario activo
                try {
                    userData.socket.write(`${chalk.green.bold(message)}\n`);
                } catch (error) {
                    console.error(`Error enviando mensaje a ${username}:`, error.message);

                    // Encolar el mensaje si ocurre un error
                    userData.queue.push(message);
                    userData.active = false; // Marcar como inactivo si el socket falla
                }
            } else {
                // Usuario inactivo: encolar el mensaje
                userData.queue.push(message);
            }
        }
    });
}

// Iniciar servidor
const spinner = ora('Servidor TCP escuchando en el puerto 8000').start();
server.listen(8000, () => {
    spinner.succeed(chalk.cyan.bold('Servidor en línea y escuchando en el puerto 8000'));
});
