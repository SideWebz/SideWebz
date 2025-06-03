document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("cookie-banner");
  const acceptAllBtn = document.getElementById("acceptAll");
  const form = document.getElementById("cookie-form");

  const COOKIE_KEY = "cookieConsent";

  const loadConsent = () => {
    try {
      return JSON.parse(localStorage.getItem(COOKIE_KEY));
    } catch {
      return null;
    }
  };

document.getElementById('cookie-settings-btn').addEventListener('click', () => {
  // Toon de banner opnieuw
  document.getElementById('cookie-banner').style.display = 'block';
});



  const saveConsent = (consent) => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(consent));
  };

  const handleConsent = (consent) => {
    saveConsent(consent);
    banner.style.display = "none";

    if (consent.analytics) loadGoogleAnalytics();
    if (consent.external) loadGoogleMaps();
  };

  const showBannerIfNeeded = () => {
    const consent = loadConsent();
    if (!consent) {
      banner.style.display = "block";
    } else {
      handleConsent(consent); // laad scripts als toestemming is gegeven
    }
  };

  acceptAllBtn.addEventListener("click", () => {
    handleConsent({ analytics: true, external: true });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const analytics = document.getElementById("analyticsCookies").checked;
    const external = document.getElementById("externalCookies").checked;
    handleConsent({ analytics, external });
  });
function loadGoogleAnalytics() {
  if (document.getElementById('ga-script')) return; // voorkom dubbel laden

  const scriptTag = document.createElement('script');
  scriptTag.src = 'https://www.googletagmanager.com/gtag/js?id=G-9WNVYLCVD8';
  scriptTag.async = true;
  scriptTag.id = 'ga-script';
  document.head.appendChild(scriptTag);

  scriptTag.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-9WNVYLCVD8');
  };
}

  const loadGoogleMaps = () => {
    const mapPlaceholder = document.querySelector('[data-map-placeholder]');
    if (mapPlaceholder) {
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5005.699836550298!2d3.1599036931161355!3d51.14811866401142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c351f0919eb66d%3A0x4c9d3b8e8fcc6f23!2sTorhoutsesteenweg%2079%2C%208210%20Zedelgem!5e0!3m2!1snl!2sbe!4v1748935480118!5m2!1snl!2sbe"; // je embed URL
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.setAttribute("loading", "lazy");
      iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
      mapPlaceholder.innerHTML = "";
      mapPlaceholder.appendChild(iframe);
    }
  };

  showBannerIfNeeded();
});
