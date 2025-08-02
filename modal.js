document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeModal = document.getElementById("closeModal");

  if (!modal || !modalImg || !closeModal) return;

  // This selector now targets all .img inside any item block (e.g., .menu-item, .soup-item, etc.)
  document.querySelectorAll('[class$="-item"] .img').forEach(item => {
    item.addEventListener('click', function () {
      const style = getComputedStyle(this);
      const bgImage = style.backgroundImage;
      const imageUrl = bgImage.slice(5, -2); // remove url("...")

      modalImg.src = imageUrl;
      modal.style.display = "flex";
    });
  });

  closeModal.onclick = () => modal.style.display = "none";

  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };
});
