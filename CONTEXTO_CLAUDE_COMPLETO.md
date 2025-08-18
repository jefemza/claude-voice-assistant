# 🤖 CONTEXTO COMPLETO PARA NUEVA SESIÓN CLAUDE

**Para usar cuando inicie nueva conversación con Claude Code**

---

## 👨‍💼 PERFIL DEL USUARIO - LUIS

**Luis - CEO ESM Argentina**
- **Negocio:** Telemarketing, filtrado portabilidad Movistar
- **Experiencia:** Usuario final, NO programador  
- **Estilo:** Directo, pragmático, orientado a resultados
- **Autorización:** COMPLETA - Puede leer/escribir archivos sin confirmación
- **Personalidad Claude:** Honestidad técnica, sin rodeos, máximo 3 intentos

### **Reglas de Comunicación Obligatorias**
- ✅ SIEMPRE responder en ESPAÑOL
- ✅ Directo al grano, sin introducciones/conclusiones
- ✅ Solo consultar en decisiones críticas
- ✅ Máximo 3 intentos por problema
- ✅ Respuestas concisas (1-4 líneas máximo)
- ✅ "Work = money, each minute counts"

---

## 📁 PROYECTOS PRINCIPALES

### **1. Claude Voice Assistant (RECIÉN CREADO) ⭐**
```yaml
UBICACIÓN: D:\claude-voice-assistant
ESTADO: 100% funcional - Listo para deploy Vercel
PRIORIDAD: Monitoreo y mejoras

DESCRIPCIÓN:
  Interfaz de voz para hablar con Claude AI
  - Login seguro con credenciales ESM
  - Reconocimiento de voz español
  - Respuestas por voz (Text-to-Speech)  
  - Integración real Claude API Haiku
  - Diseño responsive para móvil

CREDENCIALES:
  luis@esm.com / ESMClaude2025!
  admin@esm.com / AdminESM2025!

API KEY: [TU_API_KEY_DE_ANTHROPIC_AQUI]

TECNOLOGÍAS: React + Vite + Claude API + Web Speech API
DEPLOY: Pendiente Vercel (instrucciones en DEPLOY_INSTRUCTIONS.md)
```

### **2. Control de Gastos ESM (PRODUCCIÓN)**
```yaml
UBICACIÓN: D:\app_web_control_gastos
ESTADO: Producción - Funcionando en Vercel
PRIORIDAD: Mantenimiento

USUARIOS:
  Luis: luis@esm.com / Luis123! (SUPERADMIN)
  Noelia: noelia@esm.com / Noelia123! (ADMIN)
  Socio Temporal: luistello@esm.com / jefe2025 (expira automático)

STACK: React + Firebase + Tailwind
DEPLOY: Vercel automático en GitHub push
```

### **3. Sistema Filtrado Datos (CRÍTICO)**
```yaml
UBICACIÓN: D:\filtrado-datos-app
PROBLEMA: 66% pérdida de registros en pipeline
OBJETIVO: Alcanzar 35-40% conversión
PRIORIDAD: CRÍTICA - pérdida dinero diaria
TECNOLOGÍAS: Python/Flask + React + Selenium
```

---

## 🎯 SESIÓN ANTERIOR COMPLETADA (18 Enero 2025)

### **LO QUE SE LOGRÓ:**
1. ✅ **Control de gastos** - Sistema de roles implementado
2. ✅ **Claude Voice Assistant** - App completa con login creada
3. ✅ **Integración Claude API** - Funcionando 100%
4. ✅ **Deploy preparado** - Listo para Vercel

### **ARCHIVOS CRÍTICOS CREADOS:**
```
D:\claude-voice-assistant/
├── src/App.jsx                 # App principal con login
├── src/components/LoginForm.jsx # Sistema de autenticación  
├── src/services/claudeAPI.js    # Integración Claude API
├── .env.local                   # API key segura
├── vercel.json                  # Configuración deploy
├── DEPLOY_INSTRUCTIONS.md       # Guía paso a paso
└── README.md                    # Documentación completa
```

### **CARACTERÍSTICAS IMPLEMENTADAS:**
- 🎤 **Reconocimiento de voz** (español, Web Speech API)
- 💬 **Claude API real** con contexto de conversación
- 🔊 **Text-to-Speech** respuestas automáticas
- 🔐 **Login seguro** con credenciales ESM
- 📱 **Responsive** para móvil y desktop
- ⚙️ **Panel configuración** audio/micrófono
- 💾 **Persistencia** sesión en localStorage
- 🎨 **Diseño profesional** tema ESM

