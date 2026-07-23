/* Barra de progresso */
const bar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const max = document.body.scrollHeight - window.innerHeight;
  bar.style.width = (window.scrollY / max * 100) + '%';
}, { passive: true });

/* Nav scroll */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* Fade-in com IntersectionObserver */
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

/* Grade carousel controls */
const gradeScroll = document.querySelector('.grade-scroll');
const gradePrev = document.querySelector('.carousel-prev');
const gradeNext = document.querySelector('.carousel-next');

if (gradeScroll) {
  const getGradeScrollDistance = () => {
    const firstItem = gradeScroll.querySelector('.grade-item');
    if (!firstItem) return 320;
    const itemWidth = firstItem.offsetWidth;
    const gap = 18;
    const viewportWidth = gradeScroll.clientWidth;
    const itemsPerView = Math.max(1, Math.floor(viewportWidth / (itemWidth + gap)));
    return itemsPerView * (itemWidth + gap);
  };

  const scrollLeft = () => {
    gradeScroll.scrollBy({ left: -getGradeScrollDistance(), behavior: 'smooth' });
  };

  const scrollRight = () => {
    gradeScroll.scrollBy({ left: getGradeScrollDistance(), behavior: 'smooth' });
  };

  gradePrev?.addEventListener('click', scrollLeft);
  gradeNext?.addEventListener('click', scrollRight);

  gradeScroll.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaX) < Math.abs(event.deltaY)) {
      gradeScroll.scrollBy({ left: event.deltaY, behavior: 'smooth' });
      event.preventDefault();
    }
  }, { passive: false });
}

/* Prof carousel controls */
const profScroll = document.querySelector('.prof-scroll');
const profPrev = document.querySelector('.prof-prev');
const profNext = document.querySelector('.prof-next');

if (profScroll) {
  const getProfScrollDistance = () => {
    const firstItem = profScroll.querySelector('.prof-item');
    if (!firstItem) return 280;
    const itemWidth = firstItem.offsetWidth;
    const gap = 18;
    const viewportWidth = profScroll.clientWidth;
    const itemsPerView = Math.max(1, Math.floor(viewportWidth / (itemWidth + gap)));
    return itemsPerView * (itemWidth + gap);
  };

  const profScrollLeft = () => {
    profScroll.scrollBy({ left: -getProfScrollDistance(), behavior: 'smooth' });
  };

  const profScrollRight = () => {
    profScroll.scrollBy({ left: getProfScrollDistance(), behavior: 'smooth' });
  };

  profPrev?.addEventListener('click', profScrollLeft);
  profNext?.addEventListener('click', profScrollRight);
}

/* Rastreamento de marketing e conversão */
(function () {
  const product = {
    id: 'plataforma-rosa',
    name: 'Plataforma Rosa',
    category: 'Curso Online',
    price: 599.90,
    currency: 'BRL'
  };
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  const storageKey = 'plataforma_rosa_utm';
  const cookieName = 'plataforma_rosa_utm';

  const ensureDataLayer = () => {
    window.dataLayer = window.dataLayer || [];
    return window.dataLayer;
  };

  const pushEvent = (eventName, payload = {}) => {
    const dataLayer = ensureDataLayer();
    dataLayer.push({
      event: eventName,
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      ...payload
    });
  };

  const getUtmFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return utmKeys.reduce((acc, key) => {
      const value = params.get(key);
      if (value) {
        acc[key] = value;
      }
      return acc;
    }, {});
  };

  const getStoredUtm = () => {
    try {
      const rawValue = window.localStorage.getItem(storageKey);
      if (rawValue) {
        return JSON.parse(rawValue);
      }
    } catch (error) {
      // Ignora falhas de leitura.
    }

    const cookieValue = document.cookie
      .split('; ')
      .find((entry) => entry.startsWith(`${cookieName}=`));

    if (!cookieValue) {
      return {};
    }

    try {
      return JSON.parse(decodeURIComponent(cookieValue.split('=').slice(1).join('=')));
    } catch (error) {
      return {};
    }
  };

  const saveUtm = (utmData) => {
    const mergedData = { ...getStoredUtm(), ...utmData };

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(mergedData));
    } catch (error) {
      // Ignora falhas de armazenamento em ambientes restritos.
    }

    const cookieValue = encodeURIComponent(JSON.stringify(mergedData));
    document.cookie = `${cookieName}=${cookieValue}; max-age=31536000; path=/; SameSite=Lax`;
    return mergedData;
  };

  const getActiveUtm = () => {
    const utmFromUrl = getUtmFromUrl();
    if (Object.keys(utmFromUrl).length > 0) {
      return saveUtm(utmFromUrl);
    }
    return getStoredUtm();
  };

  const buildCheckoutUrl = (baseUrl, utmData) => {
    const url = new URL(baseUrl, window.location.href);
    Object.entries(utmData).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      }
    });
    return url.toString();
  };

  const getButtonName = (element) => {
    const text = (element.innerText || element.textContent || '').trim().replace(/\s+/g, ' ');
    return text || element.getAttribute('aria-label') || element.getAttribute('title') || 'CTA';
  };

  const trackPageView = () => {
    pushEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });

    pushEvent('view_item', {
      ecommerce: {
        currency: product.currency,
        value: product.price,
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: 1
        }]
      }
    });
  };

  const trackCtaClicks = () => {
    document.querySelectorAll('a[href="#investimento"], a[href*="greenn.com.br"], a[href*="payfast"]')
      .forEach((link) => {
        link.addEventListener('click', () => {
          const buttonName = getButtonName(link);
          pushEvent('cta_click', {
            button_name: buttonName,
            button_text: buttonName,
            page: window.location.pathname,
            product: product.name
          });
        });
      });
  };

  const trackCheckoutButton = () => {
    const checkoutLink = document.querySelector('.btn-investimento');
    if (!checkoutLink) {
      return;
    }

    const applyCheckoutUrl = () => {
      const utmData = getActiveUtm();
      checkoutLink.href = buildCheckoutUrl(checkoutLink.getAttribute('href') || checkoutLink.href, utmData);
    };

    applyCheckoutUrl();

    checkoutLink.addEventListener('click', () => {
      const utmData = getActiveUtm();
      const finalUrl = buildCheckoutUrl(checkoutLink.getAttribute('href') || checkoutLink.href, utmData);
      checkoutLink.href = finalUrl;

      pushEvent('begin_checkout', {
        ecommerce: {
          currency: product.currency,
          value: product.price,
          items: [{
            item_id: product.id,
            item_name: product.name,
            item_category: product.category,
            price: product.price,
            quantity: 1
          }]
        },
        button_name: getButtonName(checkoutLink),
        product: product.name,
        page: window.location.pathname
      });
    });
  };

  getActiveUtm();
  trackPageView();
  trackCtaClicks();
  trackCheckoutButton();
})();


