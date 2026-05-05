document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(
    ".cartao-foto img, .member-photo img",
  );

  if (!images.length) {
    return;
  }

  const overlay = document.createElement("div");
  overlay.className = "photo-lightbox";
  overlay.innerHTML = `
    <div class="photo-lightbox__backdrop" data-close="true"></div>
    <figure class="photo-lightbox__panel" role="dialog" aria-modal="true" aria-label="Visualizador de imagem">
      <button type="button" class="photo-lightbox__close" aria-label="Fechar">&times;</button>
      <img class="photo-lightbox__image" alt="" />
      <figcaption class="photo-lightbox__caption"></figcaption>
    </figure>
  `;

  document.body.appendChild(overlay);

  const overlayImage = overlay.querySelector(".photo-lightbox__image");
  const overlayCaption = overlay.querySelector(".photo-lightbox__caption");
  const closeButton = overlay.querySelector(".photo-lightbox__close");

  function closeLightbox() {
    overlay.classList.remove("is-open");
    document.body.classList.remove("photo-lightbox-open");
    overlayImage.removeAttribute("src");
    overlayImage.alt = "";
    overlayCaption.textContent = "";
  }

  function openLightbox(image) {
    const galleryFigure = image.closest(".cartao-foto");
    const memberCard = image.closest(".member-card");
    const galleryCaption =
      galleryFigure?.querySelector("figcaption")?.textContent?.trim() || "";
    const memberName =
      memberCard?.querySelector(".member-name")?.textContent?.trim() || "";
    const memberRole =
      memberCard?.querySelector(".member-role")?.textContent?.trim() || "";
    const caption =
      galleryCaption ||
      [memberName, memberRole].filter(Boolean).join(" — ") ||
      image.alt ||
      "";

    overlayImage.src = image.currentSrc || image.src;
    overlayImage.alt = image.alt || caption || "Foto ampliada";
    overlayCaption.textContent = caption;
    overlay.classList.add("is-open");
    document.body.classList.add("photo-lightbox-open");
  }

  images.forEach((image) => {
    image.addEventListener("click", () => openLightbox(image));
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay || event.target.dataset.close === "true") {
      closeLightbox();
    }
  });

  closeButton.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
});
