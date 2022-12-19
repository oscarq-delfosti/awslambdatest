# Tokenización de tarjetas con Node - DynamoDB - AWS Lambda

## Uso


### Desarrollo local

- Para levantar este proyecto en un entorno local primero se debe instalar AWS CLI, consulte [Interfaz de línea de comandos de AWS](https://aws.amazon.com/es/cli/).
- Luego de instalar AWS CLI debe configurar las credenciales con un usuario AWS IAM. Deberá abrir una línea de comandos e ingresar lo siguiente:

```bash
aws configure
```

Este le pedirá el ACCESS_KEY y SECRET_ACCESS de su usuario.

- Luego de realizar las configuraciones de AWS deberá instalar globalmente el framework [Serverless](https://www.serverless.com/framework/docs/getting-started):

```bash
npm install -g serverless
``` 

- Luego de instalar el framework [Serverless](https://www.serverless.com/framework/docs/getting-started) deberá configurar base de datos DynamoDB en el archivo serverless.yml. Para esto
deberá crear la tabla "CardTable" desde el panel de "AWS/DynamoDB" e ingresar a la configuración para obtener el "Nombre de recurso de Amazon (ARN)":

```
provider:
  iamRoleStatements:
    - Effect: Allow
      Action: 
        - dynamodb:*
      Resource: [YOUR_ARN]
```

- Luego de instalar la tabla de AWS/DynamoDB en su proyecto deberá instalar los paquetes usados para el desarrollo de este proyecto con el siguiente comando: 
```bash
npm install
```

- Y finalmente prodrá iniciar el proyecto en un servidor local con el comando: 

```bash
npm run dev
```

### Test

Para ejecutar las pruebas unitarias de esta aplicación solo deberá ejecutar el comando:

```bash
npm run test
```

### Despliegue

```
$ npm run deploy
```

Después de la implementación, debería ver un resultado similar a:

```bash
Deploying aws-node-http-api-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-http-api-project-dev (152s)

endpoint: GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  hello: aws-node-http-api-project-dev-hello (1.9 kB)
```

_Nota_: En su forma actual, después de la implementación, su API es pública y cualquiera puede invocarla. Para implementaciones de producción, es posible que desee configurar un autorizador. Para obtener detalles sobre cómo hacerlo, consulte [documentos de eventos http](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/).


