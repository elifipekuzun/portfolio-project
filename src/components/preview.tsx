import './preview.css';
import React, { useRef, useEffect } from 'react';

interface PreviewProps {
  code: string;
  error: string;
}

const html = `
    <html>
      <head>
        <style>html { background-color: #fff; }</style>
        <body>
          <div id='root'>
            <script>
              const handleError = (err) => {
                  const root = document.querySelector('#root');
                  root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
                  console.error(err); 
              };
              window.addEventListener('error', (event) => {
                event.preventDefault();
                handleError(event.error);
              });

              window.addEventListener('message', (event) => {
                try {
                  eval(event.data);
                }catch (err) {
                  handleError(err);
                }
                
              }, false);
            </script>
          </div>
        </body>
      </head>
    </html>
  `;

export const Preview: React.FC<PreviewProps> = ({ code, error }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    if (!iframe.current) {
      return;
    }
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="preview">
      <iframe
        srcDoc={html}
        ref={iframe}
        sandbox="allow-scripts"
        title="preview"
      />
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};
