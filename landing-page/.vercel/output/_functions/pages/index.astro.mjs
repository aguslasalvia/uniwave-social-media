import { e as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent } from '../chunks/astro/server_hy5EYIg1.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_CY5P7-Uo.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Features = createComponent(($$result, $$props, $$slots) => {
  const features = [
    {
      img: "/examples/example1.jpg",
      emoji: "\u{1F510}",
      title: "Iniciar Sesi\xF3n",
      description: "Acced\xE9 a tu cuenta de forma segura y r\xE1pida"
    },
    {
      img: "/examples/example2.jpg",
      emoji: "\u{1F4DD}",
      title: "Registrarse",
      description: "Cre\xE1 tu cuenta y unite a la comunidad universitaria"
    },
    {
      img: "/examples/example3.jpg",
      emoji: "\u{1F4F1}",
      title: "Publicaciones",
      description: "Compart\xED experiencias, fotos y momentos con tus compa\xF1eros"
    },
    {
      img: "/examples/example4.jpg",
      emoji: "\u{1F465}",
      title: "Grupos y B\xFAsquedas",
      description: "Encontr\xE1 y unite a grupos de tu carrera o intereses"
    },
    {
      img: "/examples/example5.jpg",
      emoji: "\u{1F464}",
      title: "Perfil",
      description: "Personaliz\xE1 tu perfil y mostr\xE1 tu identidad universitaria"
    },
    {
      img: "/examples/example6.jpg",
      emoji: "\u270F\uFE0F",
      title: "Editar Perfil",
      description: "Actualiz\xE1 tu informaci\xF3n y manten\xE9 tu perfil al d\xEDa"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="features" data-astro-cid-vnivfuh2> <div class="features-header" data-astro-cid-vnivfuh2> <span class="stamp" data-astro-cid-vnivfuh2>Funcionalidades</span> <h2 data-astro-cid-vnivfuh2>La cartelera: así se ve por dentro</h2> <p data-astro-cid-vnivfuh2>Capturas reales de la app, colgadas como en la cartelera de tu facultad</p> </div> <div class="board" data-astro-cid-vnivfuh2> ${features.map((feature) => renderTemplate`<article class="pinned" data-astro-cid-vnivfuh2> <span class="tape" aria-hidden="true" data-astro-cid-vnivfuh2></span> <div class="shot" data-astro-cid-vnivfuh2> <img${addAttribute(feature.img, "src")}${addAttribute(`UniWave \u2014 ${feature.title}`, "alt")} loading="lazy" data-astro-cid-vnivfuh2> </div> <h3 data-astro-cid-vnivfuh2> <span class="feature-emoji" aria-hidden="true" data-astro-cid-vnivfuh2>${feature.emoji}</span> ${feature.title} </h3> <p data-astro-cid-vnivfuh2>${feature.description}</p> </article>`)} </div> <div class="scroll-hint" aria-hidden="true" data-astro-cid-vnivfuh2> <span data-astro-cid-vnivfuh2></span> <span data-astro-cid-vnivfuh2></span> <span data-astro-cid-vnivfuh2></span> </div> </section> `;
}, "/home/agustin/code/uniwave-social-media/landing-page/src/components/Features.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer data-astro-cid-sz7xmlte> <div class="footer-container" data-astro-cid-sz7xmlte> <div class="footer-main" data-astro-cid-sz7xmlte> <a href="/#" class="brand-logo" data-astro-cid-sz7xmlte> <img src="/logo.png" alt="UniWave" data-astro-cid-sz7xmlte> <div class="brand-text" data-astro-cid-sz7xmlte> <span class="brand-name" data-astro-cid-sz7xmlte>UniWave</span> <span class="brand-tagline" data-astro-cid-sz7xmlte>La comunidad universitaria</span> </div> </a> <nav class="footer-nav" aria-label="Footer navigation" data-astro-cid-sz7xmlte> <a class="footer-link" href="/#features" data-astro-cid-sz7xmlte>Funciones</a> <a class="footer-link" href="/#download" data-astro-cid-sz7xmlte>Descargar</a> <a class="footer-link" href="/#contact" data-astro-cid-sz7xmlte>Contacto</a> <a class="footer-link" href="/#faq" data-astro-cid-sz7xmlte>FAQ</a> <a class="footer-link" href="https://bandicoot.solutions" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte>Bandicoot</a> </nav> </div> <div class="footer-bottom" data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>&copy; 2025 Bandicoot Solutions. Todos los derechos reservados.</p> <a class="footer-email" href="mailto:contact@aguslasalvia.online" data-astro-cid-sz7xmlte>
contact@aguslasalvia.online
</a> </div> </div> </footer> `;
}, "/home/agustin/code/uniwave-social-media/landing-page/src/components/Footer.astro", void 0);

