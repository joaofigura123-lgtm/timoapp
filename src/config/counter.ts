// Contador externo (Abacus API) — funciona em qualquer host (Vercel, etc).
// Não precisa de backend. Se quiser trocar de contador é só criar um novo em
// https://abacus.jasoncameron.dev/create e substituir os valores abaixo.

export const COUNTER = {
  namespace: "46EfepUeeM3Lx4Jc",
  key: "R_a44ldq39GHadjs",
  adminToken: "9fc39644-dc31-4d35-9019-b6469d381e37",
  // Senha para acessar /admin-timo-stats — troque para o que quiser
  adminPassword: "timo-admin",
};

const BASE = "https://abacus.jasoncameron.dev";

export async function incrementCounter(): Promise<number> {
  const r = await fetch(`${BASE}/hit/${COUNTER.namespace}/${COUNTER.key}`);
  if (!r.ok) throw new Error("Falha ao incrementar contador");
  const j = (await r.json()) as { value: number };
  return j.value;
}

export async function getCounter(): Promise<number> {
  const r = await fetch(`${BASE}/get/${COUNTER.namespace}/${COUNTER.key}`);
  if (!r.ok) throw new Error("Falha ao ler contador");
  const j = (await r.json()) as { value: number };
  return j.value;
}

export async function resetCounter(): Promise<number> {
  const r = await fetch(
    `${BASE}/reset/${COUNTER.namespace}/${COUNTER.key}?token=${COUNTER.adminToken}`,
    { method: "POST" },
  );
  if (!r.ok) throw new Error("Falha ao resetar contador");
  const j = (await r.json()) as { value: number };
  return j.value;
}
