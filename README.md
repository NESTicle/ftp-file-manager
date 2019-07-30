# calipsu
> desarrollo de la nueva aplicación de calipsu para la ips universitaria

![Calipsu - Home](https://user-images.githubusercontent.com/1715022/61716702-4f756680-ad25-11e9-954d-38d40ad7dcb9.png)



Para instalar todos los paquetes dentro de la aplicación en la raíz ejecutar el comando
```js
npm install
```

Para ejecutar la aplicación dentro de desarrollo es importante que instale el task runner llamado **Grunt**, en el siguiente enlace https://gruntjs.com/

```js
grunt
```

o si prefieres **Nodemon** adelante!.

```js
nodemon app
```

# Instalación del Software en el Servidor

Es importante instalar dentro del servidor donde se va a correr la aplicación el process manager de Nodejs llamado *pm2* globalmente, de la siguiente manera.

![pm2](https://user-images.githubusercontent.com/1715022/61544017-2ba2df80-aa0a-11e9-9ef8-da2faa1ec232.png)

```js
npm install pm2 -g
```

Cuando lo tengan instalado correctamente ir a la raíz de la aplicación y ejecutar el comando:

```js
pm2 start app.js
```
