export default function generateRenderId(): string {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).slice(2, 11);

  return `${timestamp}-${randomString}`;
}

export function storeRenderId(renderId: string): void {
  sessionStorage.setItem("abfy_experiments", JSON.stringify({ renderId }));
}

export function getRenderId(): string | null {
  try {
    const localStorage = sessionStorage.getItem("abfy_experiments");
    if (!localStorage) return null;
    const storedData = JSON.parse(localStorage) || {};
    return storedData.renderId || null;
  } catch (error) {
    console.error("Error parsing session storage data:", error);
    return null;
  }
}
