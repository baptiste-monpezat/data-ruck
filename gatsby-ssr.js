import * as React from "react"

const MagicScriptTag = () => {
    const codeToRunOnClient = `
(function() {
  function getInitialColorMode() {
    const persistedColorPreference = window.localStorage.getItem('color-mode');
    const hasPersistedPreference = typeof persistedColorPreference === 'string';
    if (hasPersistedPreference) { return persistedColorPreference; }
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';
    if (hasMediaQueryPreference) { return mql.matches ? 'dark' : 'light'; }
    return 'dark';
  }
  const colorMode = getInitialColorMode();
  const root = document.documentElement;
  root.classList.add('dark');
  if (typeof window !== 'undefined') { window.localStorage.setItem('color-mode', colorMode); }
})()
  `;
    return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
    setHeadComponents([
        <link key="preconnect-gfonts" rel="preconnect" href="https://fonts.googleapis.com" />,
        <link key="preconnect-gstatic" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />,
        <link
            key="gfonts"
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
        />,
    ]);
    setPreBodyComponents(<MagicScriptTag key="0" />);
};
