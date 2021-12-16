# Heroes of Argentum Client

Heroes of Argentum is a HTML5/Javascript Online RPG.

[Server code.](https://github.com/perkes/hoa-server)

### Running ###

To run the client it is necessary to host the 'client' folder in a http server, one program that enables you to do this is [http-server](https://github.com/indexzero/http-server).

### Client configuration ###

The server version, ip and port can be configured in the file 'config.json':

```json
{
    "version":"0.13.2",
    "ip":"127.0.0.1",
    "port":"8000"
}
```

### Client build ###

This step is not necessary, but it is recommended to transpile the code to es5 syntax to support older browsers, and to minify the code, you can achieve this by running the script 'build.sh' inside the bin folder.

### Hosting server ###

In addition to following the indications in the [server](https://github.com/perkes/hoa-server) readme, you should use [websockify](https://github.com/kanaka/websockify) to translate the client traffic from websockets to pure TCP.
