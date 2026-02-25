const inputCpf = document.getElementById("cpf");
const btnValidar = document.getElementById("btnValidar");
const btnLimpar = document.getElementById("btnLimpar");
const btnExemplo = document.getElementById("btnExemplo");
const resultado = document.getElementById("resultado");

// Máscara: 000.000.000-00
inputCpf.addEventListener("input", () => {
  let v = inputCpf.value.replace(/\D/g, "").slice(0, 11);

  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  inputCpf.value = v;
  limparResultado();
});

btnValidar.addEventListener("click", () => {
  const cpf = inputCpf.value;
  const valido = validarCPF(cpf);

  if (valido) {
    mostrarResultado("CPF válido ✅", true);
  } else {
    mostrarResultado("CPF inválido ❌", false);
  }
});

btnLimpar.addEventListener("click", () => {
  inputCpf.value = "";
  limparResultado();
  inputCpf.focus();
});

btnExemplo.addEventListener("click", () => {
  inputCpf.value = "529.982.247-25"; // exemplo conhecido como válido
  limparResultado();
});

function limparResultado() {
  resultado.textContent = "";
  resultado.classList.remove("ok", "bad");
}

function mostrarResultado(texto, ok) {
  resultado.textContent = texto;
  resultado.classList.toggle("ok", ok);
  resultado.classList.toggle("bad", !ok);
}

// Função principal
function validarCPF(cpf) {
  const limpo = String(cpf).replace(/\D/g, "");

  // tem 11?
  if (limpo.length !== 11) return false;

  // bloqueia sequências númericas
  if (/^(\d)\1{10}$/.test(limpo)) return false;

  const dig1 = calcularDigito(limpo.slice(0, 9), 10);
  const dig2 = calcularDigito(limpo.slice(0, 9) + dig1, 11);

  return limpo === (limpo.slice(0, 9) + dig1 + dig2);
}

// calcula 1º ou 2º dígito
function calcularDigito(parcial, pesoInicial) {
  let soma = 0;

  for (let i = 0; i < parcial.length; i++) {
    soma += Number(parcial[i]) * (pesoInicial - i);
  }

  let resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;

  return String(resto);
}