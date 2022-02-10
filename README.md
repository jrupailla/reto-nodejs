# Documentación de uso

## Caracteristicas

- Traducir los modelos de StarWars API de cualquier endpoint del ingles al español
- Gestión de empleados (CRUD) utilizando la base de datos DynamoDB

## Traducir los modelos de StarWars API

Para este servicio se ha utilizado el traductor de AWS lo cual permite traducir los textos del ingles al español y puede hacerse de cualquier endpoint proporcionado por StarWars API, algunos endpoints de ejemplo son:

| Servicio | Endpoint |
| ------ | ------ |
| People | <https://swapi.py4e.com/api/people/1/> |
| Films | <https://swapi.py4e.com/api/films/1/> |
| Starships | <https://swapi.py4e.com/api/starships/9/> |
| Vehicles | <https://swapi.py4e.com/api/vehicles/4/> |
| Species | <https://swapi.py4e.com/api/species/3/> |
| Planets | <https://swapi.py4e.com/api/planets/1/> |

El endpoint para consumir dicho servico es el siguiente:

| Operación | Endpoint | Metodo | Body |
| ------ | ------ | ------ | ------ |
| Traducir | <https://{aws-serverless-endpoint}/translate/endpoint> | POST | ``` { "url_endpoint": "https://swapi.py4e.com/api/planets/1"}``` |

## Gestión de emplados (CRUD)

Para este servicio se ha utilizado la base de datos DynamoDB, lo cual permite gestionar a los empleados mediante las operaciones de crear, actualizar, eliminar, listar los empleados y buscar un empleado.

| Operación | Endpoint | Metodo | Body | Query |
| ------ | ------ | ------ | ------ | ------ |
| Crear | <https://{aws-serverless-endpoint}/employe/insert> | POST | ``` { "employeId": "U19201985", "name": "Jhon","lastName": "Rupailla","documentNumber": "75263452","address": "Av. Perú","email": "jrupailla@gmail.com","age": 24}``` |
| Actualizar | <https://{aws-serverless-endpoint}/employe/update> | PUT | ``` { "employeId": "U19201985", "name": "Jhon","lastName": "Perez","documentNumber": "96352481","address": "Av. Brasil","email": "jhonprueba01@gmail.com","age": 24}``` |
| Eliminar | <https://{aws-serverless-endpoint}/employe/delete?employeId=U19201985&name=Jhon> | DELETE | | ``` [{"key": "employeId", "value": "U19201985"},{"key": "name","value": "Jhon"}] ``` |
| Listar | <https://{aws-serverless-endpoint}/employe/list> | GET |
| Obtener | <https://{aws-serverless-endpoint}/employe/get?employeId=U19201985&name=Jhon> | GET | | ``` [{"key": "employeId", "value": "U19201985"},{"key": "name","value": "Jhon"}] ``` |

## Instalación

- Crear un usuarios IAM en AWS que tenga los permisos de Lamba, Dynamodb, ApiGateway, S3, EC2 y IAM.
- Instalar serverless globalmente y configurar las credenciales con el usuario generado en AWS (modificar el valor de **_profile_** en el archivo serverless.yml según sea su caso).
  ```npm install serverless --global```
- Instalar las dependencias del proyecto
  ```npm install```
- Probar que los funciones de serverless se despleguen correctamente de manera local y offline.
  ```npm run dev```
- Deplegar los servecios en AWS (modificar el valor de **_stage_** en el archivo serverless.yml según sea su caso)
  ```npm run prod```

##### Nota: La configuración de los enpoints se encuentra en la carpeta _postman_ del repositorio, lo cual puede ser utilizado para realizar las pruebas de los endpoints en la aplicación Postman.