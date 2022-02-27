export function sumar(a, b) {
  return a + b;
}

export function restar(a, b) {
  return a - b;
}

export const multi = (a, b) => a * b;

function porDefault() {
  console.log("Soy una fn por defecto");
}

export default porDefault;
