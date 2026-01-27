// Minimal fallback typings for consumers until full type declarations are added.
// This file will be copied into `dist/index.d.ts` by the package `prepare` script.

declare module '@bace51/cocktailjs-react' {
  // permissive any-based exports to avoid TypeScript errors in consumer projects
  const content: { [key: string]: any };
  export = content;
}

export {};
