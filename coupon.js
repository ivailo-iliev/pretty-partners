import { couponSlug, artworkUrl, loadCoupon } from './coupon-data.js';

const container = document.getElementById('offer');
const retry = document.getElementById('retry');
function text(tag, value, className) {
  const element = document.createElement(tag);
  element.textContent = value;
  if (className) element.className = className;
  container.append(element);
  return element;
}
function image(path, alt, className) {
  const url = artworkUrl(path);
  if (!url) return;
  const img = document.createElement('img');
  img.src = url;
  img.alt = alt;
  img.className = className;
  container.append(img);
}
async function reload() {
  retry.hidden = true;
  container.replaceChildren();
  const slug = couponSlug(location.pathname);
  if (!slug) { text('h2', 'Кодът не е намерен'); return; }
  text('p', 'Зареждане на промо кода…').setAttribute('role', 'status');
  try {
    const offer = await loadCoupon(slug);
    container.replaceChildren();
    if (!offer) {
      text('h2', 'Кодът не е намерен');
      text('p', 'Проверете връзката или се свържете с партньора, който ви я изпрати.');
      return;
    }
    image(offer.merchant_banner_path, `Промо изображение на ${offer.merchant_name}`, 'banner');
    image(offer.merchant_logo_path, `Лого на ${offer.merchant_name}`, 'logo');
    text('p', offer.merchant_name);
    text('h2', offer.code);
    text('p', `${new Intl.NumberFormat('bg-BG', { style: 'percent', maximumFractionDigits: 2 }).format(offer.discount)} отстъпка · ${offer.services}`);
    text('p', `Валиден до ${new Intl.DateTimeFormat('bg-BG', {dateStyle:'long', timeZone:'Europe/Sofia'}).format(new Date(`${offer.expires_on}T12:00:00Z`))}`);
    text('p', offer.status === 'Valid' ? 'Покажете този код при посещението си.'
      : offer.status === 'Paused' ? 'Предложението е временно спряно.'
      : 'Кодът е изтекъл или вече е използван максималният брой пъти.').setAttribute('role','status');
    text('p', `Препоръчан от ${offer.affiliate_name}`);
    text('p', 'Бизнесът проверява валидността при използване.', 'hint');
    if (/^[0-9a-f-]{36}$/.test(offer.id)) {
      const link = document.createElement('a');
      link.href = `https://prettypencil.app/admin/?view=partners&partner-code=${offer.id}`;
      link.textContent = 'За бизнеса: отвори в администрацията';
      text('p', '').append(link);
    }
  } catch {
    container.replaceChildren();
    text('p', 'Кодът не може да бъде зареден. Опитайте отново.').setAttribute('role','alert');
    retry.hidden = false;
  }
}
retry.addEventListener('click', reload);
void reload();
