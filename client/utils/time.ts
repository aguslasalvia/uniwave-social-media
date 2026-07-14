// Short relative timestamp for feed items ("ahora", "5m", "2h", "3d", "12 jun").
// Accepts the backend's unix-seconds timestamps.
export function timeAgo(unixSeconds: number): string {
  const seconds = Math.floor(Date.now() / 1000) - unixSeconds;

  if (seconds < 60) return "ahora";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`;

  const date = new Date(unixSeconds * 1000);
  return date.toLocaleDateString("es-UY", { day: "numeric", month: "short" });
}
