# 🚀 INSTRUCCIONES PARA DEPLOY A VERCEL

**Para Luis - Paso a paso muy simple**

---

## PASO 1: CREAR REPOSITORIO EN GITHUB

1. **Ir a:** https://github.com/new
2. **Nombre del repositorio:** `claude-voice-assistant`  
3. **Descripción:** `Interfaz de voz para Claude - ESM Argentina`
4. **Público:** ✅ Seleccionar
5. **Crear repositorio** (botón verde)

---

## PASO 2: SUBIR CÓDIGO A GITHUB

Ejecutar estos comandos en orden:

```bash
cd "D:\claude-voice-assistant"
git branch -M main
git remote set-url origin https://github.com/jefemza/claude-voice-assistant.git
git push -u origin main
```

*(Si pide credenciales de GitHub, usar tu usuario y token)*

---

## PASO 3: DESPLEGAR EN VERCEL

1. **Ir a:** https://vercel.com/new
2. **Conectar GitHub** (si no está conectado)
3. **Buscar repositorio:** `claude-voice-assistant`
4. **Click en "Import"**
5. **En "Environment Variables" agregar:**
   - **Name:** `VITE_ANTHROPIC_API_KEY`
   - **Value:** `[TU_API_KEY_DE_ANTHROPIC_AQUI]`
6. **Click "Deploy"**

---

## PASO 4: OBTENER URL FINAL

Vercel te dará una URL como:
`https://claude-voice-assistant-xxxxx.vercel.app`

**¡Esa es tu app funcionando en la web!**

---

## 🎯 CREDENCIALES PARA USAR

**Tu cuenta:** 
- Email: `luis@esm.com`
- Password: `ESMClaude2025!`

**Cuenta admin:**
- Email: `admin@esm.com` 
- Password: `AdminESM2025!`

---

## 📱 USO DESDE EL MÓVIL

1. **Abrir URL** en Chrome (móvil)
2. **Login** con tus credenciales
3. **Permitir micrófono** cuando pregunte
4. **Presionar y hablar** al botón micrófono
5. **Claude te responde por voz**

---

**¿Algún problema? Pregúntame cualquier duda.**