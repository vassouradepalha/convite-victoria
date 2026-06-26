// Edite só este arquivo com seus dados reais
const CONFIG = {
  whatsapp: "5547997139829",

  mensagemDuvida: "Oi Victória! Tenho uma dúvida sobre a festa.",

  // Cole aqui o link do Google Maps (Compartilhar → Copiar link)
  linkMaps: "https://maps.app.goo.gl/zfnBdJn8nfNFpYxM8",

  musica: "assets/musica.mp3",
};

function linkWhatsApp(mensagem) {
  const texto = encodeURIComponent(mensagem);
  return `https://wa.me/${CONFIG.whatsapp}?text=${texto}`;
}
