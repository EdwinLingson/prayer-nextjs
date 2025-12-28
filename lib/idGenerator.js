export function generatePrayerId() {
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${date}-${random}`;
}
