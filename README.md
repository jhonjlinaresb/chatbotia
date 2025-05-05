# ChatbotIA

Chatbot con IA para WhatsApp que interactúa con los usuarios, proporcionando respuestas a preguntas frecuentes sobre los servicios, horarios y ubicaciones de la Cámara de Comercio de Castellón.

---

### Descripción

Este proyecto tiene como objetivo crear un chatbot con inteligencia artificial para WhatsApp, capaz de analizar el contenido de la web de la Cámara de Comercio de Castellón y utilizar esa información para responder de forma eficiente a las consultas de los usuarios. El chatbot está diseñado para brindar asistencia 24/7, mantener la información actualizada y escalar las conversaciones a un asesor humano cuando sea necesario.

---

### Objetivo

Desarrollar un chatbot para WhatsApp que responda dudas frecuentes sobre los servicios de la Cámara de Comercio de Castellón, con un enfoque en formación, servicios y trámites administrativos. El chatbot debe ser capaz de proporcionar información actualizada, enviar notificaciones de eventos importantes (como fechas de cursos) y derivar a los usuarios a un asistente humano en caso de ser necesario.

---

### Características

* **Consultas generales**: Responde preguntas sobre horarios, ubicaciones y servicios de la Cámara.
* **Notificaciones**: Envía recordatorios y actualizaciones (como fechas de cursos y plazos).
* **Escalabilidad**: Los usuarios pueden escalar la conversación a un asesor humano si la consulta excede la base de datos.
* **Actualización constante**: El chatbot mantiene su base de conocimiento actualizada automáticamente a partir de la web de la Cámara.
* **Análisis y gestión de URLs**: El scraper analiza automáticamente las URLs internas de la web objetivo, las guarda en un archivo `urls.txt` y las mantiene actualizadas para su posterior procesamiento.

---

### Tecnologías utilizadas

Este proyecto utiliza una combinación de tecnologías para el backend y el frontend:

#### Backend (Node.js):

* **Puppeteer**: Para scraping de contenido dinámico y generación automática de `urls.txt`.
* **dotenv**: Para gestionar configuraciones mediante variables de entorno.
* **fs y path**: Para manipulación de archivos y rutas locales.
* **TypeScript**: Lenguaje principal del proyecto.
* **MongoDB**: Base de datos NoSQL para almacenar la información extraída.
* **Express**: Framework para construir la API RESTful.

#### Frontend (React):

* **React.js**: Para crear una interfaz de usuario interactiva (en desarrollo).

---

### Cómo ejecutar los proyectos

#### Backend (Node.js)

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/jhonjlinaresb/chatbotia.git
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Ejecutar el scraper**:

   El script principal del scraper se encuentra en crawler/src/index.ts. Antes de iniciar el backend, se debe ejecutar este script para extraer los datos de la web de la Cámara de Comercio de Castellón, analizar sus URLs internas, procesar el contenido y guardar los resultados en archivos JSON en la subcarpeta output. 
   Puedes ejecutar el scraper con el siguiente comando:

   ```bash
   cd chatbotia/crawler
   ts-node src/index.ts
   ```

   Este script extraerá los datos de la web de la Cámara de Comercio de Castellón, analizará sus URLs internas, procesará el contenido y guardará los resultados en archivos JSON dentro de una subcarpeta de `output`.

4. **Ejecutar el backend**:

   Una vez que el scraper haya terminado de ejecutar y los datos hayan sido guardados en la subcarpeta de `output`, puedes iniciar el servidor backend. Esto permitirá procesar esos datos y almacenarlos en la base de datos MongoDB.

   Ejecutar el siguiente comando para iniciar el backend:

   ```bash
   cd chatbotia/backend
   npm run dev
   ```
   Esto iniciará el servidor Express en http://localhost:3001, y aquí se podrá interactuar con la API para manejar los datos que han sido cargados desde el scraper y los guardará en la base de datos.

#### Frontend (React)

1. **Ir al directorio del frontend**:

   ```bash
   cd chatbotia/frontend
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Ejecutar la aplicación**:

   ```bash
   npm start
   ```

   Esto iniciará el servidor de desarrollo de React en `http://localhost:3000`.

---

### => Flujo del Scraper

