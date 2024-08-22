const loadGoogleMapsScript = (callback) => {
    const existingScript = document.getElementById('googleMaps');
  
    if (!existingScript) {
      const script = document.createElement('script');
      const API_KEY = import.meta.env.VITE_MAP_KEY;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
      script.id = 'googleMaps';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
  
      script.onload = () => {
        if (callback) callback();
      };
    } else if (callback) {
      callback();
    }
  };
  
  export default loadGoogleMapsScript;
  