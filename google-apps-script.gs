function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return jsonResponse({
    success: true,
    message: "API OK"
  });
}

function doPost(e) {
  try {
    const nome = e.parameter.nome;
    const email = (e.parameter.email || "").toLowerCase().trim();
    const telefone = e.parameter.telefone;

    // Validação básica
    if (!nome || !email || !telefone) {
      return jsonResponse({
        success: false,
        message: "Campos obrigatórios faltando"
      });
    }

    const sheet = SpreadsheetApp.getActiveSheet();

    // Criar cabeçalho se vazio
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Data", "Nome", "Email", "Telefone"]);
    }

    // 🔥 VERIFICAÇÃO DE EMAIL DUPLICADO
    const lastRow = sheet.getLastRow();

    if (lastRow > 1) {
      const emails = sheet
        .getRange(2, 3, lastRow - 1, 1) // coluna C = Email
        .getValues()
        .flat()
        .map(e => String(e).toLowerCase().trim());

      if (emails.includes(email)) {
        return jsonResponse({
          success: false,
          message: "Este e-mail já foi cadastrado."
        });
      }
    }

    // Salvar na planilha
    sheet.appendRow([
      new Date().toLocaleString("pt-BR"),
      nome,
      email,
      telefone
    ]);

    return jsonResponse({
      success: true,
      message: "Cadastro realizado com sucesso!"
    });

  } catch (err) {
    return jsonResponse({
      success: false,
      message: err.toString()
    });
  }
}