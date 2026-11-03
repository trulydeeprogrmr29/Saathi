const helpers = [
  { name: "Ramesh Kumar", initials: "RK", market: "Sonapur Main Market", route: "Bela Tola · 1.2 km away", score: "98%", orders: "84 deliveries", color: "#5d8c68" },
  { name: "Meena Devi", initials: "MD", market: "Sonapur Main Market", route: "Bela Tola · 1.8 km away", score: "96%", orders: "57 deliveries", color: "#c77755" },
  { name: "Kavita Sahu", initials: "KS", market: "Sonapur Main Market", route: "Station Road · 2.4 km away", score: "94%", orders: "41 deliveries", color: "#8d789a" },
  { name: "Arjun Prasad", initials: "AP", market: "Sonapur Main Market", route: "Bela Tola · 2.9 km away", score: "92%", orders: "29 deliveries", color: "#7293a1" },
  { name: "Salim Ansari", initials: "SA", market: "Sonapur Main Market", route: "River Side · 3.5 km away", score: "90%", orders: "18 deliveries", color: "#b99355" },
  { name: "Pooja Yadav", initials: "PY", market: "Purana Chowk Market", route: "Chowk Road · 1.5 km away", score: "95%", orders: "36 deliveries", color: "#ad6e7b" },
];

const requestForm = document.querySelector("#request-form");
const helperForm = document.querySelector("#helper-form");
const matchEmpty = document.querySelector("#match-empty");
const matchResults = document.querySelector("#match-results");
const requestError = document.querySelector("#request-error");
const helperError = document.querySelector("#helper-error");
const helperSuccess = document.querySelector("#helper-success");
const toast = document.querySelector("#toast");

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3800);
}

function getField(form, name) {
  return form.elements[name].value.trim();
}

function cleanPhone(value) {
  return value.replace(/\D/g, "");
}

function getRegisteredHelper() {
  const saved = localStorage.getItem("saathi-helper-profile");
  if (!saved) return null;

  try {
    const profile = JSON.parse(saved);
    if (!profile?.name || !profile?.market || !profile?.route) return null;
    const initials = profile.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");
    return {
      name: profile.name,
      initials: initials || "S",
      market: profile.market,
      route: `${profile.route} · new saathi`,
      score: "New",
      orders: "profile registered",
      color: "#6f9567",
    };
  } catch {
    return null;
  }
}

function getMatches(market) {
  const registeredHelper = getRegisteredHelper();
  const availableHelpers = registeredHelper ? [registeredHelper, ...helpers] : helpers;
  const matching = availableHelpers.filter((helper) => helper.market === market);
  const other = availableHelpers.filter((helper) => helper.market !== market);
  return [...matching, ...other].slice(0, 5);
}

function createRequestId() {
  const stamp = Date.now().toString().slice(-4);
  return `SA-${stamp}`;
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);
}

function renderMatches(request) {
  const matchedHelpers = getMatches(request.market);
  const list = matchedHelpers.map((helper) => {
    const message = encodeURIComponent(
      `Saathi request ${request.id}: ${request.items}. Please reply YES if you can bring it from ${request.market} to ${request.area} by ${request.timeWindow}.`
    );
    return `
      <div class="helper-row">
        <span class="helper-avatar" style="background:${helper.color}">${helper.initials}</span>
        <span class="helper-main">
          <span class="helper-name">${escapeHtml(helper.name)} <span class="verified-badge" title="Verified helper">✓</span></span>
          <span class="helper-meta">${escapeHtml(helper.route)} · ${escapeHtml(helper.orders)}</span>
        </span>
        <span class="helper-score">${helper.score}<small>confidence</small></span>
        <a class="wa-button" href="https://wa.me/?text=${message}" target="_blank" rel="noopener" aria-label="Prepare WhatsApp message for ${escapeHtml(helper.name)}" title="Prepare WhatsApp message">◉</a>
      </div>
    `;
  }).join("");

  matchResults.innerHTML = `
    <div class="results-header">
      <div><div class="results-eyebrow">Your matchboard</div><h3>Five saathis<br />are on the route.</h3></div>
      <span class="request-id">${request.id}<br />just now</span>
    </div>
    <div class="request-summary">
      <span>Going to<strong>${escapeHtml(request.market)}</strong></span>
      <span>Bringing to<strong>${escapeHtml(request.area)}</strong></span>
      <span>Looking for<strong>${escapeHtml(request.items)}</strong></span>
      <span>Needed by<strong>${escapeHtml(request.timeWindow)}</strong></span>
    </div>
    <p class="match-notice"><span>✓</span> Request shared with the closest trusted helpers</p>
    <div class="helper-list">${list}</div>
    <div class="results-footer"><p>Tap ◉ to prepare a WhatsApp message.<br />The helper who accepts first can help.</p><button class="new-request" type="button" data-new-request>New request</button></div>
  `;

  matchEmpty.hidden = true;
  matchResults.hidden = false;
  matchResults.querySelector("[data-new-request]").addEventListener("click", resetRequest);
}

function resetRequest() {
  requestForm.reset();
  requestError.textContent = "";
  matchEmpty.hidden = false;
  matchResults.hidden = true;
  document.querySelector("#request").scrollIntoView({ behavior: "smooth", block: "start" });
}

requestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  requestError.textContent = "";

  const request = {
    id: createRequestId(),
    market: getField(requestForm, "market"),
    area: getField(requestForm, "deliveryArea"),
    items: getField(requestForm, "items"),
    address: getField(requestForm, "address"),
    timeWindow: getField(requestForm, "timeWindow"),
    phone: cleanPhone(getField(requestForm, "phone")),
  };

  if (!request.area || !request.items || !request.address || request.phone.length < 10) {
    requestError.textContent = "Please add your area, essentials, address and a valid 10-digit number.";
    return;
  }

  localStorage.setItem("saathi-last-request", JSON.stringify(request));
  renderMatches(request);
  showToast("Your request is now with five nearby saathis.");
  document.querySelector("#match-panel").scrollIntoView({ behavior: "smooth", block: "center" });
});

helperForm.addEventListener("submit", (event) => {
  event.preventDefault();
  helperError.textContent = "";
  helperSuccess.textContent = "";

  const helper = {
    name: getField(helperForm, "helperName"),
    phone: cleanPhone(getField(helperForm, "helperPhone")),
    market: getField(helperForm, "helperMarket"),
    route: getField(helperForm, "helperRoute"),
  };

  if (!helper.name || !helper.route || helper.phone.length < 10) {
    helperError.textContent = "Please add your name, route and a valid 10-digit number.";
    return;
  }

  localStorage.setItem("saathi-helper-profile", JSON.stringify(helper));
  helperSuccess.textContent = "You’re registered. We’ll send matching requests to your WhatsApp.";
  helperForm.reset();
  showToast("Welcome to the Saathi route network.");
});

document.querySelectorAll(".wa-button").forEach((button) => {
  button.addEventListener("click", () => showToast("A WhatsApp message is ready to send."));
});

const savedRequest = localStorage.getItem("saathi-last-request");
if (savedRequest) {
  try {
    const request = JSON.parse(savedRequest);
    if (request && request.market && request.items) {
      // Keep the first visit calm; the previous request is available only after a new submission.
      localStorage.removeItem("saathi-last-request");
    }
  } catch {
    localStorage.removeItem("saathi-last-request");
  }
}
