import { e as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent } from '../chunks/astro/server_DrDn8TWQ.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_CB-cd3_9.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Features = createComponent(($$result, $$props, $$slots) => {
  const features = [
    {
      img: "/examples/example1.jpg",
      title: "\u{1F510} Iniciar Sesi\xF3n",
      description: "Accede a tu cuenta de forma segura y r\xE1pida"
      // icon: "🔐",
    },
    {
      img: "/examples/example2.jpg",
      title: "\u{1F4DD} Registrarse",
      description: "Crea tu cuenta y \xFAnete a la comunidad universitaria"
      // icon: "📝",
    },
    {
      img: "/examples/example3.jpg",
      title: "\u{1F4F1} Publicaciones",
      description: "Comparte experiencias, fotos y momentos con tus compa\xF1eros"
      // icon: "📱",
    },
    {
      img: "/examples/example4.jpg",
      title: "\u{1F465} Grupos y B\xFAsquedas",
      description: "Encuentra y \xFAnete a grupos de tu carrera o intereses"
      // icon: "👥",
    },
    {
      img: "/examples/example5.jpg",
      title: "\u{1F464} Perfil",
      description: "Personaliza tu perfil y muestra tu identidad universitaria"
      // icon: "👤",
    },
    {
      img: "/examples/example6.jpg",
      title: "\u270F\uFE0F Editar Perfil",
      description: "Actualiza tu informaci\xF3n y mant\xE9n tu perfil al d\xEDa"
      // icon: "✏️",
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="features" data-astro-cid-vnivfuh2> <div class="features-header" data-astro-cid-vnivfuh2> <span class="section-tag" data-astro-cid-vnivfuh2>Funcionalidades</span> <h2 data-astro-cid-vnivfuh2>Descubre todo lo que UniWave tiene para ofrecerte</h2> <p data-astro-cid-vnivfuh2>Una experiencia diseñada para conectar, compartir y vivir la universidad al máximo</p> </div> <div class="features-grid" data-astro-cid-vnivfuh2> ${features.map((feature, index) => renderTemplate`<div class="feature-card"${addAttribute(`--delay: ${index * 0.1}s`, "style")} data-astro-cid-vnivfuh2> <div class="feature-image" data-astro-cid-vnivfuh2> <img${addAttribute(feature.img, "src")}${addAttribute(feature.title, "alt")} data-astro-cid-vnivfuh2> <div class="feature-overlay" data-astro-cid-vnivfuh2></div> </div> <div class="feature-content" data-astro-cid-vnivfuh2> <div class="feature-icon" data-astro-cid-vnivfuh2>${feature.title.split(" ")[0]}</div> <h3 data-astro-cid-vnivfuh2>${feature.title.substring(feature.title.indexOf(" ") + 1)}</h3> <p data-astro-cid-vnivfuh2>${feature.description}</p> </div> </div>`)} </div> </section> `;
}, "/home/agustin/code/uniwave-social-media/landing-page/src/components/Features.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer data-astro-cid-sz7xmlte> <div class="footer-container" data-astro-cid-sz7xmlte> <div class="footer-main" data-astro-cid-sz7xmlte> <div class="footer-brand" data-astro-cid-sz7xmlte> <img src="/logo.png" alt="UniWave Logo" data-astro-cid-sz7xmlte> <div class="brand-text" data-astro-cid-sz7xmlte> <span class="brand-name" data-astro-cid-sz7xmlte>UniWave</span> <span class="brand-tagline" data-astro-cid-sz7xmlte>La comunidad universitaria</span> </div> </div> <div class="footer-links" data-astro-cid-sz7xmlte> <a href="#features" data-astro-cid-sz7xmlte>Funcionalidades</a> <a href="#download" data-astro-cid-sz7xmlte>Descargar</a> <a href="#contact" data-astro-cid-sz7xmlte>Contacto</a> <a href="https://bandicoot.solutions" target="_blank" rel="noopener" data-astro-cid-sz7xmlte>Bandicoot</a> </div> </div> <div class="footer-bottom" data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>&copy; 2025 Bandicoot Solutions. Todos los derechos reservados.</p> </div> </div> </footer> `;
}, "/home/agustin/code/uniwave-social-media/landing-page/src/components/Footer.astro", void 0);

