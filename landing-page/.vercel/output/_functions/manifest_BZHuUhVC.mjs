import 'kleur/colors';
import { o as decodeKey } from './chunks/astro/server_DrDn8TWQ.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Cn2Bqm6q.mjs';
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

const manifest = deserializeManifest({"hrefRoot":"file:///home/agustin/code/uniwave-social-media/landing-page/","cacheDir":"file:///home/agustin/code/uniwave-social-media/landing-page/node_modules/.astro/","outDir":"file:///home/agustin/code/uniwave-social-media/landing-page/dist/","srcDir":"file:///home/agustin/code/uniwave-social-media/landing-page/src/","publicDir":"file:///home/agustin/code/uniwave-social-media/landing-page/public/","buildClientDir":"file:///home/agustin/code/uniwave-social-media/landing-page/dist/client/","buildServerDir":"file:///home/agustin/code/uniwave-social-media/landing-page/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap\";:root{--bg-color: #111827;--text-color: #f9fafb;--primary-color: #818cf8;--accent-color: #a5b4fc;--card-bg: rgba(255, 255, 255, .05);--border-color: rgba(129, 140, 248, .1);--shadow-color: rgba(129, 140, 248, .15);--gradient-primary: linear-gradient(135deg, #818cf8, #a5b4fc);--gradient-overlay: linear-gradient(135deg, rgba(129, 140, 248, .2), rgba(165, 180, 252, .1))}*{font-family:Roboto;box-sizing:border-box}body{background:var(--bg-color);color:var(--text-color);margin:0;padding:0;line-height:1.6}.float{animation:floatVertical 3s ease-in-out infinite}.glass-effect{background:var(--card-bg);backdrop-filter:blur(10px);border:1px solid var(--border-color)}.text-gradient{background:var(--gradient-primary);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}html{scroll-behavior:smooth}button:focus,a:focus{outline:2px solid var(--primary-color);outline-offset:2px}@keyframes floatVertical{0%{transform:translateY(0)}50%{transform:translateY(-15px)}to{transform:translateY(0)}}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.fade-in{opacity:0;animation:fade-in .9s ease-out forwards}@media (prefers-reduced-motion: reduce){.fade-in{animation:none;opacity:1}}header[data-astro-cid-5blmo7yk]{width:100%;background:#111827d9;backdrop-filter:blur(12px);padding:.75rem 2rem;position:fixed;top:0;z-index:1000;border-bottom:1px solid rgba(129,140,248,.15)}nav[data-astro-cid-5blmo7yk]{display:flex;align-items:center;justify-content:space-between;max-width:1200px;margin:0 auto;gap:2rem}.logo[data-astro-cid-5blmo7yk]{display:flex;align-items:center;gap:.75rem;text-decoration:none}.logo[data-astro-cid-5blmo7yk] img[data-astro-cid-5blmo7yk]{width:40px;height:40px;border-radius:10px}.logo[data-astro-cid-5blmo7yk] span[data-astro-cid-5blmo7yk]{font-size:1.4rem;font-weight:700;color:var(--text-color);letter-spacing:-.5px}.nav-links[data-astro-cid-5blmo7yk]{display:flex;gap:2rem;list-style:none;margin:0;padding:0}.nav-link[data-astro-cid-5blmo7yk]{color:#f9fafbbf;text-decoration:none;font-size:.95rem;font-weight:500;transition:all .2s ease;position:relative;padding:.5rem 0}.nav-link[data-astro-cid-5blmo7yk]:after{content:\"\";position:absolute;bottom:0;left:0;width:0;height:2px;background:var(--primary-color);transition:width .3s ease}.nav-link[data-astro-cid-5blmo7yk]:hover{color:var(--text-color)}.nav-link[data-astro-cid-5blmo7yk]:hover:after{width:100%}.btn-download[data-astro-cid-5blmo7yk]{background:linear-gradient(135deg,#818cf8,#6366f1);color:#fff;padding:.65rem 1.5rem;border-radius:50px;font-weight:600;font-size:.9rem;text-decoration:none;transition:all .3s ease;box-shadow:0 4px 15px #818cf84d}.btn-download[data-astro-cid-5blmo7yk]:hover{transform:translateY(-2px);box-shadow:0 6px 20px #818cf866;background:linear-gradient(135deg,#a5b4fc,#818cf8)}@media (max-width: 900px){.nav-links[data-astro-cid-5blmo7yk]{display:none}.btn-download[data-astro-cid-5blmo7yk]{margin-left:auto}}html{background-color:var(--bg-color);height:100vh;width:100%;display:flex;justify-content:center}body{display:flex;flex-direction:column;align-items:center;width:100%;max-width:1900px}\n.activation-container{margin-top:70px;width:700px;height:400px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:20px;border:2px solid var(--primary-color)}.activation-container h1{color:var(--text-color);text-decoration:underline var(--primary-color);font-weight:600}.activation-container p{font-weight:500}.activation-container i{font-size:50px}.waiting{color:var(--primary-color)!important}.error{color:red}.success{color:#08b908}@media (max-width:712px){.activation-container{width:500px}}@media (max-width:500px){.activation-container{width:300px}}\n"}],"routeData":{"route":"/activation","isIndex":false,"type":"page","pattern":"^\\/activation\\/?$","segments":[[{"content":"activation","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/activation.astro","pathname":"/activation","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap\";:root{--bg-color: #111827;--text-color: #f9fafb;--primary-color: #818cf8;--accent-color: #a5b4fc;--card-bg: rgba(255, 255, 255, .05);--border-color: rgba(129, 140, 248, .1);--shadow-color: rgba(129, 140, 248, .15);--gradient-primary: linear-gradient(135deg, #818cf8, #a5b4fc);--gradient-overlay: linear-gradient(135deg, rgba(129, 140, 248, .2), rgba(165, 180, 252, .1))}*{font-family:Roboto;box-sizing:border-box}body{background:var(--bg-color);color:var(--text-color);margin:0;padding:0;line-height:1.6}.float{animation:floatVertical 3s ease-in-out infinite}.glass-effect{background:var(--card-bg);backdrop-filter:blur(10px);border:1px solid var(--border-color)}.text-gradient{background:var(--gradient-primary);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}html{scroll-behavior:smooth}button:focus,a:focus{outline:2px solid var(--primary-color);outline-offset:2px}@keyframes floatVertical{0%{transform:translateY(0)}50%{transform:translateY(-15px)}to{transform:translateY(0)}}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.fade-in{opacity:0;animation:fade-in .9s ease-out forwards}@media (prefers-reduced-motion: reduce){.fade-in{animation:none;opacity:1}}header[data-astro-cid-5blmo7yk]{width:100%;background:#111827d9;backdrop-filter:blur(12px);padding:.75rem 2rem;position:fixed;top:0;z-index:1000;border-bottom:1px solid rgba(129,140,248,.15)}nav[data-astro-cid-5blmo7yk]{display:flex;align-items:center;justify-content:space-between;max-width:1200px;margin:0 auto;gap:2rem}.logo[data-astro-cid-5blmo7yk]{display:flex;align-items:center;gap:.75rem;text-decoration:none}.logo[data-astro-cid-5blmo7yk] img[data-astro-cid-5blmo7yk]{width:40px;height:40px;border-radius:10px}.logo[data-astro-cid-5blmo7yk] span[data-astro-cid-5blmo7yk]{font-size:1.4rem;font-weight:700;color:var(--text-color);letter-spacing:-.5px}.nav-links[data-astro-cid-5blmo7yk]{display:flex;gap:2rem;list-style:none;margin:0;padding:0}.nav-link[data-astro-cid-5blmo7yk]{color:#f9fafbbf;text-decoration:none;font-size:.95rem;font-weight:500;transition:all .2s ease;position:relative;padding:.5rem 0}.nav-link[data-astro-cid-5blmo7yk]:after{content:\"\";position:absolute;bottom:0;left:0;width:0;height:2px;background:var(--primary-color);transition:width .3s ease}.nav-link[data-astro-cid-5blmo7yk]:hover{color:var(--text-color)}.nav-link[data-astro-cid-5blmo7yk]:hover:after{width:100%}.btn-download[data-astro-cid-5blmo7yk]{background:linear-gradient(135deg,#818cf8,#6366f1);color:#fff;padding:.65rem 1.5rem;border-radius:50px;font-weight:600;font-size:.9rem;text-decoration:none;transition:all .3s ease;box-shadow:0 4px 15px #818cf84d}.btn-download[data-astro-cid-5blmo7yk]:hover{transform:translateY(-2px);box-shadow:0 6px 20px #818cf866;background:linear-gradient(135deg,#a5b4fc,#818cf8)}@media (max-width: 900px){.nav-links[data-astro-cid-5blmo7yk]{display:none}.btn-download[data-astro-cid-5blmo7yk]{margin-left:auto}}html{background-color:var(--bg-color);height:100vh;width:100%;display:flex;justify-content:center}body{display:flex;flex-direction:column;align-items:center;width:100%;max-width:1900px}\n"},{"type":"external","src":"/_astro/index.BZs9Ktnb.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/agustin/code/uniwave-social-media/landing-page/src/pages/activation.astro",{"propagation":"none","containsHead":true}],["/home/agustin/code/uniwave-social-media/landing-page/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/activation@_@astro":"pages/activation.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BZHuUhVC.mjs","/home/agustin/code/uniwave-social-media/landing-page/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DhdPAcI6.mjs","/home/agustin/code/uniwave-social-media/landing-page/src/components/react/Activation.tsx":"_astro/Activation.CxCNJOwd.js","@astrojs/react/client.js":"_astro/client.DVxemvf8.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.BZs9Ktnb.css","/arrow-down-circle.png","/favicon.svg","/logo.png","/_astro/Activation.CxCNJOwd.js","/_astro/activation.C4XiHDtv.css","/_astro/client.DVxemvf8.js","/_astro/index.RH_Wq4ov.js","/examples/example1.jpg","/examples/example2.jpg","/examples/example3.jpg","/examples/example4.jpg","/examples/example5.jpg","/examples/example6.jpg"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"N64p8QCoHrK0vaW877AnzK8rlq4v346qKc5Ki4XOv9Q="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
