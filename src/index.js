import './index.css';

(async function () {
    const {default: store} = await import('./store');
    const {default: React} = await import('react');
    const {default: ReactDOM} = await import('react-dom/client');
    const {default: Router} = await import('./Router');
    const {Provider} = await import('react-redux')

    const root = ReactDOM.createRoot(document.getElementById('root'));

    root.render(
        <Provider store={store}>
            <React.StrictMode>
                <Router/>
            </React.StrictMode>
        </Provider>
    );
})();