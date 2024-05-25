export default function generateRenderId(): string {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).slice(2, 11);

  return `${timestamp}-${randomString}`;
}
