import 'kleur/colors';
import { p as decodeKey } from './chunks/astro/server_hy5EYIg1.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BMIGIop6.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/agustin/code/uniwave-social-media/landing-page/","cacheDir":"file:///home/agustin/code/uniwave-social-media/landing-page/node_modules/.astro/","outDir":"file:///home/agustin/code/uniwave-social-media/landing-page/dist/","srcDir":"file:///home/agustin/code/uniwave-social-media/landing-page/src/","publicDir":"file:///home/agustin/code/uniwave-social-media/landing-page/public/","buildClientDir":"file:///home/agustin/code/uniwave-social-media/landing-page/dist/client/","buildServerDir":"file:///home/agustin/code/uniwave-social-media/landing-page/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/activation.hgbH4-EY.css"},{"type":"inline","content":".activation-container{margin-top:70px;width:700px;height:400px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:20px;border:2px solid var(--primary-color)}.activation-container h1{color:var(--text-color);text-decoration:underline var(--primary-color);font-weight:600}.activation-container p{font-weight:500}.activation-container i{font-size:50px}.waiting{color:var(--primary-color)!important}.error{color:red}.success{color:#08b908}@media (max-width:712px){.activation-container{width:500px}}@media (max-width:500px){.activation-container{width:300px}}\n"}],"routeData":{"route":"/activation","isIndex":false,"type":"page","pattern":"^\\/activation\\/?$","segments":[[{"content":"activation","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/activation.astro","pathname":"/activation","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/activation.hgbH4-EY.css"},{"type":"external","src":"/_astro/index.DBwKbh2v.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/agustin/code/uniwave-social-media/landing-page/src/pages/activation.astro",{"propagation":"none","containsHead":true}],["/home/agustin/code/uniwave-social-media/landing-page/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/activation@_@astro":"pages/activation.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BW0tTzbK.mjs","/home/agustin/code/uniwave-social-media/landing-page/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_D3XR_8CQ.mjs","/home/agustin/code/uniwave-social-media/landing-page/src/components/react/Activation.tsx":"_astro/Activation.CxCNJOwd.js","@astrojs/react/client.js":"_astro/client.DVxemvf8.js","/home/agustin/code/uniwave-social-media/landing-page/src/components/Navbar.astro?astro&type=script&index=0&lang.ts":"_astro/Navbar.astro_astro_type_script_index_0_lang.MfRDNjlL.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/agustin/code/uniwave-social-media/landing-page/src/components/Navbar.astro?astro&type=script&index=0&lang.ts","const e=document.querySelector(\".hamburger\"),t=document.querySelector(\".mobile-menu\");function r(){e?.setAttribute(\"aria-expanded\",\"false\"),e?.classList.remove(\"open\"),t?.classList.remove(\"open\"),t?.setAttribute(\"aria-hidden\",\"true\")}e?.addEventListener(\"click\",()=>{e.getAttribute(\"aria-expanded\")===\"true\"?r():(e.setAttribute(\"aria-expanded\",\"true\"),e.classList.add(\"open\"),t?.classList.add(\"open\"),t?.setAttribute(\"aria-hidden\",\"false\"))});document.querySelectorAll(\".mobile-link, .mobile-cta\").forEach(i=>{i.addEventListener(\"click\",r)});"]],"assets":["/_astro/activation.hgbH4-EY.css","/_astro/index.DBwKbh2v.css","/arrow-down-circle.png","/favicon.svg","/logo.png","/_astro/Activation.CxCNJOwd.js","/_astro/activation.C4XiHDtv.css","/_astro/client.DVxemvf8.js","/_astro/index.RH_Wq4ov.js","/examples/example1.jpg","/examples/example2.jpg","/examples/example3.jpg","/examples/example4.jpg","/examples/example5.jpg","/examples/example6.jpg"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"BLUQVQBwqCHlttuNgl4JflxYepGWep8JuVygJ1eIie8="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
