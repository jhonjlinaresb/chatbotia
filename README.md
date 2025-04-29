# ChatbotIA

Chat bot con IA para WhatsApp que interactúa con los usuarios, proporcionando respuestas a preguntas frecuentes sobre los servicios, horarios y ubicaciones de la Cámara de Comercio de Castellón.

## Descripción

Este proyecto tiene como objetivo crear un chatbot con inteligencia artificial para WhatsApp, capaz de analizar el contenido de la web de la Cámara de Comercio de Castellón y utilizar esa información para responder de forma eficiente a las consultas de los usuarios. El chatbot está diseñado para brindar asistencia 24/7, mantener la información actualizada y escalar las conversaciones a un asesor humano cuando sea necesario.

## Objetivo

Desarrollar un chatbot para WhatsApp que responda dudas frecuentes sobre los servicios de la Cámara de Comercio de Castellón, con un enfoque en formación, servicios y trámites administrativos. El chatbot debe ser capaz de proporcionar información actualizada, enviar notificaciones de eventos importantes (como fechas de cursos) y derivar a los usuarios a un asistente humano en caso de ser necesario.

## Características

- **Consultas generales:** Responde preguntas sobre horarios, ubicaciones y servicios de la Cámara.
- **Notificaciones:** Envía recordatorios y actualizaciones (como fechas de cursos y plazos).
- **Escalabilidad:** Los usuarios pueden escalar la conversación a un asesor humano si la consulta excede la base de datos.
- **Actualización constante:** El chatbot mantiene su base de conocimiento actualizada automáticamente a partir de la web de la Cámara.

## Tecnologías utilizadas

Este proyecto utiliza una combinación de tecnologías para el backend y el frontend:

- **Backend (Node.js):** 
  - **Axios:** Para realizar peticiones HTTP y obtener contenido de la página web.
  - **Cheerio:** Para analizar el contenido HTML y extraer los datos necesarios.
  - **Express:** Para crear el servidor de la API que maneja las peticiones de los usuarios y responde con la información relevante.
  
- **Frontend (React):**
  - **React.js:** Para crear una interfaz de usuario interactiva (en desarrollo).

## Cómo ejecutar los proyectos

### Backend (Node.js)

1. **Clonar el repositorio:**

    ```bash
    git clone https://github.com/jhonjlinaresb/chatbotia.git
    cd chatbotia/crawler
    ```

2. **Instalar dependencias:**

    ```bash
    npm install
    ```

3. **Ejecutar el scraper:**

    El script principal de scraping es `crawler.ts`. Puedes ejecutar el scraper con el siguiente comando:

    ```bash
    ts-node src/crawler.ts
    ```

    Este script extraerá los datos de la web de la Cámara de Comercio de Castellón, los procesará y los guardará en un archivo JSON en la carpeta `output`.

### Frontend (React)

1. **Ir al directorio del frontend:**

    ```bash
    cd chatbotia/frontend
    ```

2. **Instalar dependencias:**

    ```bash
    npm install
    ```

3. **Ejecutar la aplicación:**

    ```bash
    npm start
    ```

    Esto iniciará el servidor de desarrollo de React en `http://localhost:3000`.

## Lo que estoy trabajando y lo que voy añadiendo

### Proyecto en Progreso

- Actualmente, el scraper utiliza **Axios** y **Cheerio** para extraer datos de la web de la Cámara de Comercio de Castellón. Este scraper está funcionando, pero hay planes de mejorarlo utilizando **Puppeteer** en el futuro, ya que puede manejar mejor el contenido dinámico.
- Se han mejorado los scripts para extraer información relevante como títulos, enlaces y descripciones.
- Se está desarrollando la integración con la API de WhatsApp para permitir que el chatbot interactúe con los usuarios.

### Cambios recientes

- Se añadió la funcionalidad para guardar la información extraída en archivos JSON de forma automática.
- Se mejoró la estructura de los datos extraídos para incluir títulos, párrafos y enlaces.
- Se está trabajando en la integración con la API de WhatsApp para enviar las respuestas del chatbot a los usuarios.

## Mejoras del scraping y pruebas con Puppeteer

Por ahora, el scraping con **Axios** y **Cheerio** está funcionando, pero hay ciertos casos donde no captura correctamente el contenido dinámico de la página. **Puppeteer** va a ser la solución en el futuro, ya que es más eficiente para lidiar con contenido que se carga de manera asíncrona (como las cosas que se cargan después de que la página ya ha cargado).

En cuanto esté implementado **Puppeteer**, quiero probarlo para ver si mejora la extracción de datos, especialmente con el contenido que no se carga de inmediato. Aquí van algunas notas para tener en cuenta cuando lo haga:

### Pasos para probar el scraping con Puppeteer

- **Instalar Puppeteer**: Asegúrate de tener Puppeteer en el proyecto.

    ```bash
    npm install puppeteer
    ```

- **Actualizar el script** para usar Puppeteer en lugar de Axios y Cheerio, de esta forma:

    ```typescript
    import puppeteer from 'puppeteer';

    async function scrapeWithPuppeteer() {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://www.camaracastellon.com/es/');
      const content = await page.content();
      console.log(content); // Ver cómo se obtiene todo el HTML
      await browser.close();
    }

    scrapeWithPuppeteer();
    ```

- **Ejecutar y probar** el scraper: El objetivo es ver si la extracción mejora con Puppeteer y si conseguimos capturar más contenido dinámico que antes.

---

### Próximos Pasos

- Mejorar la integración de Puppeteer para capturar todo el contenido de la página.
- Crear pruebas unitarias para el scraping y la extracción de datos.
- Integrar el backend con la API de WhatsApp para responder preguntas de los usuarios.

## Equipo

- **Sonia Cervera** y **Javier Amad** están disponibles para brindar soporte durante el proceso de desarrollo a través de Telegram.

---

Este es un trabajo en progreso, por lo que continuamente se agregarán nuevas características y mejoras. ¡Gracias por tu interés!