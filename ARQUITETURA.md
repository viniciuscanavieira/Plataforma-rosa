# 📊 Arquitetura da Integração Google Sheets

## Fluxo Completo de Dados

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         USUÁRIO NO NAVEGADOR                            │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ↓
                        ┌───────────────────────┐
                        │  Preenche Formulário  │
                        │  - Nome               │
                        │  - Email              │
                        │  - Telefone           │
                        └───────────────────────┘
                                    │
                                    ↓
                        ┌───────────────────────┐
                        │  Clica Botão          │
                        │ "EU QUERO ESTUDAR"    │
                        └───────────────────────┘
                                    │
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                         form-integration.js                              │
├─────────────────────────────────────────────────────────────────────────┤
│  1. Previne reload (preventDefault)                                     │
│  2. Valida campos (email, telefone, obrigatórios)                       │
│  3. Desabilita botão                                                     │
│  4. Sanitiza inputs (trim)                                              │
│  5. Converte para JSON                                                   │
│  6. Faz fetch POST para API                                             │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ↓
                    ┌───────────────────────────────┐
                    │  Envia JSON via HTTP POST     │
                    │  Content-Type: application/   │
                    │           json                │
                    │                               │
                    │  {                            │
                    │    "nome": "João",           │
                    │    "email": "joao@...",      │
                    │    "telefone": "(11)..."     │
                    │  }                            │
                    └───────────────────────────────┘
                                    │
                                    ↓ INTERNET
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│              GOOGLE APPS SCRIPT (Servidor Google)                       │
├─────────────────────────────────────────────────────────────────────────┤
│  1. Recebe POST em doPost(e)                                            │
│  2. Parse JSON                                                          │
│  3. Validação de campos                                                 │
│  4. Obtém planilha ativa (SpreadsheetApp)                               │
│  5. Cria cabeçalhos se não existir                                      │
│  6. Adiciona nova linha (appendRow)                                     │
│  7. Retorna JSON de sucesso/erro                                        │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ↓ SALVA DADOS
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                    GOOGLE SHEETS (Planilha)                             │
├─────────────────────────────────────────────────────────────────────────┤
│  Timestamp              │ Nome        │ Email         │ Telefone        │
│  02/05/2026 10:30:15    │ João Silva  │ joao@...      │ (11) 99999-8888 │
│  02/05/2026 10:31:42    │ Maria Costa │ maria@...     │ (21) 98888-7777 │
│  02/05/2026 10:32:09    │ Pedro Santo │ pedro@...     │ (85) 97777-6666 │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ↓ RESPOSTA JSON
                                    ↓
                    ┌───────────────────────────────┐
                    │  {                            │
                    │    "success": true,           │
                    │    "message": "Inserido...",  │
                    │    "timestamp": "2026-05..." │
                    │  }                            │
                    └───────────────────────────────┘
                                    │
                                    ↓ INTERNET
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                         form-integration.js                              │
├─────────────────────────────────────────────────────────────────────────┤
│  1. Recebe resposta JSON                                                │
│  2. Verifica resultado.success                                          │
│  3. Exibe mensagem de sucesso                                           │
│  4. Oculta formulário                                                   │
│  5. Habilita botão                                                      │
│  6. Limpa campos                                                        │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ↓
                        ┌───────────────────────┐
                        │  Exibe Sucesso        │
                        │  "Pré-inscrição       │
                        │   confirmada!"        │
                        └───────────────────────┘
                                    │
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                 USUÁRIO VÊ A MENSAGEM E PODE FECHAR                    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Estrutura de Pastas

```
Modelo Doksa/
│
├── doksa_landingpage2.html
│   ├── <script src="form-integration.js"></script>  ← Incluído antes </body>
│   ├── <form id="formulario-doksa">                 ← Envolve os inputs
│   ├── <input id="fn" ...>  (Nome)
│   ├── <input id="fe" ...>  (Email)
│   └── <input id="fw" ...>  (Telefone)
│
├── form-integration.js
│   ├── const API_URL = "https://script.google.com/..." ← CONFIGURAR AQUI
│   ├── class FormularioIntegracao
│   ├── validarCampos()
│   ├── handleSubmit()
│   └── testarConexaoAPI()
│
├── google-apps-script.gs
│   ├── doPost(e)           ← Função principal
│   ├── Parse JSON
│   ├── Validação
│   ├── SpreadsheetApp
│   └── appendRow()
│
└── Documentação/
    ├── INTEGRAÇÃO_GOOGLE_SHEETS.md
    ├── CONFIGURAÇÃO_RÁPIDA.md
    └── EXEMPLOS_RESPOSTA_API.md
```

---