const $$FAQ = createComponent(($$result, $$props, $$slots) => {
  const faqs = [
    {
      question: "\xBFQu\xE9 es UniWave?",
      answer: "UniWave es una aplicaci\xF3n dise\xF1ada para ayudar a los estudiantes a conectarse con sus compa\xF1eros, compartir experiencias y descubrir todo lo que est\xE1 sucediendo en su universidad."
    },
    {
      question: "\xBFC\xF3mo puedo descargar la aplicaci\xF3n?",
      answer: "Pod\xE9s descargar UniWave directamente desde Google Play (para dispositivos Android). La versi\xF3n para iOS estar\xE1 disponible pr\xF3ximamente en la App Store."
    },
    {
      question: "\xBFEs UniWave gratuita?",
      answer: "S\xED, UniWave es completamente gratuita para todos los estudiantes. No vas a tener que pagar nada para descargarla y usar sus funciones."
    },
    {
      question: "\xBFEn qu\xE9 universidades est\xE1 disponible UniWave?",
      answer: "UniWave est\xE1 disponible para estudiantes de todas las universidades. Si tu universidad a\xFAn no est\xE1 en la plataforma, pod\xE9s sugerirla a trav\xE9s del correo electr\xF3nico de contacto."
    },
    {
      question: "\xBFPuedo sugerir una nueva funci\xF3n para la app?",
      answer: "S\xED, nos encantar\xEDa recibir tus sugerencias. Pod\xE9s enviarlas por correo electr\xF3nico a contact@aguslasalvia.online."
    },
    {
      question: "\xBFQui\xE9n es Bandicoot Solutions?",
      answer: "En Bandicoot creemos en el poder de las ideas simples que generan grandes resultados. Somos dos desarrolladores apasionados por la programaci\xF3n, construyendo soluciones tecnol\xF3gicas con visi\xF3n de futuro."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="faq" data-astro-cid-al2ca2vr> <div class="faq-container" data-astro-cid-al2ca2vr> <div class="faq-header" data-astro-cid-al2ca2vr> <span class="stamp" data-astro-cid-al2ca2vr>FAQ</span> <h2 data-astro-cid-al2ca2vr>Preguntas frecuentes</h2> <p data-astro-cid-al2ca2vr>Todo lo que necesitás saber sobre UniWave</p> </div> <div class="faq-list" data-astro-cid-al2ca2vr> ${faqs.map((faq) => renderTemplate`<details class="faq-item" data-astro-cid-al2ca2vr> <summary data-astro-cid-al2ca2vr> <span class="faq-q" data-astro-cid-al2ca2vr>${faq.question}</span> <svg class="faq-plus" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" data-astro-cid-al2ca2vr> <path d="M12 5v14M5 12h14" data-astro-cid-al2ca2vr></path> </svg> </summary> <div class="faq-body" data-astro-cid-al2ca2vr> <p data-astro-cid-al2ca2vr>${faq.answer}</p> </div> </details>`)} </div> </div> </section> `;
}, "/home/agustin/code/uniwave-social-media/landing-page/src/components/FAQ.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section id="hero" data-astro-cid-j7pv25f6> <div class="hero-container" data-astro-cid-j7pv25f6> <div class="hero-content" data-astro-cid-j7pv25f6> <span class="stamp" data-astro-cid-j7pv25f6>Hecha por estudiantes, para estudiantes</span> <h1 data-astro-cid-j7pv25f6>
Toda tu facu,<br data-astro-cid-j7pv25f6>
en <span class="mark" data-astro-cid-j7pv25f6>una sola app</span>.
</h1> <p data-astro-cid-j7pv25f6>
Compartí momentos, encontrá tu grupo y enterate de todo lo que
					pasa en el campus. Gratis, para todos los estudiantes.
</p> <div class="hero-actions" data-astro-cid-j7pv25f6> <a class="cta-primary" href="#download" data-astro-cid-j7pv25f6>
Descargar gratis
<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-j7pv25f6> <path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-j7pv25f6></path> </svg> </a> <a class="cta-ghost" href="#features" data-astro-cid-j7pv25f6>
Ver funciones
</a> </div> <div class="hero-chips" data-astro-cid-j7pv25f6> <span class="chip" data-astro-cid-j7pv25f6> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-j7pv25f6> <rect x="5" y="2" width="14" height="20" rx="2" ry="2" data-astro-cid-j7pv25f6></rect> <line x1="12" y1="18" x2="12.01" y2="18" data-astro-cid-j7pv25f6></line> </svg>
Android
</span> <span class="chip" data-astro-cid-j7pv25f6> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-j7pv25f6> <path d="M22 10v6M2 10l10-5 10 5-10 5z" data-astro-cid-j7pv25f6></path> <path d="M6 12v5c3 3 9 3 12 0v-5" data-astro-cid-j7pv25f6></path> </svg>
Todas las universidades
</span> <span class="chip" data-astro-cid-j7pv25f6>iOS próximamente</span> </div> </div> <figure class="hero-visual" data-astro-cid-j7pv25f6> <div class="phone-wrapper" data-astro-cid-j7pv25f6> <div class="phone-glow" aria-hidden="true" data-astro-cid-j7pv25f6></div> <div class="phone-frame" data-astro-cid-j7pv25f6> <img src="/examples/example3.jpg" alt="UniWave — el feed de publicaciones" data-astro-cid-j7pv25f6> </div> </div> </figure> </div> </section>  ${renderComponent($$result2, "Features", $$Features, { "data-astro-cid-j7pv25f6": true })}  <section id="download" data-astro-cid-j7pv25f6> <div class="download-content" data-astro-cid-j7pv25f6> <span class="stamp stamp-night" data-astro-cid-j7pv25f6>Disponible ahora</span> <h2 data-astro-cid-j7pv25f6>Descargá UniWave<br data-astro-cid-j7pv25f6>y sumate a la movida</h2> <p data-astro-cid-j7pv25f6>Gratis para Android. iOS próximamente.</p> <div class="store-buttons" data-astro-cid-j7pv25f6> <a href="#" class="store-btn android" data-astro-cid-j7pv25f6> <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-j7pv25f6> <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" data-astro-cid-j7pv25f6></path> </svg> <div class="store-text" data-astro-cid-j7pv25f6> <span class="store-label" data-astro-cid-j7pv25f6>Disponible en</span> <span class="store-name" data-astro-cid-j7pv25f6>Google Play</span> </div> </a> <a href="#" class="store-btn apple disabled" aria-disabled="true" data-astro-cid-j7pv25f6> <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-j7pv25f6> <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" data-astro-cid-j7pv25f6></path> </svg> <div class="store-text" data-astro-cid-j7pv25f6> <span class="store-label" data-astro-cid-j7pv25f6>Próximamente en</span> <span class="store-name" data-astro-cid-j7pv25f6>App Store</span> </div> </a> </div> </div> </section>  <section id="contact" data-astro-cid-j7pv25f6> <div class="contact-content" data-astro-cid-j7pv25f6> <span class="stamp" data-astro-cid-j7pv25f6>Sumate al proyecto</span> <h2 data-astro-cid-j7pv25f6>¿Tenés ideas? Escribinos</h2> <p data-astro-cid-j7pv25f6>Nos encanta escuchar a la comunidad. Mandanos tus sugerencias y las tenemos en cuenta.</p> <a href="mailto:contact@aguslasalvia.online" class="contact-btn" data-astro-cid-j7pv25f6> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j7pv25f6> <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" data-astro-cid-j7pv25f6></path> <polyline points="22,6 12,13 2,6" data-astro-cid-j7pv25f6></polyline> </svg>
Escribinos
</a> <p class="contact-email" data-astro-cid-j7pv25f6>contact@aguslasalvia.online</p> </div> </section> ${renderComponent($$result2, "FAQ", $$FAQ, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-j7pv25f6": true })} ` })} `;
}, "/home/agustin/code/uniwave-social-media/landing-page/src/pages/index.astro", void 0);

const $$file = "/home/agustin/code/uniwave-social-media/landing-page/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
