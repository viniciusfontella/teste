"use strict";

/* ==========================================================
   CONFIGURAÇÕES
   Todos os links, telefones e dados editáveis ficam aqui.
   Links vazios ("") deixam o botão correspondente oculto
   até serem preenchidos (nenhum link inventado).
   ========================================================== */
const CONFIG = {
  bookingUrl: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza",
  // LINK PADRÃO DOS BOTÕES DE SERVIÇO (escolha de profissional no SalonSoft).
  // Cole aqui o link que abre direto na escolha da profissional. Vale para TODOS os serviços
  // que não tiverem um link próprio (campo link, na lista de serviços mais abaixo).
  // Vazio ("") = usa o bookingUrl acima (página inicial do agendamento).
  bookingProfissionalUrl: "",
  instagramUrl: "https://www.instagram.com/galheri_atelie/",
  facebookUrl: "https://www.facebook.com/vanessagalheri/",
  phone: "+5512997230207",
  // URL das avaliações no Google (Perfil da Empresa > "Compartilhar avaliações").
  googleReviewsUrl: "",
  // URL do Google Maps (busque o endereço no Maps > Compartilhar > Copiar link).
  // Abre o endereço no Google Maps (busca por texto; não usa coordenadas inventadas).
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("R. Sete de Setembro, 22, Centro, Caçapava - SP, 12281-620"),
  // Confirme que o número usa WhatsApp. Para desativar o botão, deixe "".
  whatsappUrl: "https://wa.me/5512997230207",

  // Horário de funcionamento: cada linha aparece na seção "Onde estamos?".
  // Horário vazio ("") = a linha não aparece. Para mostrar domingo fechado, adicione:
  // { dias: "Domingo", horario: "Fechado" }
  hours: [
    { dias: "Segunda a sexta", horario: "9h às 18h" },
    { dias: "Sábado", horario: "9h às 16h" }
  ],

  // Fotos da galeria (images/gallery/). Remova da lista as que não existirem.
  gallery: ["foto-01", "foto-02", "foto-03", "foto-04", "foto-05", "foto-06"].map(n => `images/gallery/${n}.webp`),
  // Fotos do Instagram (images/instagram/). Imagens locais; sem scraping.
  instagram: ["insta-01", "insta-02", "insta-03", "insta-04"].map(n => `images/instagram/${n}.webp`),
  // Antes/depois: [{ antes: "images/before-after/1-antes.webp", depois: "images/before-after/1-depois.webp" }]
  // Lista vazia = a seção "Transformações" fica escondida.
  beforeAfter: [],

    // ==========================================================
  // ESPECIALIDADES (cards da seção "Nossas especialidades")
  //
  // COMO EDITAR:
  //  - titulo: o texto que aparece no card. Pode trocar à vontade.
  //  - img:    o caminho da foto do card.
  //
  // COMO ADICIONAR UMA FOTO:
  //  1. Salve a imagem na pasta  images/especialidades/
  //  2. O NOME do arquivo precisa ser igual ao nome escrito em "img"
  //     (exemplo: "novo-card" -> novo-card.jpg).
  //  3. A extensão pode ser jpg, jpeg, png ou webp: o site testa todas sozinho.
  //  4. Tamanho ideal: foto vertical (retrato), proporção 4:5, ex.: 800 x 1000 px.
  //
  // Enquanto a foto não existir, o card mostra só o quadro dourado com o título.
  //
  // COMO CRIAR OUTRO CARD: copie uma linha inteira { titulo: "...", img: "..." },
  // cole abaixo da última e lembre de colocar vírgula depois da linha anterior.
  // COMO REMOVER UM CARD: apague a linha dele.
  // ==========================================================
  specialties: [
    { titulo: "Morena iluminada", img: "images/especialidades/morena-iluminada.jpg" },
    { titulo: "Loiros", img: "images/especialidades/loiros.jpg" },
    { titulo: "Cronograma capilar", img: "images/especialidades/cronograma-capilar.jpg" },
    { titulo: "Manicure express", img: "images/especialidades/manicure-express.jpg" },
    { titulo: "Alisamento", img: "images/especialidades/alisamento-zeroformol" },
    { titulo: "Alongamentos", img: "images/especialidades/alongamentomoldef1" },
  ]
};

/* ==========================================================
   SERVIÇOS
   Para editar, altere nome, duração e preço abaixo. Para incluir
   foto, adicione imagem: "images/services/cabelo/arquivo.webp".
   Campos vazios não aparecem no card.
   ========================================================== */
