/**
 * EXEMPLOS DE RESPOSTA DA API
 * 
 * Este arquivo mostra os formatos de resposta que você receberá
 * do Google Apps Script em cada situação.
 */

// ═══════════════════════════════════════════════════════════════════════════
// ✅ RESPOSTA DE SUCESSO
// ═══════════════════════════════════════════════════════════════════════════

const SUCESSO = {
  success: true,
  message: "Dados inseridos com sucesso!",
  timestamp: "2026-05-02T10:30:15.123Z"
};

/* O que acontece no front-end:
   ✓ Exibe mensagem de sucesso
   ✓ Mostra "Pré-inscrição confirmada!"
   ✓ Desabilita botão por alguns segundos
   ✓ Limpa o formulário
   ✓ Opcionalmente redireciona para WhatsApp
*/

// ═══════════════════════════════════════════════════════════════════════════
// ❌ RESPOSTA DE ERRO - Campos Vazios
// ═══════════════════════════════════════════════════════════════════════════

const ERRO_CAMPOS_VAZIOS = {
  success: false,
  message: "Campos obrigatórios faltando"
};

/* Causas possíveis:
   - Nome, email ou telefone não preenchido no formulário
   - Campo vazio mesmo após trim()
   
   O que acontece:
   ❌ Exibe alerta: "Erro: Campos obrigatórios faltando"
   ✓ Formulário permanece aberto
   ✓ Botão continua ativo (usuário pode corrigir)
*/

// ═══════════════════════════════════════════════════════════════════════════
// ❌ RESPOSTA DE ERRO - Erro ao Processar
// ═══════════════════════════════════════════════════════════════════════════

const ERRO_PROCESSAMENTO = {
  success: false,
  message: "Erro ao processar dados: ReferenceError: sheet is not defined"
};

/* Causas possíveis:
   - Planilha não está conectada ao Apps Script
   - Falha de permissão
   - Apps Script não foi salvo corretamente
   
   O que acontece:
   ❌ Exibe alerta com o erro específico
   ✓ Formulário permanece aberto
   ✓ Usuário pode tentar novamente
   ✓ Erro aparece nos logs do Apps Script
*/

// ═══════════════════════════════════════════════════════════════════════════
// ⚠️ ERRO DE CONEXÃO - Sem Resposta da API
// ═══════════════════════════════════════════════════════════════════════════

const ERRO_CONEXAO = {
  erro: "TypeError: Failed to fetch",
  mensagemExibida: "Erro ao conectar ao servidor. Verifique a URL da API."
};

/* Causas possíveis:
   - URL da API não foi configurada (ainda tem "YOUR_DEPLOYMENT_ID")
   - Deploy não foi feito como "Web app"
   - Internet desconectada
   - URL expirada (fazer novo deploy)
   - CORS bloqueado (raro, Google geralmente permite)
   
   O que acontece:
   ❌ Exibe alerta genérico
   ✓ Erro detalhado aparece no console (F12)
   ✓ Botão volta ao normal para o usuário tentar de novo
*/

// ═══════════════════════════════════════════════════════════════════════════
// 📊 EXEMPLO COMPLETO DE FLUXO DE ENVIO
// ═══════════════════════════════════════════════════════════════════════════

/*
PASSO A PASSO DO QUE ACONTECE:

1. USUÁRIO PREENCHE O FORMULÁRIO
   ├─ Nome: "João Silva"
   ├─ Email: "joao@example.com"
   └─ Telefone: "(11) 99999-8888"

2. USUÁRIO CLICA EM "EU QUERO ESTUDAR"
   ├─ Evento "submit" é acionado
   ├─ preventDefault() cancela reload
   └─ handleSubmit() é executada

3. VALIDAÇÃO (Front-end)
   ├─ Verifica se campos estão vazios
   ├─ Valida formato de email
   ├─ Valida formato de telefone
   └─ Se tudo ok, continua

4. PREPARAÇÃO DO ENVIO
   ├─ Desabilita botão: "Enviando..."
   ├─ Marca isSubmitting = true
   ├─ Coleta dados: {nome, email, telefone}
   └─ Converte para JSON

5. FETCH PARA API
   ├─ Envia POST para Google Apps Script
   ├─ Corpo: JSON com os dados
   ├─ Header: Content-Type: application/json
   └─ Aguarda resposta

6. GOOGLE APPS SCRIPT PROCESSA
   ├─ Recebe dados em JSON
   ├─ Valida novamente (segurança dupla)
   ├─ Obtém a planilha ativa
   ├─ Cria cabeçalhos se necessário
   ├─ Adiciona nova linha com timestamp
   └─ Retorna resposta JSON

7. FRONT-END RECEBE RESPOSTA
   ├─ Parse do JSON
   ├─ Verifica if resultado.success
   └─ Executa ação apropriada

8A. SE SUCESSO:
   ├─ Exibe "Pré-inscrição confirmada!"
   ├─ Oculta formulário
   ├─ Limpa campos após delay
   ├─ Opcionalmente redireciona para WhatsApp
   └─ Habilita botão novamente

8B. SE ERRO:
   ├─ Exibe mensagem de erro
   ├─ Formulário permanece visível
   ├─ Habilita botão para retry
   └─ Mostra erro no console

9. DADOS APARECEM NA PLANILHA
   ├─ Timestamp automático
   ├─ Arquivo atualiza em tempo real
   └─ Você vê os dados imediatamente
*/

