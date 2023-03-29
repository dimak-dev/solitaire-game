import './index.css';

(async function(){
  const { default: React } = await import('react');
  const { default: ReactDOM } = await import('react-dom/client');
  const { default: Router } = await import('./Router');

  const root = ReactDOM.createRoot(document.getElementById('root'));
  
  root.render(
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  );
})();