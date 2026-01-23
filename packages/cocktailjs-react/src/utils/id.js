export default function generateId(base = "id") {
  return `${base}-${Math.random().toString(36).slice(2, 9)}`;
}