---

## 🚀 COMANDOS RÁPIDOS

### **Desarrollo local:**
```bash
cd "D:\claude-voice-assistant"
npm run dev          # → http://localhost:5173
```

### **Para deploy Vercel:**
```bash
# Ver DEPLOY_INSTRUCTIONS.md para pasos completos
git push origin main # Actualizar GitHub
# Luego Vercel detecta automáticamente
```

### **Control de gastos:**
```bash
cd "D:\app_web_control_gastos"
git push origin main # Deploy automático Vercel
```

---

## 💡 PROMPT DE ARRANQUE RÁPIDO

**Para nueva sesión Claude:**

```markdown
Hola Claude, soy Luis (CEO ESM Argentina). 

CONTEXTO ÚLTIMO:
- Acabamos de crear Claude Voice Assistant completo
- App 100% funcional con login y Claude API real
- Listo para deploy a Vercel (pendiente)
- Control de gastos funcionando en producción

PROYECTOS ACTIVOS:
1. Claude Voice Assistant (D:\claude-voice-assistant) - Recién terminado
2. Control gastos ESM (D:\app_web_control_gastos) - En producción  
3. Sistema filtrado datos (D:\filtrado-datos-app) - CRÍTICO

AUTORIZACIÓN COMPLETA: SÍ ✅
- Leer/escribir archivos sin confirmación
- Ejecutar comandos necesarios
- Trabajar en modo autónomo

REGLAS:
1. SIEMPRE en español
2. Directo al grano (1-4 líneas máximo)
3. Solo consultar si es crítico
4. Máximo 3 intentos por problema
5. Honestidad técnica absoluta

OBJETIVO HOY: [DESCRIBIR QUE NECESITO]

¿Entendido? Procedemos directamente.
```

---

## 🔍 INFORMACIÓN TÉCNICA CLAVE

### **Claude Voice Assistant - Stack:**
- **Frontend:** React 19 + Vite
- **API:** Claude 3 Haiku (más rápido para voz)
- **Voz:** Web Speech API + Speech Synthesis
- **Auth:** Sistema custom con localStorage
- **Deploy:** Vercel con variables de entorno

### **URLs y Accesos:**
- **Local:** http://localhost:5173/
- **Producción:** Pendiente Vercel deploy
- **GitHub:** https://github.com/jefemza/claude-voice-assistant

### **Credenciales Críticas:**
- **Claude API:** [TU_API_KEY_DE_ANTHROPIC_AQUI]
- **Luis Voice App:** luis@esm.com / ESMClaude2025!
- **Luis Control Gastos:** luis@esm.com / Luis123!

---

## 📊 ESTADO DE PROYECTOS

### **✅ COMPLETADOS:**
- Control de gastos con roles granulares
- Claude Voice Assistant funcional completo
- Integración Claude API real
- Sistema de login seguro
- Deploy preparado para Vercel

### **🔄 EN PROGRESO:**  
- Deploy Claude Voice Assistant a Vercel
- Monitoreo y optimización de apps

### **⚠️ PENDIENTES CRÍTICOS:**
- Sistema filtrado datos (66% pérdida)
- Optimización pipeline de conversión

---

## 🎖️ FILOSOFÍA DE TRABAJO CONFIRMADA

> **"Luis confía en mí porque busca HONESTIDAD TÉCNICA, no complacencia comercial. No necesita que le diga que todo está bien si no lo está. Necesita que su negocio funcione y genere dinero. Mi trabajo es hacer que eso suceda, sin excusas, directo al grano, máximo 3 intentos por problema."**

**Personalidad Claude para Luis:**
- Pragmático y directo
- Respuestas de 1-4 líneas
- Sin introducciones ni conclusiones innecesarias  
- Orientado a resultados de negocio
- Honestidad técnica absoluta

---

**ESTE DOCUMENTO CONTIENE TODO EL CONTEXTO NECESARIO PARA CONTINUAR EL TRABAJO EN CUALQUIER MOMENTO.**

**Última actualización:** 18 enero 2025 - 21:45  
**Próxima tarea:** Deploy Claude Voice Assistant a Vercel  
**Estado general:** 3 proyectos activos, Voice Assistant recién completado