## Componentes Principais

### 1️⃣ Front-end (JavaScript)

**Responsabilidades:**
- Capturar envio do formulário
- Validar dados (email, telefone, campos vazios)
- Sanitizar inputs (trim)
- Enviar JSON via fetch
- Exibir sucesso/erro
- Desabilitar botão durante envio

**Arquivo:** `form-integration.js`

```javascript
class FormularioIntegracao {
  constructor(formId, apiUrl) { }
  validarCampos() { }
  handleSubmit(event) { }
  exibirSucesso() { }
  exibirErro(mensagem) { }
}
```

---

### 2️⃣ Backend (Google Apps Script)

**Responsabilidades:**
- Receber POST em `doPost(e)`
- Validar campos novamente
- Conectar à planilha
- Inserir dados com timestamp
- Retornar resposta JSON

**Arquivo:** `google-apps-script.gs`

```javascript
function doPost(e) {
  // Parse JSON
  // Validação
  // Obter planilha
  // Criar cabeçalhos
  // Adicionar linha
  // Retornar sucesso
}
```

---

### 3️⃣ Armazenamento (Google Sheets)

**Estrutura:**
| Timestamp | Nome | Email | Telefone |
|-----------|------|-------|----------|
| Auto | Recebido | Recebido | Recebido |

**Vantagens:**
- Tempo real
- Sem limite de linhas (1 milhão+)
- Livre para usar
- Fácil exportar para CSV/Excel

---

## Ciclo de Validação

```
FRONT-END VALIDA ──→ ENVIA JSON ──→ BACKEND VALIDA ──→ SALVA
    ✓ Email            POST              ✓ Email        ✓ Planilha
    ✓ Telefone         JSON              ✓ Telefone       atualiza
    ✓ Campos vazio                      ✓ Campos        ✓ Tempo real
```

---

## Segurança por Camadas

```
1. FRONT-END (Cliente)
   ├─ Validação de email (regex)
   ├─ Validação de telefone (regex)
   ├─ Campos obrigatórios
   └─ Sanitização com trim()

2. BACKEND (Apps Script)
   ├─ Validação novamente (dupla verificação)
   ├─ Verifica se campos estão vazios
   ├─ Verifica conexão com planilha
   └─ Try-catch para erros

3. GOOGLE SHEETS
   ├─ Requer autenticação Google
   ├─ Backup automático
   └─ Controle de acesso
```

---

## Variáveis Importante

### API_URL

```javascript
const API_URL = "https://script.google.com/macros/s/DEPLOYMENT_ID/usercontent";
```

- **Onde obter:** Deploy do Google Apps Script
- **Formato:** URL pública do Web App
- **Obrigatório:** SIM (sem ela não funciona)

---

## Status de Requisição

### ✅ Sucesso (200 OK)

```json
{
  "success": true,
  "message": "Dados inseridos com sucesso!",
  "timestamp": "2026-05-02T10:30:15.123Z"
}
```

Resultado: ✓ Dados salvos | ✓ Mensagem exibida | ✓ Formulário limpo

### ❌ Erro (200 OK, mas success: false)

```json
{
  "success": false,
  "message": "Campos obrigatórios faltando"
}
```

Resultado: ❌ Alerta | ✓ Formulário ativo | ✓ Botão habilitado

### ⚠️ Erro de Conexão (Sem resposta)

```
TypeError: Failed to fetch
```

Resultado: ❌ Mensagem genérica | ✓ Botão habilitado para retry

---

## Performance

| Etapa | Tempo Esperado |
|-------|---|
| Validação front-end | <10ms |
| Envio via fetch | 100-500ms |
| Processamento backend | 500-1000ms |
| Resposta retorna | 100-200ms |
| **TOTAL** | **700-1700ms** |

---

## Limitações Conhecidas

1. **Rate Limiting**
   - Google permite ~10 requisições/segundo por usuário
   - Se muitos usuários enviam ao mesmo tempo: possível delay

2. **Tamanho**
   - Máx 10MB por célula
   - Máx 10 milhões de células por planilha
   - Suficiente para 100+ mil registros

3. **Disponibilidade**
   - Dependente de Google Sheets estar online
   - Se Google cair, integração não funciona
   - Downtime raro (<0.01% ao ano)

---

## Próximos Passos

1. ✅ Configurar a URL da API
2. ✅ Fazer deploy no Google Apps Script
3. ✅ Testar com `testarConexaoAPI()`
4. ✅ Enviar formulário real
5. ✅ Verificar dados na planilha
6. ✅ Compartilhar link do site

---

**Status:** ✅ Pronto para Produção
**Última atualização:** 02/05/2026
