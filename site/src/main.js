import './styles.css';

const loadBrainShowcases = (() => {
    let brainModulePromise;

    return () => {
        brainModulePromise ||= import('./mode-brain.js');
        return brainModulePromise;
    };
})();

if (document.querySelector('[data-mode-showcase], [data-examples-showcase]')) {
    loadBrainShowcases();
}

document.querySelector('.btn-primary')?.addEventListener('click', () => {
    document.querySelector('#install')?.scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('[data-copy-install]').forEach((copyInstallBtn) => {
    copyInstallBtn.addEventListener('click', async () => {
        const installCommand = copyInstallBtn
            .closest('[data-install-copy-scope]')
            ?.querySelector('[data-install-command]');
        const command = installCommand?.textContent?.trim() || '';

        if (!command || !navigator?.clipboard?.writeText) return;

        try {
            await navigator.clipboard.writeText(command);
            copyInstallBtn.textContent = 'Copied';
            copyInstallBtn.disabled = true;
            window.setTimeout(() => {
                copyInstallBtn.textContent = 'Copy';
                copyInstallBtn.disabled = false;
            }, 1400);
        } catch {
            copyInstallBtn.textContent = 'Try again';
            window.setTimeout(() => {
                copyInstallBtn.textContent = 'Copy';
            }, 1400);
        }
    });
});