/* ----------------------------------------------------------
   COMO TROCAR O LINK DO BOTÃO "AGENDAR HORÁRIO" DE UM SERVIÇO
   Cada serviço abaixo tem o campo  link: ""
   - Para mudar o botão daquele serviço, cole o link do SalonSoft entre as aspas:
       { id: 5, nome: "Balayagem", link: "https://COLE-O-LINK-AQUI", ... }
   - Serviços com vários tamanhos (P, M, G) têm uma linha por tamanho, cada uma com
     seu  link: "" . O botão do card muda de link junto com o tamanho escolhido,
     assim como o preço. Tamanho sem link usa o link do serviço (se houver).
   - Ordem de prioridade: link da opção > link do serviço >
     CONFIG.bookingProfissionalUrl > CONFIG.bookingUrl.
   - Link vazio ("") = o botão usa o link padrão. Salve o arquivo e atualize a página.
   ---------------------------------------------------------- */
const services = {
  cabelo: [
    { id: 1, nome: "Morena iluminada", link: "", grupo: "cor", opcoes: [
        // Um link por tamanho: cole em link: "" de cada linha abaixo.
        { tam: "M", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/693282", duracao: "2h", preco: "a partir de R$ 400,00" },
        { tam: "M", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1232112", duracao: "3h", preco: "a partir de R$ 450,00" }
    ] },
    { id: 2, nome: "Mechas", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1243274", grupo: "cor", opcoes: [{ duracao: "3h", preco: "a partir de R$ 450,00" }] },
    { id: 3, nome: "Mechas Sunset", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1039595", grupo: "cor", opcoes: [{ duracao: "4h", preco: "a partir de R$ 470,00" }] },
    { id: 4, nome: "Luzes", link: "", grupo: "cor", opcoes: [
        // Um link por tamanho: cole em link: "" de cada linha abaixo.
        { tam: "PP", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692339", duracao: "4h", preco: "a partir de R$ 250,00" },
        { tam: "M", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692423", duracao: "3h", preco: "a partir de R$ 450,00" },
        { tam: "G", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692425", duracao: "4h", preco: "a partir de R$ 550,00" }
    ] },
    { id: 5, nome: "Balayagem", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692476", grupo: "cor", opcoes: [{ duracao: "2h30min", preco: "a partir de R$ 350,00" }] },
    { id: 6, nome: "Balayagem chanel", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/695008", grupo: "cor", opcoes: [{ duracao: "1h30min", preco: "a partir de R$ 160,00" }] },
    { id: 7, nome: "Californiana", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/872158", grupo: "cor", opcoes: [{ duracao: "30min", preco: "a partir de R$ 200,00" }] },
    { id: 8, nome: "Ombre hair", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692424", grupo: "cor", opcoes: [{ duracao: "4h", preco: "a partir de R$ 400,00" }] },
    { id: 9, nome: "Coloração", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692340", grupo: "cor", opcoes: [{ duracao: "1h40min", preco: "a partir de R$ 135,00" }] },
    { id: 10, nome: "Matização com hidratação", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/822778", grupo: "cor", opcoes: [{ duracao: "30min", preco: "a partir de R$ 149,90" }] },
    { id: 11, nome: "Teste de mechas", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/886128", grupo: "cor", opcoes: [{ duracao: "30min", preco: "a partir de R$ 50,00" }] },
    { id: 12, nome: "Detox pré mechas", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692470", grupo: "cor", opcoes: [{ duracao: "1h", preco: "a partir de R$ 70,00" }] },
    { id: 13, nome: "Hidratação pré mechas 70% menos quebra", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1039599", grupo: "cor", opcoes: [{ duracao: "30min", preco: "a partir de R$ 121,00" }] },
    { id: 14, nome: "Progressiva", link: "", grupo: "alisamento", opcoes: [
        // Um link por tamanho: cole em link: "" de cada linha abaixo.
        { tam: "P", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692460", duracao: "2h", preco: "a partir de R$ 180,00" },
        { tam: "M", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692461", duracao: "2h", preco: "a partir de R$ 220,00" },
        { tam: "G", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692463", duracao: "2h", preco: "a partir de R$ 300,00" }
    ] },
    { id: 15, nome: "Selagem", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692455", grupo: "alisamento", opcoes: [{ duracao: "2h", preco: "a partir de R$ 180,00" }] },
    { id: 16, nome: "Selagem organicaliss", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/839802", grupo: "alisamento", opcoes: [{ tam: "G", duracao: "3h", preco: "a partir de R$ 300,00" }] },
    { id: 17, nome: "Alisamento orgânico", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692454", grupo: "alisamento", opcoes: [{ duracao: "2h", preco: "a partir de R$ 220,00" }] },
    { id: 18, nome: "Definitiva", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/725366", grupo: "alisamento", opcoes: [{ duracao: "3h", preco: "a partir de R$ 300,00" }] },
    { id: 19, nome: "Semi-definitiva orgânica", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1045752", grupo: "alisamento", opcoes: [{ duracao: "3h", preco: "a partir de R$ 300,00" }] },
    { id: 20, nome: "Semi-definitiva", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1045754", grupo: "alisamento", opcoes: [{ tam: "M", duracao: "3h", preco: "a partir de R$ 350,00" }] },
    { id: 21, nome: "Plástica dos fios", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1129051", grupo: "alisamento", opcoes: [{ duracao: "30min", preco: "a partir de R$ 239,90" }] },
    { id: 22, nome: "Combo alisamento e corte", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1325309", grupo: "alisamento", opcoes: [{ duracao: "30min", preco: "a partir de R$ 250,00" }] },
    { id: 23, nome: "Botox vegano", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1006169", grupo: "tratamentos", opcoes: [{ duracao: "2h30min", preco: "a partir de R$ 200,00" }] },
    { id: 24, nome: "Botox orgânico", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/925849", grupo: "tratamentos", opcoes: [{ duracao: "2h", preco: "a partir de R$ 180,00" }] },
    { id: 25, nome: "Botox", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1005564", grupo: "tratamentos", opcoes: [{ tam: "P", duracao: "30min", preco: "a partir de R$ 180,00" }] },
    { id: 26, nome: "Botox capilar", link: "", grupo: "tratamentos", opcoes: [
        // Um link por tamanho: cole em link: "" de cada linha abaixo.
        { tam: "M", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692459", duracao: "2h", preco: "a partir de R$ 210,00" },
        { tam: "G", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1005555", duracao: "30min", preco: "a partir de R$ 240,00" }
    ] },
    { id: 27, nome: "Reconstrução", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692466", grupo: "tratamentos", opcoes: [{ duracao: "1h", preco: "a partir de R$ 140,00" }] },
    { id: 28, nome: "Reconstrução molecular L’oreal", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1039598", grupo: "tratamentos", opcoes: [{ duracao: "1h30min", preco: "a partir de R$ 145,90" }] },
    { id: 29, nome: "Reparação Pro Lowell", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/945922", grupo: "tratamentos", opcoes: [{ duracao: "30min", preco: "a partir de R$ 130,00" }] },
    { id: 30, nome: "Tratamento Reparação Pro Lowell", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/980461", grupo: "tratamentos", opcoes: [{ duracao: "1h", preco: "a partir de R$ 130,00" }] },
    { id: 31, nome: "Tratamento Metal Detox L’oreal", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/980462", grupo: "tratamentos", opcoes: [{ duracao: "1h", preco: "a partir de R$ 198,00" }] },
    { id: 32, nome: "Cauterização incluso escova", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692472", grupo: "tratamentos", opcoes: [{ duracao: "1h", preco: "a partir de R$ 149,00" }] },
    { id: 33, nome: "Hidratação ácido hialurônico", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/709404", grupo: "tratamentos", descricao: "Para cabelos secos e ressecados.", opcoes: [{ duracao: "1h30min", preco: "a partir de R$ 130,00" }] },
    { id: 34, nome: "Hidratação fortalecedora e estimulante de crescimento", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692468", grupo: "tratamentos", opcoes: [{ duracao: "1h", preco: "a partir de R$ 130,00" }] },
    { id: 35, nome: "Hidratação L’oreal com escova", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/955671", grupo: "tratamentos", opcoes: [{ duracao: "30min", preco: "a partir de R$ 139,00" }] },
    { id: 36, nome: "Hidratação capilar sem escova", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692465", grupo: "tratamentos", opcoes: [{ duracao: "1h", preco: "a partir de R$ 90,00" }] },
    { id: 37, nome: "Cronograma capilar ouro (3 sessões)", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692471", grupo: "tratamentos", opcoes: [{ duracao: "1h", preco: "a partir de R$ 260,00" }] },
    { id: 38, nome: "Cronograma capilar Mirra", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1323358", grupo: "tratamentos", opcoes: [{ duracao: "1h", preco: "a partir de R$ 280,00" }] },
    { id: 39, nome: "Cronograma capilar repair (4 sessões)", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692473", grupo: "tratamentos", opcoes: [{ duracao: "1h30min", preco: "a partir de R$ 380,00" }] },
    { id: 40, nome: "Corte feminino", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692328", grupo: "corte", opcoes: [{ duracao: "30min", preco: "a partir de R$ 85,00" }] },
    { id: 41, nome: "Corte com escova", link: "", grupo: "corte", opcoes: [
        // Um link por tamanho: cole em link: "" de cada linha abaixo.
        { tam: "P e M", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1146162", duracao: "1h", preco: "a partir de R$ 129,00" },
        { tam: "G", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1205251", duracao: "1h", preco: "a partir de R$ 159,00" }
    ] },
    { id: 42, nome: "Corte com hidratação e escova", link: "", grupo: "corte", opcoes: [
        // Um link por tamanho: cole em link: "" de cada linha abaixo.
        { tam: "P e M", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1205248", duracao: "1h", preco: "a partir de R$ 159,00" },
        { tam: "G", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1205245", duracao: "1h", preco: "a partir de R$ 198,00" }
    ] },
    { id: 43, nome: "Escova", link: "", grupo: "corte", opcoes: [
        // Um link por tamanho: cole em link: "" de cada linha abaixo.
        { tam: "P", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692422", duracao: "40min", preco: "a partir de R$ 80,00" },
        { tam: "M", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1005557", duracao: "30min", preco: "a partir de R$ 90,00" },
        { tam: "G", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1005559", duracao: "30min", preco: "a partir de R$ 100,00" }
    ] },
    { id: 44, nome: "Escova acetinada", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692467", grupo: "corte", opcoes: [{ duracao: "1h", preco: "a partir de R$ 100,00" }] },
    { id: 45, nome: "Escova com baby liss", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1005551", grupo: "corte", opcoes: [{ duracao: "30min", preco: "a partir de R$ 120,00" }] },
    { id: 46, nome: "Penteado", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/695322", grupo: "corte", opcoes: [{ duracao: "30min", preco: "a partir de R$ 150,00" }] },
    { id: 47, nome: "Aplicação de produto", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1376585", grupo: "corte", opcoes: [{ duracao: "30min", preco: "a partir de R$ 90,00" }] }
  ],
  manicure: [
    { id: 48, nome: "Pé e mão", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692318", opcoes: [{ duracao: "2h", preco: "a partir de R$ 60,00" }] },
    { id: 49, nome: "Mão", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692426", opcoes: [{ duracao: "1h", preco: "a partir de R$ 30,00" }] },
    { id: 50, nome: "Esmaltação", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/696801", opcoes: [{ duracao: "30min", preco: "a partir de R$ 20,00" }] },
    { id: 51, nome: "Esmaltação em gel (pé)", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1303025", opcoes: [{ duracao: "2h", preco: "a partir de R$ 85,00" }] },
    { id: 52, nome: "Plástica dos pés", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/954338", opcoes: [{ duracao: "30min", preco: "a partir de R$ 60,00" }] },
    { id: 53, nome: "Banho de gel", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/987741", opcoes: [{ duracao: "2h", preco: "a partir de R$ 100,00" }] },
    { id: 54, nome: "Alongamento molde F1", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1356192", opcoes: [{ duracao: "2h", preco: "a partir de R$ 140,00" }] },
    { id: 55, nome: "Alongamento molde Russo", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1370823", opcoes: [{ duracao: "2h", preco: "a partir de R$ 140,00" }] },
    { id: 56, nome: "Manutenção alongamento", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692322", opcoes: [{ duracao: "1h", preco: "a partir de R$ 100,00" }] },
    { id: 57, nome: "Remoção de alongamento", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1172531", opcoes: [{ duracao: "30min", preco: "a partir de R$ 40,00" }] },
    { id: 58, nome: "Dia Day manicure", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1383435", descricao: "Pacote de manicure com atendimento de 1h30. Confirme os itens incluídos pelo WhatsApp.", opcoes: [{ duracao: "1h30min", preco: "a partir de R$ 50,00" }] },
    { id: 59, nome: "Pacote unha", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/697430", descricao: "Pacote completo para as unhas. Confirme os itens incluídos pelo WhatsApp.", opcoes: [{ duracao: "1h", preco: "a partir de R$ 162,00" }] }
  ],
  maquiagem: [
    { id: 60, nome: "Make e penteado", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/695320", opcoes: [{ duracao: "2h", preco: "a partir de R$ 290,00" }] }
  ],
  masculino: [
    { id: 61, nome: "Corte masculino", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/692330", opcoes: [{ duracao: "30min", preco: "a partir de R$ 30,00" }] },
    { id: 62, nome: "Luzes masculino", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/693072", opcoes: [{ duracao: "30min", preco: "a partir de R$ 120,00" }] },
    { id: 63, nome: "Platinado masculino", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/967410", opcoes: [{ duracao: "2h30min", preco: "a partir de R$ 120,00" }] },
    { id: 64, nome: "Alisamento cabelo masculino", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/730510", opcoes: [{ duracao: "1h", preco: "a partir de R$ 100,00" }] }
  ],
  outros: [
    { id: 65, nome: "Escova beauty: escova nutritiva e manicure", link: "https://agendeonline.salonsoft.com.br/galheriateliedabeleza/1383434", opcoes: [{ duracao: "1h20min", preco: "a partir de R$ 99,90" }] }
  ]
};
// Rótulos e quantidades informadas pelo estabelecimento.
const categories = [
  { key: "cabelo", label: "Cabelo", total: 57 },
  { key: "manicure", label: "Manicure", total: 12 },
  { key: "maquiagem", label: "Maquiagem", total: 1 },
  { key: "masculino", label: "Masculino", total: 4 },
  { key: "outros", label: "Outros serviços", total: 1 }
];

/* ==========================================================
   UTILITÁRIOS
   ========================================================== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const isUrl = v => typeof v === "string" && /^(https?:|tel:)/.test(v);

// Cria elementos com textContent (evita innerHTML e injeção de código).
function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
}

/* ==========================================================
   AGENDAMENTO E CONTATO
   Aplica os links do CONFIG em todos os botões. Para trocar um
   link no site inteiro, basta editar o CONFIG.
   ========================================================== */
function initBookingButtons() {
  $$("[data-booking]").forEach(a => (a.href = CONFIG.bookingUrl));
  const map = {
    instagramUrl: CONFIG.instagramUrl, facebookUrl: CONFIG.facebookUrl,
    googleReviewsUrl: CONFIG.googleReviewsUrl, mapsUrl: CONFIG.mapsUrl,
    whatsappUrl: CONFIG.whatsappUrl, phoneUrl: `tel:${CONFIG.phone}`
  };
  $$("[data-link]").forEach(a => {
    const url = map[a.dataset.link];
    if (isUrl(url)) a.href = url;
    else a.setAttribute("data-pending", ""); // URL ainda não configurada: botão oculto
  });
}

// Horário de funcionamento: monta a lista a partir de CONFIG.hours.
function initHours() {
  const ul = $("#hours");
  if (!ul) return; // lista de horários removida do HTML
  CONFIG.hours.forEach(h => {
    if (!h.horario) return;
    const li = el("li");
    li.append(el("span", "hours__day", h.dias), el("span", "hours__time", h.horario));
    ul.appendChild(li);
  });
}

/* ==========================================================
   FALLBACK DE IMAGENS
   Se uma imagem não existir, troca por um placeholder elegante
   (nunca aparece o ícone de imagem quebrada).
   ========================================================== */
function attachFallback(img) {
  // Ignora a logo (data-keep) e imagens sem src, como a do lightbox, que só recebe a foto ao abrir.
  if (img.hasAttribute("data-keep") || !img.getAttribute("src")) return;
  const swap = () => {
    if (img.dataset.done) return;
    img.dataset.done = "1";
    // Logo e slides do hero: se faltar o arquivo, remove a imagem (o nome em texto e o degradê do CSS continuam).
    if (img.dataset.fallback === "logo" || img.dataset.fallback === "hero") { img.remove(); return; }
    const ph = el("div", `ph ${img.className}`, img.alt || "Galheri");
    if (img.width) ph.style.aspectRatio = `${img.getAttribute("width") || 4} / ${img.getAttribute("height") || 3}`;
    img.replaceWith(ph);
  };
  img.addEventListener("error", swap);
  if (img.complete && img.naturalWidth === 0) swap();
}
function initImageFallback(root = document) { $$("img", root).forEach(attachFallback); }

/* ==========================================================
   MENU MOBILE
   O botão alterna ☰/✕, atualiza aria-expanded e o menu fecha
   ao clicar em um link ou pressionar ESC.
   ========================================================== */
function initMobileMenu() {
  const btn = $("#burger"), nav = $("#menu"), icon = $(".burger__icon");
  const set = open => {
    nav.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open);
    btn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    icon.textContent = open ? "✕" : "☰";
  };
  btn.addEventListener("click", () => set(!nav.classList.contains("open")));
  $$("a", nav).forEach(a => a.addEventListener("click", () => set(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") set(false); });
}

/* ==========================================================
   NAVEGAÇÃO: seção ativa e botão voltar ao topo
   ========================================================== */
function initNavigation() {
  const links = $$("#menu a");
  const sections = links.map(a => $(a.getAttribute("href"))).filter(Boolean);
  const top = $("#totop");
  const onScroll = () => {
    const y = window.scrollY + 120;
    let current = sections[0];
    sections.forEach(s => { if (s.offsetTop <= y) current = s; });
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${current.id}`));
    top.hidden = window.scrollY < 600;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ==========================================================
   ESPECIALIDADES
   ========================================================== */
function initSpecialties() {
  const wrap = $("#specialties");
  // Aceita qualquer extensão: o site testa jpg, jpeg, png e webp sozinho.
  const EXT = ["jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG"];
  CONFIG.specialties.forEach(s => {
    const card = el("article", "card reveal");
    const slot = el("div", "ph");            // espaço vazio até a foto ser encontrada
    const body = el("div", "card__body");
    body.append(el("h3", "", s.titulo));
    card.append(slot, body);
    wrap.append(card);

    const base = s.img.replace(/\.[a-z0-9]+$/i, "");
    let i = 0;
    const tryNext = () => {
      if (i >= EXT.length) return;           // nenhuma foto: fica o espaço vazio
      const probe = new Image();
      probe.onload = () => {
        const img = el("img");
        img.src = probe.src; img.alt = s.titulo;
        slot.replaceWith(img);
      };
      probe.onerror = tryNext;
      probe.src = `${base}.${EXT[i++]}`;
    };
    tryNext();
  });
}

/* ==========================================================
   SERVIÇOS: busca, abas por categoria, subabas de Cabelo e grade.
   Serviços com vários tamanhos viram um único cartão com seletor.
   ========================================================== */
const hairTabs = [
  { key: "cor", label: "Cor e mechas" }, { key: "alisamento", label: "Alisamento" },
  { key: "tratamentos", label: "Tratamentos" }, { key: "corte", label: "Corte e escova" },
  { key: "todos", label: "Todos" }
];
const CLOCK = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';

function initDynamicServices() {
  const wrap = $("#service-rows");
  const norm = s => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const count = list => list.reduce((n, s) => n + s.opcoes.length, 0);
  const state = { cat: categories[0].key, group: hairTabs[0].key, q: "" };

  const tools = el("div", "svc-tools");
  const search = el("label", "svc-search");
  search.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>';
  const input = el("input");
  input.type = "search"; input.placeholder = "Buscar serviço: progressiva, botox, esmaltação...";
  input.setAttribute("aria-label", "Buscar serviço");
  search.append(input);
  const tabs = el("div", "svc-tabs"); tabs.setAttribute("role", "group"); tabs.setAttribute("aria-label", "Categorias de serviços");
  const subs = el("div", "svc-subtabs"); subs.setAttribute("role", "group"); subs.setAttribute("aria-label", "Tipos de serviço de cabelo");
  const info = el("p", "svc-info"); info.setAttribute("aria-live", "polite");
  const grid = el("div", "svc-grid");
  tools.append(search, tabs, subs);
  wrap.append(tools, info, grid);

  const pill = (label, n, on, fn) => {
    const b = el("button", "svc-pill" + (on ? " on" : "")); b.type = "button";
    b.setAttribute("aria-pressed", on ? "true" : "false");
    b.append(label + " ", el("span", "svc-n", String(n)));
    b.addEventListener("click", fn);
    return b;
  };

  function card(s, label, idx) {
    const c = el("article", "card svc");
    c.style.setProperty("--i", Math.min(idx, 9));
    const multi = s.opcoes.length > 1;
    let sel = 0;
    const top = el("div", "svc__top");
    const time = el("span", "svc__time"); time.innerHTML = CLOCK; time.title = "Duração aproximada";
    const timeTxt = document.createTextNode(""); time.append(timeTxt);
    top.append(el("span", "svc__cat", label), time);
    c.append(top, el("h3", "svc__name", s.nome));
    if (s.descricao) c.append(el("p", "svc__desc", s.descricao));
    else if (!multi && s.opcoes[0].tam) c.append(el("p", "svc__desc", `Valor para tamanho de cabelo ${s.opcoes[0].tam}.`));

    let btn = null;
    const linkOf = o => [o.link, s.link, CONFIG.bookingProfissionalUrl, CONFIG.bookingUrl].find(isUrl) || "";
    const price = el("div", "svc__price"), pv = el("div", "svc__pv");
    const small = el("small"), strong = el("strong");
    pv.append(small, strong); price.append(pv);
    const paint = () => {
      const o = s.opcoes[sel];
      timeTxt.nodeValue = o.duracao || ""; time.hidden = !o.duracao;
      const m = String(o.preco || "").match(/^(a partir de)\s*(.*)$/i);
      small.textContent = m ? "a partir de" : ""; strong.textContent = m ? m[2] : (o.preco || "");
      if (btn) btn.href = linkOf(o); // botão acompanha o tamanho escolhido
    };
    if (multi) {
      const box = el("div", "svc__opts");
      box.append(el("span", "svc__optlabel", "Tamanho do cabelo"));
      const row = el("div", "svc__chips"), chips = [];
      s.opcoes.forEach((o, k) => {
        const dupe = s.opcoes.filter(x => x.tam === o.tam).length > 1;
        const b = el("button", "svc__chip" + (k === 0 ? " on" : ""), dupe ? `${o.tam} · ${o.duracao}` : (o.tam || o.duracao));
        b.type = "button"; b.setAttribute("aria-pressed", k === 0 ? "true" : "false");
        b.addEventListener("click", () => {
          sel = k; chips.forEach((x, n) => { x.classList.toggle("on", n === k); x.setAttribute("aria-pressed", n === k ? "true" : "false"); });
          paint();
        });
        chips.push(b); row.append(b);
      });
      box.append(row); c.append(box);
    } else if (s.opcoes[0].tam) {
      const t = el("span", "svc__size", `Tam ${s.opcoes[0].tam}`); t.title = "Tamanho do cabelo"; price.append(t);
    }
    paint();
    c.append(price);
    btn = el("a", "svc__btn", "Agendar horário");
    btn.href = linkOf(s.opcoes[sel]); btn.target = "_blank"; btn.rel = "noopener noreferrer";
    btn.setAttribute("aria-label", `Agendar ${s.nome}`);
    c.append(btn);
    return c;
  }

  function visible() {
    if (state.q) {
      const q = norm(state.q), out = [];
      categories.forEach(cat => (services[cat.key] || []).forEach(s => {
        const g = hairTabs.find(h => h.key === s.grupo);
        if (norm([s.nome, s.descricao || "", cat.label, g ? g.label : ""].join(" ")).includes(q)) out.push({ s, label: cat.label });
      }));
      return out;
    }
    const cat = categories.find(c => c.key === state.cat);
    let list = services[cat.key] || [];
    if (cat.key === "cabelo" && state.group !== "todos") list = list.filter(s => s.grupo === state.group);
    return list.map(s => ({ s, label: cat.label }));
  }

  function draw() {
    tabs.replaceChildren(...categories.map(c => pill(c.label, count(services[c.key] || []), !state.q && c.key === state.cat,
      () => { state.cat = c.key; state.q = ""; input.value = ""; draw(); })));
    subs.replaceChildren();
    subs.hidden = !!state.q || state.cat !== "cabelo";
    if (!subs.hidden) subs.append(...hairTabs.map(g => pill(g.label,
      count(g.key === "todos" ? services.cabelo : services.cabelo.filter(s => s.grupo === g.key)), g.key === state.group,
      () => { state.group = g.key; draw(); })));
    const items = visible();
    info.textContent = state.q && items.length ? `${items.length} ${items.length === 1 ? "serviço encontrado" : "serviços encontrados"} para "${state.q}"` : "";
    grid.replaceChildren(...items.map((x, i) => card(x.s, x.label, i)));
    if (!items.length) grid.append(el("p", "svc-empty", "Nenhum serviço encontrado. Tente outra palavra ou fale com a gente pelo WhatsApp."));
  }
  input.addEventListener("input", () => { state.q = input.value.trim(); draw(); });
  draw();
}

/* ==========================================================
   GALERIA + INSTAGRAM (miniaturas clicáveis que abrem o lightbox)
   ========================================================== */
let lightboxItems = [];
function buildThumbs(target, srcs, altBase) {
  if (!target) return; // seção removida do HTML: nada a montar
  srcs.forEach((src, i) => {
    const b = el("button");
    b.type = "button"; b.setAttribute("aria-label", `Ampliar ${altBase} ${i + 1}`);
    const img = el("img");
    img.src = src; img.alt = `${altBase} ${i + 1}`; img.width = 400; img.height = 400; img.loading = "lazy";
    b.append(img);
    b.addEventListener("click", () => openLightbox(srcs, i, `${altBase} ${i + 1}`));
    target.append(b);
  });
}
function initGallery() {
  buildThumbs($("#gallery"), CONFIG.gallery, "Resultado");
  buildThumbs($("#insta"), CONFIG.instagram, "Foto do Instagram");
}

/* ==========================================================
   LIGHTBOX: setas, ESC e clique fora para fechar
   ========================================================== */
let lbIndex = 0, lbOpener = null, lbAlt = "";
function showLb() {
  const img = $("#lb-img");
  img.src = lightboxItems[lbIndex];
  img.alt = `${lbAlt.replace(/\d+$/, "")}${lbIndex + 1}`;
}
function openLightbox(items, i, alt) {
  lightboxItems = items; lbIndex = i; lbAlt = alt; lbOpener = document.activeElement;
  $("#lightbox").hidden = false;
  document.body.style.overflow = "hidden";
  showLb(); $(".lb-close").focus();
}
function closeLightbox() {
  $("#lightbox").hidden = true;
  document.body.style.overflow = "";
  if (lbOpener) lbOpener.focus();
}
function initLightbox() {
  const lb = $("#lightbox");
  const step = d => { lbIndex = (lbIndex + d + lightboxItems.length) % lightboxItems.length; showLb(); };
  $(".lb-close").addEventListener("click", closeLightbox);
  $(".lb-prev").addEventListener("click", () => step(-1));
  $(".lb-next").addEventListener("click", () => step(1));
  // Clique no fundo escuro (fora da imagem e dos botões) fecha.
  lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
}

/* ==========================================================
   ANTES E DEPOIS
   Esconde a seção automaticamente se CONFIG.beforeAfter estiver vazio.
   ========================================================== */
function initBeforeAfter() {
  const sec = $("#transformacoes");
  if (!CONFIG.beforeAfter.length) { sec.hidden = true; return; }
  sec.hidden = false;
  CONFIG.beforeAfter.forEach((p, i) => {
    const fig = el("figure", "reveal");
    [["antes", "Antes"], ["depois", "Depois"]].forEach(([k, t]) => {
      const img = el("img");
      img.src = p[k]; img.alt = `${t} - transformação ${i + 1}`; img.width = 400; img.height = 500; img.loading = "lazy";
      fig.append(img);
    });
    fig.append(el("figcaption", "", "Antes | Depois"));
    $("#ba").append(fig);
  });
}

/* ==========================================================
   ANIMAÇÕES AO ROLAR
   IntersectionObserver adiciona .in quando o elemento aparece.
   O CSS desativa o efeito para prefers-reduced-motion.
   ========================================================== */
function initScrollAnimations() {
  // Títulos, textos e itens de grade entram com atraso escalonado.
  $$(".section h2, .section .lead, .about p, .about address, .cta h2, .cta p, .cta .btn, #specialties .card, .gallery > *")
    .forEach((e, i) => {
      e.classList.add("reveal");
      if (e.matches("#specialties .card, .gallery > *")) e.style.setProperty("--d", (i % 4) * 0.09 + "s");
    });
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach(i => i.classList.add("in")); return; }
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("in"); io.unobserve(e.target);
      // Depois da entrada, libera transições rápidas de hover.
      setTimeout(() => e.target.classList.add("done"), 1400);
    }
  }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  items.forEach(i => io.observe(i));
}

// Cabeçalho ganha sombra suave ao rolar a página.
function initHeaderScroll() {
  const h = $(".header");
  if (!h) return;
  const f = () => h.classList.toggle("scrolled", window.scrollY > 10);
  f(); window.addEventListener("scroll", f, { passive: true });
}

/* ==========================================================
   SLIDESHOW DO HERO
   Alterna a cada 5 segundos entre as imagens que carregaram.
   Com prefers-reduced-motion, mostra só a primeira.
   ========================================================== */
function initHeroSlider() {
  const box = $("#slides");
  let i = 0;
  const show = () => {
    const slides = $$("img", box);
    if (!slides.length) return;
    slides.forEach((s, n) => s.classList.toggle("on", n === i % slides.length));
  };
  show();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  setInterval(() => { i++; show(); }, 5000);
}

/* ==========================================================
   INICIALIZAÇÃO: roda quando o HTML terminou de carregar.
   A ordem importa: primeiro criamos o conteúdo dinâmico, depois
   aplicamos links, fallback de imagens e animações.
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initSpecialties();
  initDynamicServices();
  initGallery();
  initBeforeAfter();
  initHours();
  initBookingButtons();
  initImageFallback();
  initHeroSlider();
  initMobileMenu();
  initNavigation();
  initLightbox();
  initScrollAnimations();
  initHeaderScroll();
});