```text
           +---------------------------+
           |    Inicio del Scraper     |
           +------------+--------------+
                        |
                        v
           +------------+--------------+
           |  Analiza la página raíz   |
           |   y detecta todas las     |
           |      URLs internas        |
           +------------+--------------+
                        |
                        v
          +-------------+--------------+
          |   Guarda y actualiza el    |
          | archivo `urls.txt` con las |
          |       URLs encontradas     |
          +-------------+--------------+
                        |
                        v
         +--------------+--------------+
         | Recorre cada URL de `urls.txt` |
         |  y extrae contenido relevante  |
         | (títulos, párrafos, listas, etc.) |
         +--------------+--------------+
                        |
                        v
         +--------------+--------------+
         | Guarda los resultados en    |
         | archivos JSON organizados   |
         |      por página web         |
         +--------------+--------------+
                        |
                        v
              +---------+---------+
              | Fin del proceso  |
              +------------------+
```

---

### Lo que estoy trabajando y lo que voy añadiendo

#### Proyecto en Progreso

* **Carga de datos a MongoDB**: Se implementó un servicio que carga los datos extraídos del crawler en una base de datos MongoDB.

* **API Backend**: Se están implementado endpoints para interactuar con los datos almacenados en la base de datos.

* **Gestión de URLs**: El scraper ahora guarda automáticamente las URLs descubiertas en el archivo urls.txt, que se actualiza y evita duplicados con cada ejecución.

* **Soporte para variables de entorno**: Se añadió la capacidad de configurar la ubicación del archivo urls.txt mediante la variable de entorno URLS_FILE_PATH.
* **Refactorización del manejo de errores en el scraper**: Se ha mejorado la estructura del código para manejar errores en las solicitudes HTTP de manera más clara y eficiente. Ahora se utiliza un método auxiliar ConsoleError que facilita la gestión de errores de manera centralizada.
* **Scraping optimizado**: El scraper se ha refactorizado utilizando Puppeteer para una mayor flexibilidad al manejar contenido dinámico, mejorando la precisión y la eficiencia del scraping.
* Se han mejorado los scripts para extraer información relevante como títulos, enlaces y descripciones.
* Se está desarrollando la integración con la API de WhatsApp para permitir que el chatbot interactúe con los usuarios.

---

### Cambios recientes

`Proyecto Backend`

* Se ha creado un nuevo módulo para la conexión con MongoDB y la carga de datos desde los archivos JSON generados por el scraper.
* Se implementó una nueva funcionalidad en el backend para cargar automáticamente los datos extraídos por el scraper a la base de datos MongoDB.
* Se añadió la lógica para conectar a MongoDB, leer los archivos de datos generados por el scraper y almacenarlos en la base de datos.
* El backend ahora incluye un script de carga de datos (`loadData.ts`), que lee los archivos JSON generados en la carpeta `crawler/output`, los procesa y los inserta en la colección de MongoDB.
* Se ha mejorado la estructura del código, separando la lógica de conexión a la base de datos y la carga de los datos del scraper en módulos diferentes.
* Se refactorizó la gestión de errores para proporcionar una mayor claridad en el manejo de fallos durante el proceso de conexión a la base de datos y carga de datos.
* El backend está ahora preparado para recibir y servir los datos a través de una API RESTful, permitiendo a los usuarios acceder a la información cargada desde la base de datos.
* Se ha actualizado el archivo `server.ts` y se ha creado una nueva estructura de carpetas para una mejor organización del proyecto.


`Proyecto Crawler`

* Se refactorizó el scraper y se eliminó el código redundante en `scraper.ts` y `parser.ts`.
* Se optimizó el manejo de errores global y se mejoró la estructura del código.
* Se añadió la funcionalidad para guardar la información extraída en archivos JSON en una subcarpeta `/pages`.
* Se mejoró la extracción de datos dinámicos utilizando Puppeteer para manejar mejor los contenidos cargados por JavaScript.
* Se implementó un sistema de análisis y actualización automática del archivo `urls.txt` a partir del rastreo interno del sitio web objetivo.

---

### Próximos pasos

* Crear base de datos para almacenar la información extraída.
* Crear API para pasar la información de JSON a base de datos.
* Integrar el backend con la API de OpenAI.
* Crear pruebas unitarias para el scraping y la extracción de datos.
* Integrar el backend con la API de WhatsApp para responder preguntas de los usuarios.

---

### Equipo

* **Sonia Cervera** y **Javier Amad** están disponibles para brindar soporte durante el proceso de desarrollo a través de Telegram.

---

Este es un trabajo en progreso, por lo que continuamente se agregarán nuevas características y mejoras. ¡Gracias por tu interés!
