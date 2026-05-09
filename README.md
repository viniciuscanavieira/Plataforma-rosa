# 🎓 Instituto Doksa - Integração Google Sheets

Integração funcional de formulário HTML com Google Sheets usando Google Apps Script.

> **Código pronto para produção** | Sem dependências externas | Documentação completa

---

## 📦 O que você recebe

```
✅ Backend funcionando (Google Apps Script)
✅ Frontend com validação (JavaScript puro)
✅ HTML integrado
✅ 5 arquivos de documentação
✅ Exemplos de resposta da API
✅ Diagrama de arquitetura
✅ Checklist de produção
```

---

## 🚀 Começar em 5 Minutos

### 1. **Google Sheets**
Crie uma planilha chamada "Instituto Doksa"

### 2. **Google Apps Script**
- Acesse script.google.com
- Novo projeto
- Cole o código de `google-apps-script.gs`
- Deploy como Web App ("Qualquer pessoa")

### 3. **Copiar URL**
Copie a URL gerada do deploy

### 4. **Configurar**
Cole a URL em `form-integration.js` → `const API_URL = "..."`

### 5. **Testar**
Preencha o formulário e veja os dados aparecerem na planilha

---

## 📁 Estrutura

```
Modelo Doksa/
├── doksa_landingpage2.html      # HTML (atualizado com <form>)
├── form-integration.js           # JavaScript front-end
├── google-apps-script.gs         # Código do Google Apps Script
│
└── Documentação/
    ├── README.md                 # Este arquivo
    ├── CHECKLIST_FINAL.md        # Checklist de produção
    ├── INTEGRAÇÃO_GOOGLE_SHEETS.md    # Guia completo passo a passo
    ├── CONFIGURAÇÃO_RÁPIDA.md         # Resumo executivo
    ├── EXEMPLOS_RESPOSTA_API.md       # Referência de respostas
    └── ARQUITETURA.md                 # Diagramas e fluxo
```

---

## 🎯 Recursos

### Front-end (form-integration.js)

- ✅ Validação de email
- ✅ Validação de telefone
- ✅ Campos obrigatórios
- ✅ Sanitização com trim()
- ✅ Fetch com POST
- ✅ Desabilitar botão durante envio
- ✅ Mensagens de sucesso/erro
- ✅ Função `testarConexaoAPI()` para debug

### Backend (google-apps-script.gs)

- ✅ Recebe dados JSON
- ✅ Validação dupla
- ✅ Conecta ao Google Sheets
- ✅ Cria cabeçalhos automaticamente
- ✅ Adiciona timestamp
- ✅ Retorna JSON de sucesso/erro
- ✅ Tratamento de erros com try-catch

### HTML (doksa_landingpage2.html)

- ✅ Form tag com ID
- ✅ Inputs com IDs corretos
- ✅ Script integrado
- ✅ Elementos de sucesso já configurados

---

## 📊 Fluxo de Dados

```
Usuário Preenche Form
    ↓
JavaScript Valida
    ↓
Fetch POST → Google Apps Script
    ↓
Apps Script Valida e Salva em Sheets
    ↓
Retorna JSON
    ↓
JavaScript Exibe Sucesso
    ↓
Dados Aparecem na Planilha
```

---

## 🔐 Segurança

| Aspecto | Implementado |
|---------|---|
| Validação email | ✅ |
| Validação telefone | ✅ |
| Campos obrigatórios | ✅ |
| Sanitização de inputs | ✅ |
| Impede múltiplos envios | ✅ |
| Try-catch backend | ✅ |
| Google Sheets auth | ✅ |

---

## 🧪 Como Testar

### Teste Rápido
1. Abra o site
2. Abra Console (F12)
3. Veja: `✓ Integração de formulário inicializada`

### Teste de Conexão
```javascript
// No console (F12):
testarConexaoAPI()
```

### Teste Completo
1. Preencha o formulário
2. Clique em "EU QUERO ESTUDAR"
3. Veja mensagem de sucesso
4. Verifique a planilha

---

## 📖 Documentação

### Para Iniciantes
→ Leia `CONFIGURAÇÃO_RÁPIDA.md`

### Passo a Passo Completo
→ Leia `INTEGRAÇÃO_GOOGLE_SHEETS.md`

### Entender a Arquitetura
→ Leia `ARQUITETURA.md`

### Referência de Respostas
→ Leia `EXEMPLOS_RESPOSTA_API.md`

### Checklist Final
→ Leia `CHECKLIST_FINAL.md`

---

## ⚠️ Erros Comuns

### "Erro ao conectar ao servidor"
```
❌ Causa: URL não configurada
✅ Solução: Copie a URL do deploy em form-integration.js
```

### "Campos obrigatórios faltando"
```
❌ Causa: Um campo está vazio
✅ Solução: Preencha todos os 3 campos
```

### Dados não aparecem na planilha
```
❌ Causa: Planilha não conectada ao Apps Script
✅ Solução: Execute testarIntegracao() no Apps Script
```

---

## 📈 Próximos Passos

1. ✅ Configurar URL da API
2. ✅ Testar tudo funcionando
3. ✅ Compartilhar o site
4. ✅ Monitorar respostas
5. ⭐ Melhorias futuras (CAPTCHA, email, etc)

---

## 💡 Customizações Possíveis

### Redirecionar para WhatsApp
```javascript
// form-integration.js, linha ~180
window.open("https://chat.whatsapp.com/SEU_LINK", "_blank");
```

### Adicionar Mais Campos
1. Adicione `<input>` no HTML
2. Valide em `form-integration.js`
3. Adicione ao `appendRow()` no Google Apps Script

### Enviar Email Automático
```javascript
// No google-apps-script.gs:
GmailApp.sendEmail(payload.email, "Bem-vindo!", "...");
```

---

## ✅ Checklist Rápido

- [ ] Google Sheets criado
- [ ] Google Apps Script deployado
- [ ] URL configurada em form-integration.js
- [ ] testarConexaoAPI() funciona
- [ ] Formulário envia dados
- [ ] Dados aparecem na planilha
- [ ] Testado em mobile
- [ ] Pronto para produção

---

## 📞 Suporte

### Problema?
1. Veja se está na documentação
2. Abra Console (F12) para erros
3. Execute `testarConexaoAPI()`
4. Verifique logs do Apps Script

### Quer customizar?
Todos os arquivos têm comentários explicativos. Personalize conforme necessário!

---

## 📊 Especificações

| Aspecto | Detalhe |
|---------|---------|
| Backend | Google Apps Script |
| Frontend | JavaScript Puro (ES6) |
| Storage | Google Sheets |
| Validação | Dupla (front + back) |
| Dependências | Nenhuma |
| Tamanho | ~40 KB (código) |
| Uptime | >99.9% (Google) |

---

## 🎉 Pronto!

Você tem tudo que precisa para:
- ✅ Receber pré-inscrições
- ✅ Armazenar dados
- ✅ Validar informações
- ✅ Escalar facilmente

**Status:** Pronto para Produção ✅

---

## 📝 Licença & Créditos

Código criado em 02/05/2026 para Instituto Teológico Doksa.

Totalmente customizável e extensível.

---

**Boa sorte! 🚀**

Para mais informações, consulte os arquivos de documentação.
