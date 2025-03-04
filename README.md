# SpaceX Launches Tracker

Este repositorio contiene el código fuente completo de la aplicación **SpaceX Launches Tracker**, que se compone de dos partes principales:

- **Frontend:** Aplicación web desarrollada con React, Tailwind CSS y otras tecnologías modernas.
- **Backend:** Sistema serverless en AWS (con funciones Lambda, API Gateway y DynamoDB) que provee datos actualizados sobre lanzamientos de SpaceX.

Cada uno de estos directorios incluye su propia documentación detallada sobre estructura, dependencias, configuración y despliegue.

## Contenido del Repositorio

- **/frontend:**  
  Contiene la aplicación web. Consulta el README interno para detalles sobre el entorno de desarrollo, dependencias, estructura del proyecto y despliegue (incluyendo Docker y AWS ECS Fargate).

- **/backend:**  
  Incluye la implementación serverless, con funciones Lambda, configuración de DynamoDB y la API expuesta a través de API Gateway. Revisa el README correspondiente para información detallada sobre endpoints, arquitectura y despliegue en AWS.

## Deploy en Producción

- **PUBLIC API:** [http://54.211.69.43/](http://54.211.69.43/)
- **API URL:** [https://yvbhy6682b.execute-api.us-east-1.amazonaws.com/prod/](https://yvbhy6682b.execute-api.us-east-1.amazonaws.com/prod/)

## Notas Generales

- Se ha optado por una arquitectura modular para separar las responsabilidades del frontend y backend.
- Cada componente cuenta con una documentación interna a profundidad para facilitar su mantenimiento y escalabilidad.
- Las instrucciones de despliegue, configuración de entorno y dependencias están incluidas en los respectivos directorios.

## Autor y Licencia

**Sebastian Ballen C** – *Frontend Developer*  
[LinkedIn](https://www.linkedin.com/in/sebastianballencastaneda-softwaredeveloper) | sebastian.ballenc@gmail.com

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).
