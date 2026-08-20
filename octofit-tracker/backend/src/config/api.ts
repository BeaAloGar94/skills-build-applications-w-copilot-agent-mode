const backendPort = 8000;
const codespaceName = process.env.CODESPACE_NAME;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-${backendPort}.app.github.dev`
  : `http://localhost:${backendPort}`;

export { backendPort };