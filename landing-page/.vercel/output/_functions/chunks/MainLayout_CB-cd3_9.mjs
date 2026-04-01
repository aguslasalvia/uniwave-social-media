import { e as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, f as createAstro, l as renderHead, k as renderComponent, n as renderSlot } from './astro/server_DrDn8TWQ.mjs';
import 'kleur/colors';
/* empty css                              */
import 'clsx';

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const links = [
    { label: "Inicio", href: "/#" },
    { label: "Funciones", href: "/#features" },
    { label: "Descargar", href: "/#download" },
    { label: "Contacto", href: "/#contact" },
    { label: "FAQ", href: "/#faq" }
  ];
  return renderTemplate`${maybeRenderHead()}<header data-astro-cid-5blmo7yk> <nav data-astro-cid-5blmo7yk> <a href="#hero" class="logo" data-astro-cid-5blmo7yk> <img src="/logo.png" alt="App Logo" data-astro-cid-5blmo7yk> <span data-astro-cid-5blmo7yk>UniWave</span> </a> <ul class="nav-links" data-astro-cid-5blmo7yk> ${links.map((link) => renderTemplate`<li data-astro-cid-5blmo7yk> <a class="nav-link"${addAttribute(link.href, "href")} data-astro-cid-5blmo7yk> ${link.label} </a> </li>`)} </ul> <a class="btn-download" href="#download" data-astro-cid-5blmo7yk>
Descargar
</a> </nav> </header> `;
}, "/home/agustin/code/uniwave-social-media/landing-page/src/components/Navbar.astro", void 0);

const $$Astro = createAstro();
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  return renderTemplate`<html lang="en" data-astro-cid-ouamjn2i> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="icon" href="/logo.png" type="image/png"><link href="https://cdn.boxicons.com/fonts/basic/boxicons.min.css" rel="stylesheet"><title>🎓 UniWave - Landing 🎓</title>${renderHead()}</head> <body data-astro-cid-ouamjn2i> ${renderComponent($$result, "Navbar", $$Navbar, { "data-astro-cid-ouamjn2i": true })} <main class="fade-in" data-astro-cid-ouamjn2i> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "/home/agustin/code/uniwave-social-media/landing-page/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $ };
