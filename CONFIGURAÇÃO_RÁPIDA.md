/**
 * RESUMO RÁPIDO - Configuração da Integração Google Sheets
 * 
 * COPIE E COLE - Instruções Resumidas
 */

// ═══════════════════════════════════════════════════════════════════════════
// ✅ PASSO 1: URL DA API (COPIE E COLE SUA URL AQUI)
// ═══════════════════════════════════════════════════════════════════════════

/*
VOCÊ RECEBERÁ UMA URL ASSIM APÓS FAZER DEPLOY NO GOOGLE APPS SCRIPT:

https://script.google.com/macros/s/AKfycbw1a2b3c4d5e6f7g8h9i0j/usercontent

COLA-A AQUI NO form-integration.js (linha 15):

const API_URL = "https://script.google.com/macros/s/AKfycbw1a2b3c4d5e6f7g8h9i0j/usercontent";
                                                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                             (SUBSTITUA PELO SEU DEPLOYMENT ID)
*/

// ═══════════════════════════════════════════════════════════════════════════
// 📋 CHECKLIST DE CONFIGURAÇÃO
// ═══════════════════════════════════════════════════════════════════════════

/*
☐ 1. Criei uma planilha no Google Sheets chamada "Instituto Doksa"
☐ 2. Acessei script.google.com e criei um novo projeto
☐ 3. Colei o código do google-apps-script.gs no projeto
☐ 4. Conectei a planilha ao Apps Script
☐ 5. Cliquei em "Deploy" > "New deployment" > "Web app"
☐ 6. Copiei a URL do deploy
☐ 7. Colei a URL em form-integration.js (const API_URL)
☐ 8. O arquivo form-integration.js está na mesma pasta que doksa_landingpage2.html
☐ 9. O HTML já tem <script src="form-integration.js"></script> antes de </body>
☐ 10. Os IDs dos inputs estão corretos: id="fn", id="fe", id="fw"
*/

// ═══════════════════════════════════════════════════════════════════════════
// 🧪 TESTE 1: Verificar se o script foi carregado
// ═══════════════════════════════════════════════════════════════════════════

/*
ABRA O CONSOLE (F12) E VEJA SE APARECE:
✓ Integração de formulário inicializada

SE NÃO APARECER:
- Verifique se form-integration.js está na mesma pasta do HTML
- Verifique se <script src="form-integration.js"></script> existe no HTML
- Verifique se não há erros no console (abra F12)
*/

// ═══════════════════════════════════════════════════════════════════════════
// 🧪 TESTE 2: Testar conexão com a API
// ═══════════════════════════════════════════════════════════════════════════

/*
NO CONSOLE (F12), EXECUTE:
testarConexaoAPI()

VOCÊ DEVE VER:
✓ API conectada com sucesso!
{success: true, message: "Dados inseridos com sucesso!", timestamp: "..."}

SE VIR ERRO:
- Verifique se a URL da API foi configurada corretamente
- Verifique se o deploy foi feito com "Qualquer pessoa" tem acesso
- Verifique se o Google Apps Script está ativo
*/

// ═══════════════════════════════════════════════════════════════════════════
// 🧪 TESTE 3: Enviar formulário real
// ═══════════════════════════════════════════════════════════════════════════

/*
1. Preencha o formulário com dados reais:
   - Nome: João Silva
   - Email: joao@example.com
   - Telefone: (11) 99999-8888

2. Clique em "EU QUERO ESTUDAR"

3. RESULTADO ESPERADO:
   - Mensagem "Pré-inscrição confirmada!" aparece
   - Botão volta ao normal
   - Dados aparecem na planilha do Google Sheets

SE NÃO FUNCIONAR:
- Verifique o console (F12) para erros
- Certifique-se de que preencheu todos os campos
- Verifique se a planilha está acessível
- Teste novamente a função testarConexaoAPI()
*/

