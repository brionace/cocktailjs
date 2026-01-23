(function () {
  async function fetchAssets(includeSvg = false) {
    const res = await fetch(`/api/assets?includeSvg=${includeSvg ? 1 : 0}`);
    return res.json();
  }

  function makeCard(name, entry, type) {
    const el = document.createElement("div");
    el.className = "card";
    const thumb = document.createElement("div");
    thumb.className = "svg-thumb";
    if (entry.svg) {
      const img = document.createElement("div");
      img.innerHTML = entry.svg;
      thumb.appendChild(img);
    } else if (entry.svgPath) {
      const img = document.createElement("img");
      img.src = entry.svgPath;
      img.style.maxWidth = "100%";
      img.style.maxHeight = "100%";
      thumb.appendChild(img);
    } else {
      thumb.textContent = "(no svg)";
    }
    el.appendChild(thumb);

    const title = document.createElement("div");
    title.textContent = name;
    title.style.fontWeight = "600";
    el.appendChild(title);

    const blurb = document.createElement("textarea");
    blurb.value = entry.blurb || "";
    el.appendChild(blurb);

    const save = document.createElement("button");
    save.textContent = "Save";
    save.onclick = async () => {
      save.disabled = true;
      const body = { blurb: blurb.value };
      const resp = await fetch(
        `/api/assets/${type}/${encodeURIComponent(name)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const j = await resp.json();
      alert(
        j.status === "ok"
          ? "Saved"
          : "Error: " + (j.message || JSON.stringify(j))
      );
      save.disabled = false;
    };
    el.appendChild(save);
    const view = document.createElement("button");
    view.textContent = "View";
    view.style.marginLeft = "8px";
    view.onclick = () => {
      const href = `/admin/item.html?type=${encodeURIComponent(
        type
      )}&name=${encodeURIComponent(name)}`;
      window.location.href = href;
    };
    el.appendChild(view);

    return el;
  }
  

  async function renderAll() {
    try {
      const data = await fetchAssets(true);
      const glasses = (data && data.data && data.data.glasses) || {};
      const garnishes = (data && data.data && data.data.garnishes) || {};

      const gEl = document.getElementById("glasses");
      const gaEl = document.getElementById("garnishes");

        if (gEl) {
          gEl.innerHTML = "";
          Object.keys(glasses)
            .sort()
            .forEach((k) => gEl.appendChild(makeCard(k, glasses[k], "glasses")));
        }

        if (gaEl) {
          gaEl.innerHTML = "";
          Object.keys(garnishes)
            .sort()
            .forEach((k) => gaEl.appendChild(makeCard(k, garnishes[k], "garnishes")));
        }
    } catch (e) {
      console.error('Failed to load assets', e);
    }
  }

  // Initial render
  renderAll();

  // Listen for server-sent events from the admin server to auto-refresh
  // when the watch script notifies that assets were re-rendered.
  if (typeof EventSource !== 'undefined') {
    try {
      const es = new EventSource('/__events');
      es.addEventListener('render', (ev) => {
        console.log('Assets render event received', ev && ev.data);
        renderAll();
      });
      es.addEventListener('error', (err) => {
        // keep silence; browser will retry automatically
      });
    } catch (e) {
      // ignore if SSE unsupported
    }
  }
})();
