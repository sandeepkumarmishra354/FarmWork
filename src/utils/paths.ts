export function getPath(path: string): string {
  // Access the BASE_URL injected by Astro at build/dev time
  const base = import.meta.env.BASE_URL;
  const cleanBase = base === '/' ? '' : base;
  
  if (path === '/') return cleanBase || '/';
  
  // Ensure the concatenation safely handles leading slashes
  return `${cleanBase}${path.startsWith('/') ? path : '/' + path}`;
}
