const GOOGLE_API_KEY = "AIzaSyDmh4t0Nkgc8ufmUhUMfLEmfxkFbbj9-uY";

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:%7C${lat},${lng}&key=AIzaSyBbS09LkaP8kvSyJU_HsarRCcrawzxFCqA`;
  return imagePreviewUrl;
}
