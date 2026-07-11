import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_hy5EYIg1.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_CY5P7-Uo.mjs';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
/* empty css                                      */
export { renderers } from '../renderers.mjs';

function Activation({ token }) {
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }
    fetch(undefined                               + "/auth/activate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ jwt: token })
    }).then((res) => {
      if (res.status !== 200) setStatus("error");
      else setStatus("success");
    }).catch(() => setStatus("error"));
  }, [token]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("section", { className: "activation-container float", children: [
    /* @__PURE__ */ jsx("h1", { children: "Activación de Cuenta" }),
    status === "loading" && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { children: "Por favor espere mientras se activa su cuenta" }),
      /* @__PURE__ */ jsx("p", { children: "No cierre esta ventana" }),
      /* @__PURE__ */ jsx("i", { className: "bx bx-hourglass waiting" })
    ] }),
    status === "success" && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { children: "Cuenta activada con éxito" }),
      /* @__PURE__ */ jsx("i", { className: "bx bx-check-circle success" })
    ] }),
    status === "error" && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { children: "Ocurrió un error al activar la cuenta" }),
      /* @__PURE__ */ jsx("i", { className: "bx bx-x-circle error" })
    ] })
  ] }) });
}

const $$Astro = createAstro();
const $$Activation = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Activation;
  const url = new URL(Astro2.request.url);
  const token = url.searchParams.get("token");
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ActivationComponent", Activation, { "token": token, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/agustin/code/uniwave-social-media/landing-page/src/components/react/Activation.tsx", "client:component-export": "default" })}  ` })}`;
}, "/home/agustin/code/uniwave-social-media/landing-page/src/pages/activation.astro", void 0);

const $$file = "/home/agustin/code/uniwave-social-media/landing-page/src/pages/activation.astro";
const $$url = "/activation";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Activation,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
