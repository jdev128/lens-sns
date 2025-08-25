# Lens SNS

Una red social para que puedas mantenerte en contacto con tus amigos y seres queridos.

## Ejecucion local

Ejecuta el siguiente comando para instalar las dependencias y construir la aplicacion:

```bash
npm install && npm run build
```

Una vez finalizada la ejecucion, genera la imagen del servidor donde va a estar alojada la aplicacion, haciendo uso del siguiente comando:

```bash
podman build -t lens-sns .
```

Ahora solo resta iniciar el servidor:

```bash
podman run --name lens-sns-frontend -d -p 8080:80 lens-sns
```

Listo, ya tienes todo en condiciones para poder navegar por la aplicacion a traves de este [enlace](http://localhost:8080/).

NOTA: Recuerda detener el servidor cuando hayas terminado de probar la aplicacion, haciendo uso del siguiente comando:

```bash
podman stop lens-sns-frontend
```

Si deseas volver a iniciar el servidor, puedes utilizar este comando para evitar realizar todos los pasos anteriores:

```bash
podman start lens-sns-frontend
```
