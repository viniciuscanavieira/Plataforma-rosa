# 📋 Guia de Integração: Google Sheets + Formulário HTML

## 🚀 Passo a Passo de Configuração

### **PASSO 1: Criar Planilha no Google Sheets**

1. Acesse [Google Sheets](https://sheets.google.com)
2. Clique em "Criar uma nova planilha"
3. Nomeie como "Instituto Doksa - Pré-inscrições"
4. **Não altere nada na planilha** — o script cria os cabeçalhos automaticamente

---

### **PASSO 2: Criar Google Apps Script**

1. Acesse [Google Apps Script](https://script.google.com)
2. Clique em "Novo projeto"
3. Cole **TODO O CONTEÚDO** do arquivo `google-apps-script.gs`
4. Salve pressionando `Ctrl+S`
5. Dê um nome ao projeto (ex: "Integração Doksa")

---

### **PASSO 3: Conectar Planilha ao Script**

1. No Google Apps Script, clique em "Projeto" (lado esquerdo) > "Configurações"
2. Copie o **ID do projeto**
3. Volte ao Google Sheets
4. Clique em "Extensões" > "Apps Script"
5. Cole o ID do projeto quando solicitado
6. **Conecte a planilha ao script**

**Ou mais fácil:**
- No Google Apps Script, clique em "Executar" > "testarIntegracao"
- Ele vai pedir permissão — autorize
- Na primeira vez, ele vai criar as colunas na planilha

---

### **PASSO 4: Deploy como Web App**

1. No Google Apps Script, clique em **"Deploy"** (botão azul)
2. Clique em **"New deployment"**
3. Tipo: **"Web app"**
4. Execute como: **Sua conta Google**
5. Quem tem acesso: **"Qualquer pessoa"**
6. Clique em **"Deploy"**
7. Uma URL será gerada → **COPIE ESSA URL**

Exemplo de URL:
```
https://script.google.com/macros/s/AKfycbw1a2b3c4d5e6f7g8h9i0j/usercontent
```

---

### **PASSO 5: Configurar JavaScript Front-end**

1. Abra o arquivo `form-integration.js`
2. Procure pela linha:
```javascript
const API_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/usercontent";
```

3. **Substitua `YOUR_DEPLOYMENT_ID`** pela URL do seu Deploy
4. Exemplo final:
```javascript
const API_URL = "https://script.google.com/macros/s/AKfycbw1a2b3c4d5e6f7g8h9i0j/usercontent";
```

---

### **PASSO 6: Incluir Script no HTML**

O arquivo `doksa_landingpage2.html` já tem a integração, mas certifique-se:

✅ **Existe a tag `<form id="formulario-doksa">`** ao redor dos campos
✅ **Os IDs dos campos estão corretos:**
   - `id="fn"` para Nome
   - `id="fe"` para Email
   - `id="fw"` para Telefone
   - `class="form-submit"` para o botão

✅ **O script está incluído antes de `</body>`:**
```html
<script src="form-integration.js"></script>
```

---

## ✅ Testando a Integração

### **Teste 1: Verificar Console**
1. Abra o site no navegador
2. Pressione `F12` (Developer Tools)
3. Vá para a aba "Console"
4. Você deve ver:
```
✓ Integração de formulário inicializada
```

### **Teste 2: Testar Conexão**
No console, execute:
```javascript
testarConexaoAPI()
```

Você deve ver:
```
✓ API conectada com sucesso!
```

### **Teste 3: Enviar Formulário Real**
1. Preencha o formulário com dados de teste
2. Clique em "EU QUERO ESTUDAR"
3. Você deve ver a mensagem de sucesso
4. Verifique se os dados apareceram na planilha do Google Sheets

---

## 🔍 Troubleshooting

### **"Erro ao conectar ao servidor"**
- Verifique se a URL da API foi copiada corretamente
- Certifique-se de que fizQuiz o Deploy como "Web app"
- Verifique se "Quem tem acesso" está como "Qualquer pessoa"

### **"Campos obrigatórios faltando"**
- Verifique se todos os IDs dos inputs estão corretos
- Certifique-se de que está preenchendo todos os campos

### **Dados não aparecem na planilha**
- Verifique se a planilha está aberta quando você faz o teste
- Veja se há erros no console do navegador
- Verifique os logs do Google Apps Script: Apps Script > Execuções

### **"Erro: Usuário não autorizado"**
- Faça logout e login novamente no Google
- Refaça o Deploy
- Certifique-se de que "Quem tem acesso" é "Qualquer pessoa"

---

## 📊 O que é Enviado para a Planilha

Cada linha conterá:
| Timestamp | Nome | Email | Telefone |
|-----------|------|-------|----------|
| 02/05/2026 10:30:00 | João Silva | joao@example.com | (11) 99999-8888 |

---

## 🔐 Segurança

✅ **Validações implementadas:**
- Campos obrigatórios
- Validação de email
- Validação de telefone
- Sanitização com `trim()`
- Impede múltiplos envios simultâneos

⚠️ **Melhorias futuras:**
- Implementar CAPTCHA
- Rate limiting por IP
- Validação de domínio de email
- Encriptação dos dados

---

## 📁 Arquivos Necessários

```
Modelo Doksa/
├── doksa_landingpage2.html     (HTML principal - JÁ MODIFICADO)
├── form-integration.js         (Script front-end)
├── google-apps-script.gs       (Código do Apps Script)
└── img/
    └── Osiel.png
```

---

## 🎯 Próximos Passos

1. ✅ Fazer todos os Passos 1-6 acima
2. ✅ Testar a integração
3. ✅ Compartilhar o formulário
4. ✅ Monitorar respostas na planilha do Google Sheets

---

## 📞 Suporte

Se algo não funcionar:
1. Abra o Console (`F12`)
2. Copie todos os erros
3. Verifique este guia novamente
4. Procure a seção de Troubleshooting

---

**Criado:** 02/05/2026
**Status:** Pronto para uso em produção