const $$FAQ = createComponent(($$result, $$props, $$slots) => {
  const faqs = [
    {
      question: "\xBFQu\xE9 es UniWave?",
      answer: "UniWave es una aplicaci\xF3n dise\xF1ada para ayudar a los estudiantes a conectarse con sus compa\xF1eros, compartir experiencias y descubrir todo lo que est\xE1 sucediendo en su universidad."
    },
    {
      question: "\xBFC\xF3mo puedo descargar la aplicaci\xF3n?",
      answer: "Puedes descargar UniWave directamente desde Google Play (para dispositivos Android). La versi\xF3n para iOS estar\xE1 disponible pr\xF3ximamente en la App Store."
    },
    {
      question: "\xBFEs UniWave gratuita?",
      answer: "S\xED, UniWave es completamente gratuita para todos los estudiantes. No tendr\xE1s que pagar nada para descargarla y usar sus funciones."
    },
    {
      question: "\xBFEn qu\xE9 universidades est\xE1 disponible UniWave?",
      answer: "UniWave est\xE1 disponible para estudiantes de todas las universidades. Si tu universidad a\xFAn no est\xE1 en la plataforma, puedes sugerirla a trav\xE9s del correo electr\xF3nico de contacto."
    },
    {
      question: "\xBFPuedo sugerir una nueva funci\xF3n para la app?",
      answer: "S\xED, nos encantar\xEDa recibir tus sugerencias. Puedes enviarlas por correo electr\xF3nico a bandicoot.solutions@gmail.com."
    },
    {
      question: "\xBFQui\xE9n es Bandicoot Solutions?",
      answer: "En Bandicoot creemos en el poder de las ideas simples que generan grandes resultados. Somos dos desarrolladores apasionados por la programaci\xF3n, construyendo soluciones tecnol\xF3gicas con visi\xF3n de futuro. Descubr\xED m\xE1s en nuestra Landing Page oficial."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="faq" data-astro-cid-al2ca2vr> <div class="faq-container" data-astro-cid-al2ca2vr> <div class="faq-header" data-astro-cid-al2ca2vr> <span class="section-tag" data-astro-cid-al2ca2vr>FAQ</span> <h2 data-astro-cid-al2ca2vr>Preguntas Frecuentes</h2> <p data-astro-cid-al2ca2vr>Todo lo que necesitas saber sobre UniWave</p> </div> <div class="faq-grid" data-astro-cid-al2ca2vr> ${faqs.map((faq, index) => renderTemplate`<details class="faq-item"${addAttribute(`--delay: ${index * 0.1}s`, "style")} data-astro-cid-al2ca2vr> <summary data-astro-cid-al2ca2vr> <span class="faq-number" data-astro-cid-al2ca2vr>${(index + 1).toString().padStart(2, "0")}</span> <span class="faq-question" data-astro-cid-al2ca2vr>${faq.question}</span> <svg class="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-al2ca2vr> <path d="M12 5v14M5 12l7 7 7-7" data-astro-cid-al2ca2vr></path> </svg> </summary> <p data-astro-cid-al2ca2vr>${faq.answer}</p> </details>`)} </div> </div> </section> `;
}, "/home/agustin/code/uniwave-social-media/landing-page/src/components/FAQ.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section id="hero" data-astro-cid-j7pv25f6> <div class="hero-container" data-astro-cid-j7pv25f6> <div class="hero-content" data-astro-cid-j7pv25f6> <span class="hero-badge" data-astro-cid-j7pv25f6>La comunidad universitaria que necesitabas</span> <h1 data-astro-cid-j7pv25f6>
Conecta con tus compañeros, comparte experiencias y descubre todo lo
					que pasa en tu universidad.
</h1> <p data-astro-cid-j7pv25f6>
Investiga, Comparte, Únete y en especial <strong data-astro-cid-j7pv25f6>Diviértete</strong> </p> <div class="hero-actions" data-astro-cid-j7pv25f6> <a class="cta-button" href="#download" data-astro-cid-j7pv25f6>
Descargar App
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j7pv25f6> <path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-j7pv25f6></path> </svg> </a> </div> </div> <figure class="hero-image" data-astro-cid-j7pv25f6> <div class="phone-frame" data-astro-cid-j7pv25f6> <img src="/examples/example1.jpg" alt="UniWave App" data-astro-cid-j7pv25f6> </div> <div class="floating-element element-1" data-astro-cid-j7pv25f6></div> <div class="floating-element element-2" data-astro-cid-j7pv25f6></div> </figure> </div> </section> <div class="scroll-indicator" data-astro-cid-j7pv25f6> <a href="#features" data-astro-cid-j7pv25f6> <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j7pv25f6> <path d="M12 5v14M5 12l7 7 7-7" data-astro-cid-j7pv25f6></path> </svg> </a> <span data-astro-cid-j7pv25f6>Descubre más</span> </div> <div class="section-divider" data-astro-cid-j7pv25f6></div>  ${renderComponent($$result2, "Features", $$Features, { "data-astro-cid-j7pv25f6": true })} <div class="section-divider" data-astro-cid-j7pv25f6></div>  <section id="download" data-astro-cid-j7pv25f6> <div class="cta-content" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>¿Listo para empezar?</h2> <p data-astro-cid-j7pv25f6>Únete a miles de estudiantes que ya están usando UniWave</p> <div class="cta-buttons" data-astro-cid-j7pv25f6> <a href="#" class="store-button android-store" data-astro-cid-j7pv25f6> <div class="store-icon" data-astro-cid-j7pv25f6> <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-j7pv25f6> <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" data-astro-cid-j7pv25f6></path> </svg> </div> <div class="store-text" data-astro-cid-j7pv25f6> <span class="store-label" data-astro-cid-j7pv25f6>Disponible en</span> <span class="store-name" data-astro-cid-j7pv25f6>Google Play</span> </div> </a> <a href="#" class="store-button apple-store disabled" data-astro-cid-j7pv25f6> <div class="store-icon" data-astro-cid-j7pv25f6> <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-j7pv25f6> <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" data-astro-cid-j7pv25f6></path> </svg> </div> <div class="store-text" data-astro-cid-j7pv25f6> <span class="store-label" data-astro-cid-j7pv25f6>Próximamente en</span> <span class="store-name" data-astro-cid-j7pv25f6>App Store</span> </div> </a> </div> </div> </section> <div class="section-divider" data-astro-cid-j7pv25f6></div>  <section id="contact" data-astro-cid-j7pv25f6> <div class="contact-content" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>¿Quieres aportar a este proyecto?</h2> <p data-astro-cid-j7pv25f6>Dinos tus ideas y sugerencias para mejorar UniWave.</p> <div class="contact-info" data-astro-cid-j7pv25f6> <div class="contact-email" data-astro-cid-j7pv25f6> <div class="email-icon" data-astro-cid-j7pv25f6>💡</div> <div class="email-details" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Envíanos tus ideas</h3> <p data-astro-cid-j7pv25f6>bandicoot.solutions@gmail.com</p> </div> </div> <a href="mailto:bandicoot.solutions@gmail.com" class="contact-button" data-astro-cid-j7pv25f6>
Compartir Ideas
</a> </div> </div> </section> <div class="section-divider" data-astro-cid-j7pv25f6></div> ${renderComponent($$result2, "FAQ", $$FAQ, { "data-astro-cid-j7pv25f6": true })} <div class="section-divider" data-astro-cid-j7pv25f6></div>  ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-j7pv25f6": true })} ` })} `;
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
