const API_URL = "https://script.google.com/macros/s/AKfycbwOU1_s-WPuBL7PGS5zGsbiUZSd3mbzT8C5lKJmgmMv25_07cGycnVzcMfs_NYlk3z74w/exec";

const form = document.getElementById("formulario-doksa");
const btn = document.getElementById("btn-submit");
const btnText = document.getElementById("btn-text");

const successBox = document.getElementById("form-success-state");
const fieldsBox = document.getElementById("form-fields");

form.addEventListener("submit", async function(e){
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();

  if(!nome || !email || !telefone){
    alert("Preencha todos os campos");
    return;
  }

  // Loading
  btn.disabled = true;
  btnText.innerText = "Enviando...";

  try{
    // 🔥 AQUI ESTÁ A CORREÇÃO
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("telefone", telefone);

    const res = await fetch(API_URL,{
      method:"POST",
      body: formData
    });

    const data = await res.json();

    if(data.success){
      fieldsBox.style.display = "none";
      successBox.style.display = "block";

      setTimeout(()=>{
        window.location.href = "https://wa.me/98970292559?text=Olá, gostaria de mais informações sobre o Curso  Bacharel Livre em Teologia - Doksa";
      }, 1000);

    }else{
      alert(data.message || "Erro ao enviar");
    }

  }catch(err){
    console.error(err);
    alert("Erro de conexão");
  }

  btn.disabled = false;
  btnText.innerText = "EU QUERO ESTUDAR";
});