// ═══════════════════════════════════════════════════════════════════════════
// 🔍 COMO DEBUGAR
// ═══════════════════════════════════════════════════════════════════════════

/*
ABRA O CONSOLE (F12) E VEJA OS LOGS:

1. VERIFICAR SE INTEGRAÇÃO FOI CARREGADA:
   ✓ Integração de formulário inicializada

2. ANTES DE ENVIAR:
   📤 Enviando dados...
   {nome: "João Silva", email: "joao@example.com", telefone: "(11) 99999-8888"}

3. APÓS ENVIO COM SUCESSO:
   ✓ Dados inseridos com sucesso!

4. EM CASO DE ERRO:
   ✗ Erro na requisição: (erro específico)
   ou
   ✗ Erro ao conectar ao servidor. Verifique a URL da API.

PARA VER TODOS OS LOGS:
- Abra o console (F12)
- Procure por "console.log" no form-integration.js
- Execute testarConexaoAPI() para teste detalhado
*/

// ═══════════════════════════════════════════════════════════════════════════
// 📝 ESTRUTURA DA RESPOSTA JSON
// ═══════════════════════════════════════════════════════════════════════════

/*
SEMPRE A RESPOSTA TERÁ ESTE FORMATO:

{
  success: boolean,      // true se funcionou, false se erro
  message: string,       // Mensagem de sucesso ou erro
  timestamp: string      // (Opcional) Timestamp ISO do servidor
}

EXEMPLO 1 - SUCESSO:
{
  "success": true,
  "message": "Dados inseridos com sucesso!",
  "timestamp": "2026-05-02T10:30:15.123Z"
}

EXEMPLO 2 - ERRO:
{
  "success": false,
  "message": "Campos obrigatórios faltando"
}

EXEMPLO 3 - ERRO DETALHADO:
{
  "success": false,
  "message": "Erro ao processar dados: ReferenceError: sheet is not defined"
}
*/

// ═══════════════════════════════════════════════════════════════════════════
// 🧪 TESTAR MANUALMENTE NO CONSOLE
// ═══════════════════════════════════════════════════════════════════════════

/*
COPIE E COLE NO CONSOLE (F12):

// Teste 1: Verificar se a integração está ativa
console.log("API_URL:", API_URL);

// Teste 2: Simular um envio
fetch(API_URL, {
  method: "POST",
  body: JSON.stringify({
    nome: "Teste Manual",
    email: "teste@example.com",
    telefone: "(11) 99999-9999"
  }),
  headers: { "Content-Type": "application/json" }
})
.then(r => r.json())
.then(d => console.log("Resposta:", d))
.catch(e => console.error("Erro:", e));

// Teste 3: Chamar a função de teste
testarConexaoAPI();

// Teste 4: Ver a configuração da integração
console.log(document.getElementById("formulario-doksa"));
*/

// ═══════════════════════════════════════════════════════════════════════════
// 📊 VERIFICAR LOGS NO GOOGLE APPS SCRIPT
// ═══════════════════════════════════════════════════════════════════════════

/*
1. Acesse https://script.google.com
2. Abra seu projeto Doksa
3. Clique em "Execuções" (lado esquerdo)
4. Você verá todas as requisições com:
   - Data/hora
   - Status (sucesso/erro)
   - Tempo de execução
   - Logs (se houver erro)

5. Clique em uma execução para ver detalhes:
   - console.log messages
   - Erros específicos
   - Stack trace

ISSO AJUDA A DEBUGAR PROBLEMAS!
*/

// ═══════════════════════════════════════════════════════════════════════════
// ✅ CHECKLIST FINAL
// ═══════════════════════════════════════════════════════════════════════════

/*
Antes de considerar "pronto para produção":

☐ URL da API está configurada em form-integration.js
☐ testarConexaoAPI() retorna sucesso
☐ Preenchendo e enviando o formulário funciona
☐ Dados aparecem corretamente na planilha
☐ Validações funcionam (email inválido, campos vazios)
☐ Botão se desabilita durante envio
☐ Mensagem de sucesso aparece
☐ Console não mostra erros
☐ Funciona em diferentes navegadores (Chrome, Firefox, Safari)
☐ Funciona em dispositivos móveis

Se tudo passar neste checklist,
sua integração está 100% funcional!
*/
