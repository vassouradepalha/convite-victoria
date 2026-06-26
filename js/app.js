const telas = {
  capa: document.getElementById("tela-capa"),
  presentes: document.getElementById("tela-presentes"),
  informacoes: document.getElementById("tela-informacoes"),
};

const audio = document.getElementById("musica");
const btnMusica = document.getElementById("btn-musica");
const overlayMusica = document.getElementById("overlay-musica");
const btnIniciar = document.getElementById("btn-iniciar");

let musicaLigada = false;

function mostrarTela(nome) {
  Object.values(telas).forEach((tela) => tela.classList.remove("ativa"));
  telas[nome].classList.add("ativa");
  window.scrollTo(0, 0);
}

function atualizarIconeMusica() {
  btnMusica.textContent = musicaLigada ? "🔊" : "🔇";
  btnMusica.setAttribute(
    "aria-label",
    musicaLigada ? "Pausar música" : "Tocar música"
  );
}

async function ligarMusica() {
  if (!audio.src) return;

  try {
    audio.volume = 0.45;
    await audio.play();
    musicaLigada = true;
  } catch {
    musicaLigada = false;
  }

  atualizarIconeMusica();
}

function pausarMusica() {
  audio.pause();
  musicaLigada = false;
  atualizarIconeMusica();
}

async function alternarMusica() {
  if (musicaLigada) {
    pausarMusica();
    return;
  }

  await ligarMusica();
}

function abrirLocal() {
  if (!CONFIG.linkMaps) return;
  window.open(CONFIG.linkMaps, "_blank", "noopener");
}

function iniciarConvite() {
  overlayMusica.classList.remove("visivel");
  ligarMusica();
}

document.getElementById("btn-local").addEventListener("click", abrirLocal);

document.getElementById("btn-presentes").addEventListener("click", () => {
  mostrarTela("presentes");
});

document.getElementById("btn-informacoes").addEventListener("click", () => {
  mostrarTela("informacoes");
});

document.getElementById("btn-duvida").addEventListener("click", () => {
  window.open(linkWhatsApp(CONFIG.mensagemDuvida), "_blank", "noopener");
});

document.querySelectorAll("[data-voltar]").forEach((btn) => {
  btn.addEventListener("click", () => mostrarTela("capa"));
});

btnMusica.addEventListener("click", alternarMusica);
btnIniciar.addEventListener("click", iniciarConvite);

audio.addEventListener("ended", () => {
  audio.currentTime = 0;
  audio.play().catch(() => {});
});

if (CONFIG.musica) {
  audio.src = CONFIG.musica;
  overlayMusica.classList.add("visivel");
} else {
  overlayMusica.classList.remove("visivel");
}

atualizarIconeMusica();
mostrarTela("capa");
