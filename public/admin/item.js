(async function () {
  function qs(key) {
    return new URLSearchParams(window.location.search).get(key);
  }
  const type = qs("type");
  const name = qs("name");
  const titleEl = document.getElementById("title");
  const preview = document.getElementById("preview");
  const blurbEl = document.getElementById("blurb");
  const svgRaw = document.getElementById("svgRaw");
  const save = document.getElementById("save");
  const saveSvg = document.getElementById("saveSvg");
  const download = document.getElementById("download");

  if (!type || !name) {
    preview.textContent = "Missing type or name in URL";
    throw new Error("Missing type or name");
  }

  titleEl.textContent = decodeURIComponent(name);

  async function load() {
    preview.textContent = "Loading...";
    const res = await fetch(
      `/api/assets/${encodeURIComponent(type)}/${encodeURIComponent(name)}?includeSvg=1`
    );
    if (!res.ok) {
      preview.textContent = "Failed to load";
      return;
    }
    const j = await res.json();
    const asset = j.asset;
    if (!asset) {
      preview.textContent = "Asset not found";
      return;
    }
    blurbEl.value = asset.blurb || "";
    svgRaw.value = asset.svg || "";
    if (asset.svg) preview.innerHTML = asset.svg;
    else if (asset.svgPath) {
      const img = document.createElement('img');
      img.src = asset.svgPath;
      img.style.maxWidth = '100%';
      img.style.maxHeight = '100%';
      preview.innerHTML = '';
      preview.appendChild(img);
    } else preview.textContent = "(no svg)";
  }

  save.onclick = async () => {
    save.disabled = true;
    const resp = await fetch(
      `/api/assets/${encodeURIComponent(type)}/${encodeURIComponent(name)}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blurb: blurbEl.value }),
      }
    );
    const j = await resp.json();
    alert(
      j.status === "ok" ? "Saved" : "Error: " + (j.message || JSON.stringify(j))
    );
    save.disabled = false;
  };

  saveSvg.onclick = async () => {
    saveSvg.disabled = true;
    const svg = svgRaw.value;
    const resp = await fetch(
      `/api/assets/${encodeURIComponent(type)}/${encodeURIComponent(name)}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ svg, blurb: blurbEl.value }),
      }
    );
    const j = await resp.json();
    alert(
      j.status === "ok"
        ? "SVG Saved"
        : "Error: " + (j.message || JSON.stringify(j))
    );
    saveSvg.disabled = false;
    if (j.asset && j.asset.svg) {
      preview.innerHTML = j.asset.svg;
    }
  };

  download.onclick = () => {
    const blob = new Blob([svgRaw.value], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  await load();
})();
