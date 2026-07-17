import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Flame, Heart, MapPin, MessageCircleHeart, Sparkles, Star, Verified, Zap } from "lucide-react";
import logo from "@/assets/timo-logo.png";
import match1 from "@/assets/match-1.jpg";
import match2 from "@/assets/match-2.jpg";
import match3 from "@/assets/match-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Timo — O app de namoro mais quente do momento" },
      {
        name: "description",
        content:
          "Timo é o app de namoro onde a conversa esquenta de verdade. Matches reais, papo sem enrolação. Baixe agora.",
      },
      { property: "og:title", content: "Timo — Onde o clima esquenta" },
      {
        property: "og:description",
        content: "Matches reais, papo sem enrolação. Baixe o Timo e comece hoje.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Landing,
});

function DownloadBtn({
  children,
  size = "md",
  variant = "primary",
}: {
  children: React.ReactNode;
  size?: "md" | "lg";
  variant?: "primary" | "ghost";
}) {
  const sizes = size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-mint-glow via-mint to-coral text-deep glow-mint hover:scale-[1.03]"
      : "glass text-foreground hover:bg-white/10";
  return (
    <Link
      to="/download"
      className={`inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300 ${sizes} ${styles}`}
    >
      {children}
    </Link>
  );
}

function Dot({ className, color }: { className: string; color: string }) {
  return (
    <span
      className={`absolute rounded-full animate-pulse-glow ${className}`}
      style={{ background: color, boxShadow: `0 0 20px ${color}` }}
    />
  );
}

