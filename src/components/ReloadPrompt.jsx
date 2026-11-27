import { useRegisterSW } from 'virtual:pwa-register/react';

function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (!offlineReady && !needRefresh) {
    return null;
  }

  return (
    <div className="reload-prompt" role="alert">
      <p>
        {offlineReady
          ? 'The app is ready to use offline.'
          : 'A new version is available.'}
      </p>
      <div className="reload-actions">
        {needRefresh && (
          <button
            className="reload-button"
            type="button"
            onClick={() => updateServiceWorker(true)}
          >
            Reload
          </button>
        )}
        <button className="close-button" type="button" onClick={close}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ReloadPrompt;