// ═══════════════════════════════════════════════════════════════════════════
// 📊 O QUE VOCÊ VAI VER NA PLANILHA
// ═══════════════════════════════════════════════════════════════════════════

/*
Após o primeiro envio, a planilha terá:

| Timestamp              | Nome         | Email                | Telefone         |
|------------------------|--------------|----------------------|------------------|
| 02/05/2026 10:30:15    | João Silva   | joao@example.com     | (11) 99999-8888  |
| 02/05/2026 10:31:42    | Maria Costa  | maria@example.com    | (21) 98888-7777  |
| 02/05/2026 10:32:09    | Pedro Santos | pedro@example.com    | (85) 97777-6666  |

A hora é automática do servidor Google (GMT).
*/

// ═══════════════════════════════════════════════════════════════════════════
// ⚙️ CONFIGURAÇÃO AVANÇADA
// ═══════════════════════════════════════════════════════════════════════════

/*
Se precisar fazer ajustes:

1. REDIRECIONAR PARA WHATSAPP APÓS ENVIO
   No form-integration.js, na função handleSubmit, descomente:
   
   window.open("https://chat.whatsapp.com/SEU_LINK", "_blank");

2. MUDAR NOME DA PLANILHA
   No google-apps-script.gs, altere:
   
   const sheet = SpreadsheetApp.getActiveSheet();
   
   Para:
   
   const sheet = SpreadsheetApp.getActiveSpreadsheet()
                                .getSheetByName("Nome da Aba");

3. ADICIONAR MAIS CAMPOS
   - Adicione um novo <input> no HTML com id único
   - No form-integration.js, adicione validação no método validarCampos()
   - No google-apps-script.gs, adicione o campo no sheet.appendRow()

4. MUDAR A MENSAGEM DE SUCESSO
   No form-integration.js, na função exibirSucesso(),
   altere o conteúdo de .textContent ou use alert()
*/

// ═══════════════════════════════════════════════════════════════════════════
// 🚨 ERROS COMUNS E SOLUÇÕES
// ═══════════════════════════════════════════════════════════════════════════

/*
ERRO: "Erro ao conectar ao servidor"
→ Verifique a URL da API em form-integration.js
→ Certifique-se de que fez Deploy como "Web app"

ERRO: "Campos obrigatórios faltando"
→ Preencha todos os três campos: nome, email, telefone
→ Não deixe nenhum em branco

ERRO: "Erro ao processar dados"
→ Verifique se a planilha está aberta
→ Veja os logs do Apps Script em apps.google.com/script

DADOS NÃO APARECEM NA PLANILHA:
→ Atualize a planilha (F5 ou Ctrl+R)
→ Verifique se a aba está ativa
→ Veja os logs do Apps Script para erros

BOTÃO CONTINUA DIZENDO "ENVIANDO..."
→ Pode haver um erro na requisição
→ Verifique o console (F12) para detalhes
→ Recarregue a página
*/

// ═══════════════════════════════════════════════════════════════════════════
// 📞 SUPORTE E DOCUMENTAÇÃO
// ═══════════════════════════════════════════════════════════════════════════

/*
Para mais informações, consulte:
- INTEGRAÇÃO_GOOGLE_SHEETS.md (guia completo)
- form-integration.js (comentários detalhados)
- google-apps-script.gs (código comentado)

Todas as 3 funções principais estão comentadas no código.
*/

// ═══════════════════════════════════════════════════════════════════════════
// ✅ SCRIPT PRONTO PARA PRODUÇÃO
// ═══════════════════════════════════════════════════════════════════════════

/*
Este código está pronto para usar em produção com:
✓ Validação de campos
✓ Sanitização de inputs
✓ Tratamento de erros
✓ Mensagens de sucesso/erro
✓ Desabilitar botão durante envio
✓ Sem dependências externas (apenas JavaScript puro)
✓ Comentários explicativos
✓ Pronto para customização

Não há necessidade de modificações adicionais,
apenas configure a URL da API e teste!
*/
