export const loadGoogleMapsScript = apiKey => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      return resolve();
    }

    const existingScript = document.getElementById('google-maps');

    if (existingScript) {
      existingScript.addEventListener('load', resolve);
      existingScript.addEventListener('error', reject);
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker`;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;

    document.body.appendChild(script);
  });
};
