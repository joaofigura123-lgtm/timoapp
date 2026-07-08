import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Download, Lock, RotateCcw, RefreshCw } from "lucide-react";
import { getDownloadStats, resetDownloadStats } from "@/lib/admin-stats.functions";

export const Route = createFileRoute("/admin-timo-stats")({
  head: () => ({
    meta: [
      { title: "Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const STORAGE_KEY = "timo-admin-pw";

function AdminPage() {
  const getStats = useServerFn(getDownloadStats);
  const resetStats = useServerFn(resetDownloadStats);

  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load(pw: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await getStats({ data: { password: pw } });
      setCount(res.count);
      setUpdatedAt(res.updatedAt);
      setAuthed(true);
      if (typeof window !== "undefined") sessionStorage.setItem(STORAGE_KEY, pw);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro");
      setAuthed(false);
      if (typeof window !== "undefined") sessionStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPassword(saved);
      void load(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    await load(password);
  }

  async function onReset() {
    if (!confirm("Zerar o contador de cliques?")) return;
    setLoading(true);
    setError(null);
    try {
      await resetStats({ data: { password } });
      await load(password);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro");
    } finally {
      setLoading(false);
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <form onSubmit={onLogin} className="glass rounded-3xl p-8 w-full max-w-sm">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-mint" />
            <h1 className="font-display text-2xl font-bold">Admin</h1>
          </div>
          <label className="text-sm text-muted-foreground block mb-2">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 mb-4 outline-none focus:border-mint"
            autoFocus
          />
          {error && <p className="text-sm text-coral mb-3">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full rounded-full py-3 font-semibold bg-gradient-to-r from-mint-glow via-mint to-coral text-deep disabled:opacity-50"
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl font-bold">Estatísticas</h1>
          <button
            onClick={() => load(password)}
            disabled={loading}
            className="glass rounded-full p-2 hover:bg-white/10"
            title="Atualizar"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        <div className="glass rounded-3xl p-8 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-3">
            <Download className="w-4 h-4 text-mint" />
            Cliques no botão de download
          </div>
          <div className="text-6xl font-bold text-gradient-mint">
            {count === null ? "—" : count.toLocaleString("pt-BR")}
          </div>
          {updatedAt && (
            <div className="text-xs text-muted-foreground mt-4">
              Atualizado em {new Date(updatedAt).toLocaleString("pt-BR")}
            </div>
          )}
        </div>

        {error && (
          <div className="glass rounded-2xl p-4 text-sm text-coral">{error}</div>
        )}

        <button
          onClick={onReset}
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3 font-semibold border border-coral/40 text-coral hover:bg-coral/10 disabled:opacity-50"
        >
          <RotateCcw className="w-4 h-4" /> Resetar contador
        </button>

        <button
          onClick={() => {
            if (typeof window !== "undefined") sessionStorage.removeItem(STORAGE_KEY);
            setAuthed(false);
            setPassword("");
          }}
          className="w-full text-xs text-muted-foreground hover:text-foreground pt-2"
        >
          Sair
        </button>
      </div>
    </div>
  );
}
