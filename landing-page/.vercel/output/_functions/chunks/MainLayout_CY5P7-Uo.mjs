import { e as createComponent, m as maybeRenderHead, l as renderScript, h as addAttribute, r as renderTemplate, f as createAstro, n as renderHead, k as renderComponent, o as renderSlot } from './astro/server_hy5EYIg1.mjs';
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
  return renderTemplate`${maybeRenderHead()}<header data-astro-cid-5blmo7yk> <nav data-astro-cid-5blmo7yk> <a href="/#" class="logo" data-astro-cid-5blmo7yk> <img src="/logo.png" alt="UniWave" data-astro-cid-5blmo7yk> <span data-astro-cid-5blmo7yk>UniWave</span> </a> <ul class="nav-links" data-astro-cid-5blmo7yk> ${links.map((link) => renderTemplate`<li data-astro-cid-5blmo7yk> <a class="nav-link"${addAttribute(link.href, "href")} data-astro-cid-5blmo7yk>${link.label}</a> </li>`)} </ul> <div class="nav-right" data-astro-cid-5blmo7yk> <a class="btn-download" href="/#download" data-astro-cid-5blmo7yk>Descargar</a> <button class="hamburger" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-menu" data-astro-cid-5blmo7yk> <svg class="icon-menu" width="22" height="22" viewBox="0 0 22 22" fill="none" data-astro-cid-5blmo7yk> <line x1="2" y1="6" x2="20" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-astro-cid-5blmo7yk></line> <line x1="2" y1="11" x2="20" y2="11" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-astro-cid-5blmo7yk></line> <line x1="2" y1="16" x2="20" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-astro-cid-5blmo7yk></line> </svg> <svg class="icon-close" width="22" height="22" viewBox="0 0 22 22" fill="none" data-astro-cid-5blmo7yk> <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-astro-cid-5blmo7yk></line> <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-astro-cid-5blmo7yk></line> </svg> </button> </div> </nav> <div class="mobile-menu" id="mobile-menu" aria-hidden="true" data-astro-cid-5blmo7yk> <ul data-astro-cid-5blmo7yk> ${links.map((link) => renderTemplate`<li data-astro-cid-5blmo7yk> <a class="mobile-link"${addAttribute(link.href, "href")} data-astro-cid-5blmo7yk>${link.label}</a> </li>`)} </ul> <a class="mobile-cta" href="/#download" data-astro-cid-5blmo7yk>Descargar App</a> </div> </header> ${renderScript($$result, "/home/agustin/code/uniwave-social-media/landing-page/src/components/Navbar.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/agustin/code/uniwave-social-media/landing-page/src/components/Navbar.astro", void 0);

const $$Astro = createAstro();
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  return renderTemplate`<html lang="es" data-astro-cid-ouamjn2i> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="description" content="UniWave: la app para conectar con tu universidad. Compartí momentos, encontrá grupos y enterate de todo lo que pasa en tu facu. Gratis para estudiantes."><link rel="icon" href="/logo.png" type="image/png"><link href="https://cdn.boxicons.com/fonts/basic/boxicons.min.css" rel="stylesheet"><title>UniWave — La red social de tu facu</title>${renderHead()}</head> <body data-astro-cid-ouamjn2i> ${renderComponent($$result, "Navbar", $$Navbar, { "data-astro-cid-ouamjn2i": true })} <main class="fade-in" data-astro-cid-ouamjn2i> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "/home/agustin/code/uniwave-social-media/landing-page/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $ };
