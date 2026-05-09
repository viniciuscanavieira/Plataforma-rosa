# 🚨 DEBUG: Problema de Conexão com API

## ❌ Erro Relatado
```
Erro: Erro ao conectar ao servidor. Verifique a URL da API.
```

## 🔍 Diagnóstico

### 1. Verifique a URL da API
Abra `form-integration.js` e confirme se a `API_URL` está correta:

```javascript
const API_URL = "https://script.google.com/macros/s/.../exec";
```

### 2. Teste Direto no Navegador
1. Abra uma nova aba no navegador
2. Cole a URL da API (a mesma de `API_URL`)
3. Deve aparecer algo como:
```json
{"success":true,"message":"Google Apps Script ativo. GET OK.","timestamp":"2026-05-02T..."}
```

**Se não aparecer:**
- ❌ Deploy não foi feito
- ❌ URL incorreta
- ❌ Acesso não é público

### 3. Teste no Console
Abra o console (F12) e execute:
```javascript
testarConexaoAPI()
```

Isso fará 2 testes:
- GET simples
- POST com dados

## 🔧 Soluções Possíveis

### Problema: "CORS policy" no console
**Solução:**
1. Vá para script.google.com
2. Abra seu projeto
3. Clique em "Deploy" > "New Deployment"
4. Tipo: "Web app"
5. Execute como: sua conta
6. **Quem tem acesso: "Qualquer pessoa"**
7. Deploy e copie a nova URL
8. Atualize `API_URL` em `form-integration.js`

### Problema: "Failed to fetch"
**Solução:**
- Verifique se a URL termina com `/exec`
- Confirme se não há espaços ou caracteres especiais
- Teste a URL diretamente no navegador

### Problema: Status 403 ou 404
**Solução:**
- Refaça o deploy do Google Apps Script
- Certifique-se de que é "Web app", não "API executable"

## 🧪 Teste Final

Após corrigir:

1. **Teste direto:** Abra a URL no navegador
2. **Teste console:** Execute `testarConexaoAPI()`
3. **Teste formulário:** Preencha e envie

Se ainda não funcionar, compartilhe os logs do console para diagnóstico.