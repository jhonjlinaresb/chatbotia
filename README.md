# 🤖 ChatBotIA – Cámara Comercio Castellón

Un chatbot inteligente basado en WhatsApp Cloud API + OpenAI, desarrollado para mejorar la atención ciudadana y difundir cursos, ayudas y servicios ofrecidos por la Cámara de Comercio de Castellón.

Este proyecto tiene como objetivo crear un chatbot con inteligencia artificial para WhatsApp, capaz de analizar el contenido de la web de la Cámara de Comercio de Castellón y utilizar esa información para responder de forma eficiente a las consultas de los usuarios. El chatbot está diseñado para brindar asistencia 24/7, mantener la información actualizada y escalar las conversaciones a un asesor humano cuando sea necesario.

---

## 🧠 Objetivo

Desarrollar un chatbot para WhatsApp que responda dudas frecuentes sobre los servicios de la Cámara de Comercio de Castellón, con un enfoque en formación, servicios y trámites administrativos. El chatbot debe ser capaz de proporcionar información actualizada, enviar notificaciones de eventos importantes y derivar a los usuarios a un asistente humano en caso de ser necesario.

---

## ✨ Características

* **Consultas generales**: Responde preguntas sobre horarios, ubicaciones y servicios de la Cámara.
* **Notificaciones**: Envía recordatorios y actualizaciones (como fechas de cursos y plazos).
* **Escalabilidad**: Los usuarios pueden escalar la conversación a un asesor humano si la consulta excede la base de datos.
* **Actualización constante**: El chatbot mantiene su base de conocimiento actualizada automáticamente a partir de la web de la Cámara.
* **Análisis y gestión de URLs**: El scraper analiza automáticamente las URLs internas de la web objetivo, las guarda en un archivo `urls.txt` y las mantiene actualizadas para su posterior procesamiento.

---

## 🛠️ Tecnologías utilizadas

* Node.js, TypeScript, Express, MongoDB
* Puppeteer (scraper)
* dotenv, fs, path
* OpenAI API (GPT)
* WhatsApp Cloud API (Meta)
* React.js (Frontend, en desarrollo)

---

## ⚙️ Instalación paso a paso

### 1. Clonar el repositorio

```bash
git clone https://github.com/jhonjlinaresb/chatbotia.git
cd chatbotia/backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar el archivo `.env`

Crea un archivo `.env` con este contenido:

```env
MONGODB_URI=mongodb://localhost:27017
PORT=3001
OPENAI_API_KEY=tu_clave_de_openai
WHATSAPP_PHONE_ID=tu_id_phone_de_meta
WHATSAPP_TOKEN=tu_token_de_meta
WHATSAPP_SUPPORT_NUMBER=+346XXXXXXXX
CRAWLER_DATA_PATH=./crawler/output/pages
CRAWLER_SCRIPT=ts-node ../crawler/src/index.ts
LOAD_SCRIPT=ts-node src/services/loadData.ts
```

⚠️ Requiere un token válido de Meta con permisos `whatsapp_business_messaging` y `whatsapp_business_management`.

---

### 4. Ejecutar el scraper

```bash
cd chatbotia/crawler
ts-node src/index.ts
```

---

### 5. Cargar datos a la base de datos

```bash
cd chatbotia/backend
npm run load:data
```

---

### 6. Ejecutar el servidor

```bash
npm run dev
```

---

### 7. Exponer el webhook (usando ngrok)

```bash
ngrok http 3001
```

- Copia la URL que te da ngrok (ej: `https://xxxx.ngrok-free.app`)
- Regístrala en el [panel de desarrolladores de Meta](https://developers.facebook.com/apps/) > Webhooks

> Ruta del webhook: `/api/whatsapp/webhook`  
> Token de verificación: `my_verify_token`

---

## 🧪 ¿Cómo probar el bot?

1. Asegúrate de tener el servidor encendido
2. Inicia conversación desde WhatsApp con este enlace:

👉 [https://wa.me/34641207192](https://wa.me/34641207192)

⚠️ El bot no está en producción permanente. Solicita acceso contactando con el desarrollador.

---

## 🔄 Flujo del Scraper

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
         | (títulos, párrafos, listas)    |
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

## 🧩 Estructura del Proyecto

```
chatbotia/
├── backend/
│   ├── src/
│   ├── services/
│   ├── routes/
│   └── index.ts
├── crawler/
│   └── src/index.ts
├── frontend/ (en progreso)
└── .env
```

---

## 🪪 Licencia

Este proyecto ha sido desarrollado por **Jhon Jairo Linares** en el marco del Hackathon Cámara Castellón 2025.

Se cede el derecho de uso, modificación y explotación del mismo a los organizadores del Hackathon, a la Cámara de Comercio de Castellón y a sus socios, incluyendo fines comerciales, siempre que se reconozca la autoría original.

El autor mantiene sus derechos morales sobre la obra, y cualquier uso externo fuera del ecosistema del Hackathon y sus entidades vinculadas requerirá autorización previa por escrito.

Esta cesión incluye:
- Uso institucional y comercial por parte de los organizadores, patrocinadores y socios del Hackathon
- Uso en productos, servicios o iniciativas derivadas del proyecto

---

## 👨‍💻 Autor y contacto

* Desarrollado por:  
👨‍💻 **Jhon Linares** – Ingeniero de Software Jr.  
🔗 [LinkedIn: linkedin.com/in/jhonlinares](https://www.linkedin.com/in/jhonlinares/)  
📧 Correo: jhonjlinaresb@gmail.com 
🌐 GitHub: [jhonjlinaresb](https://github.com/jhonjlinaresb)  
📱 WhatsApp: [https://wa.me/34641207192](https://wa.me/34641207192)