function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Floating dots */}
      <Dot className="w-3 h-3 top-[15%] left-[8%]" color="oklch(0.72 0.22 25)" />
      <Dot className="w-2 h-2 top-[25%] right-[12%]" color="oklch(0.86 0.17 90)" />
      <Dot className="w-2 h-2 top-[60%] left-[5%]" color="oklch(0.85 0.19 165)" />
      <Dot className="w-4 h-4 top-[80%] right-[8%]" color="oklch(0.72 0.22 25)" />
      <Dot className="w-1.5 h-1.5 top-[45%] left-[45%]" color="oklch(0.86 0.17 90)" />

      {/* NAV */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Timo" className="w-11 h-11 rounded-xl" />
          <span className="font-display text-2xl font-bold">Timo</span>
        </div>
        <DownloadBtn>
          <Download className="w-4 h-4" /> Baixar
        </DownloadBtn>
      </nav>

      {/* HERO */}
      <section className="relative z-10 px-6 md:px-12 pt-10 md:pt-20 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs uppercase tracking-wider mb-6">
              <Flame className="w-3.5 h-3.5 text-coral" />
              <span>Novos matches todo dia</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] mb-6">
              O clima aqui <br />
              <span className="text-gradient-mint">esquenta rápido.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Timo é o app de namoro pra quem cansou de conversa morna. Match com quem
              tá afim de verdade, papo direto, sem enrolação.
            </p>
            <div className="flex flex-wrap gap-3">
              <DownloadBtn size="lg">
                <Download className="w-5 h-5" /> Baixar o Timo
              </DownloadBtn>
              <DownloadBtn size="lg" variant="ghost">
                <Sparkles className="w-5 h-5" /> Ver como funciona
              </DownloadBtn>
            </div>
            <div className="flex items-center gap-4 mt-8 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {["#ff8a7a", "#7effc9", "#ffd66b", "#c58fff"].map((c) => (
                  <div
                    key={c}
                    className="w-8 h-8 rounded-full border-2 border-background"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-sunny text-sunny" />
                  ))}
                </div>
                <span>+50 mil corações batendo forte</span>
              </div>
            </div>
          </div>

          {/* Phone mockup / logo showcase */}
          <div className="relative flex justify-center">
            <div
              className="absolute inset-0 blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.85 0.19 165 / 0.5), transparent 60%)",
              }}
            />
            <div className="relative animate-float">
              <div className="glass rounded-[3rem] p-8 glow-mint">
                <img src={logo} alt="Timo app" className="w-64 h-64 rounded-3xl" />
              </div>
              <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 glow-coral animate-pulse-glow">
                <Heart className="w-6 h-6 text-coral fill-coral" />
              </div>
              <div className="absolute -top-4 -right-4 glass rounded-2xl p-4">
                <MessageCircleHeart className="w-6 h-6 text-mint" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 px-6 md:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Feito pra <span className="text-gradient-mint">acontecer</span>.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Sem swipes infinitos, sem match que some. Aqui é papo reto e química de verdade.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Flame,
                color: "text-coral",
                title: "Match Quente",
                desc: "Nosso algoritmo entende o que te atrai e mostra quem tá no mesmo clima.",
              },
              {
                icon: MessageCircleHeart,
                color: "text-mint",
                title: "Papo sem trava",
                desc: "Quebra-gelos ousados, áudios, figurinhas — do jeito que a conversa pede.",
              },
              {
                icon: Zap,
                color: "text-sunny",
                title: "Encontros de verdade",
                desc: "Filtros por região e vibe pra você marcar rolê pertinho e hoje mesmo.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="glass rounded-3xl p-7 hover:scale-[1.02] transition-transform"
              >
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-5 ${f.color}`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MATCHES — substitua as imagens em src/assets/match-1.jpg, match-2.jpg, match-3.jpg */}
      <section className="relative z-10 px-6 md:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Quem você vai <span className="text-gradient-mint">encontrar</span>.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Gente real, pertinho de você, com a mesma vibe. Dá só uma espiada.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                img: match1,
                name: "Larissa, 31",
                location: "São Paulo",
                tag: "Papo sério",
                online: true,
              },
              {
                img: match2,
                name: "Camila, 27",
                location: "Rio de Janeiro",
                tag: "Aventura",
                online: true,
              },
              {
                img: match3,
                name: "Julia, 45",
                location: "Curitiba",
                tag: "Sem enrolação",
                online: false,
              },
            ].map((p) => (
              <div
                key={p.name}
                className="group relative rounded-3xl overflow-hidden glass hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold">{p.name}</h3>
                    <Verified className="w-4 h-4 text-mint fill-mint" />
                    {p.online && (
                      <span className="w-2.5 h-2.5 rounded-full bg-mint animate-pulse" title="online" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/80">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {p.location}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/15 text-xs font-medium">
                      {p.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 px-6 md:px-12 py-16">
        <div className="max-w-5xl mx-auto glass rounded-[2rem] p-10 md:p-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { n: "50k+", l: "usuários" },
              { n: "1.2M", l: "matches" },
              { n: "4.9★", l: "avaliação" },
              { n: "24h", l: "primeiro date" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-4xl md:text-5xl font-display font-bold text-gradient-mint">
                  {s.n}
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative z-10 px-6 md:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">
            Rolou no <span className="text-gradient-mint">Timo</span>.
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                n: "Lara, 26",
                t: "Baixei ontem, hoje já tô marcando um drink. Nunca foi tão rápido.",
              },
              {
                n: "Diego, 30",
                t: "Diferente de tudo que eu usei. As pessoas realmente respondem.",
              },
              {
                n: "Bia, 24",
                t: "Melhor app pra quem quer papo sério ou papo picante — sem julgamento.",
              },
            ].map((t) => (
              <div key={t.n} className="glass rounded-3xl p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-sunny text-sunny" />
                  ))}
                </div>
                <p className="text-foreground/90 mb-4 leading-relaxed">"{t.t}"</p>
                <div className="text-sm text-muted-foreground">— {t.n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 md:px-12 py-24">
        <div className="max-w-4xl mx-auto text-center glass rounded-[2.5rem] p-12 md:p-16 glow-coral relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, oklch(0.72 0.22 25 / 0.6), transparent 50%), radial-gradient(circle at 80% 80%, oklch(0.85 0.19 165 / 0.5), transparent 50%)",
            }}
          />
          <div className="relative">
            <Flame className="w-12 h-12 text-coral mx-auto mb-6" />
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Tá esperando <br />
              <span className="text-gradient-mint">o quê?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Baixa o Timo agora. O próximo match pode ser hoje à noite.
            </p>
            <DownloadBtn size="lg">
              <Download className="w-5 h-5" /> Baixar grátis
            </DownloadBtn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 px-6 md:px-12 py-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Timo" className="w-8 h-8 rounded-lg" />
            <span className="font-display font-bold">Timo</span>
            <span className="text-xs text-muted-foreground ml-2">© 2026</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Feito com <Heart className="inline w-3 h-3 text-coral fill-coral" /> pra
            quem não perde tempo.
          </div>
        </div>
      </footer>
    </div>
  );
}
