

# VENENVIO

Ejemplo de api del API de venenvio


## Tech Stack

⚒️ NextJS

🔮 MongoDB

💚 Node v21.0.0

## Estandares


- **Componentes:** Debe escribirse con **PascalCase**, Ej: **ButtonPrimary**.

- **Funciones:** Debe escribirse con **camelCase**, por ejemplo **getUsers.tsx**

- **Variables locales:** Debe escribirse con **camelCase**, por ejemplo **userAdmin**

- **Variables globales:** Debe escribirse con **PascalCase**, por ejemplo **Admin**

- **Variables estaticas:** Debe escribirse con **SNAKE_CASE** **ENV_REPOSITORY**


## Despligue

```bash
# Instalación de paquetes
npm install

# Ejecución de la aplicación
npm run dev
```

## Estructura

```
📁src  
├───decorators
├───interfaces
├───modules
│   ├───auth
│   │   ├───controllers
│   │   ├───dto
│   │   ├───entities
│   │   ├───guards
│   │   │   └───strategy
│   │   ├───interfaces
│   │   ├───repository
│   │   └───services
│   ├───invitation
│   │   ├───controllers
│   │   ├───dto
│   │   ├───entities
│   │   ├───repository
│   │   └───services
│   ├───profile
│   │   ├───controllers
│   │   ├───dto
│   │   ├───entities
│   │   ├───repository
│   │   └───services
│   └───user
│       ├───controllers
│       ├───dto
│       ├───entities
│       ├───respository
│       └───services
├───s3
├───schemas
│   ├───invitation
│   ├───profile
│   ├───session
│   ├───user
│   └───validation-code
├───templates
│   └───emails
└───utils
```
