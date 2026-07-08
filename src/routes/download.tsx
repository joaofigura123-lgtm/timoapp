import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowUp,
  CheckCircle2,
  Download,
  FolderDown,
  Settings,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import logo from "@/assets/timo-logo.png";
import step1 from "@/assets/step-1-download.png";
import step2 from "@/assets/step-2-transfers.png";
import step3 from "@/assets/step-3-allow.png";
import step4 from "@/assets/step-4-install.png";
import { APP_LINKS } from "@/config/app-links";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: "Baixar Timo — Passo a passo de instalação" },
      {
        name: "description",
        content:
          "Aprenda a baixar e instalar o APK do Timo no seu Android em poucos passos simples.",
      },
      { property: "og:title", content: "Baixar Timo — Como instalar" },
      {
        property: "og:description",
        content: "Guia rápido para baixar e instalar o Timo no seu celular Android.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: DownloadPage,
});

function DownloadPage() {
  const [clicked, setClicked] = useState(false);

  const handleDownload = () => {
    setClicked(true);
    // rola pro topo pra reforçar a dica do pop-up
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    // registra o clique (não bloqueia o download em caso de erro)
    void supabase.rpc("increment_download_clicks").then(({ error }) => {
      if (error) console.error("Falha ao contar clique:", error.message);
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* dica flutuante — só depois do clique */}
      {clicked && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md">
          <div className="glass glow-mint rounded-2xl p-4 flex items-start gap-3 animate-pulse-glow">
            <ArrowUp className="w-6 h-6 text-mint shrink-0 mt-0.5" />
            <div className="text-sm leading-relaxed">
              <div className="font-semibold text-foreground mb-0.5">
                Olha ali em cima ↑
              </div>
              <div className="text-muted-foreground">
                O Chrome está mostrando o download. Toque em <b>"Abrir"</b> assim que
                aparecer para instalar. Se sumir, siga o <b>Passo 2</b> abaixo.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-5">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Timo" className="w-11 h-11 rounded-xl" />
          <span className="font-display text-2xl font-bold">Timo</span>
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm glass hover:bg-white/10 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
      </nav>

      {/* HERO */}
      <section className="relative z-10 px-6 md:px-12 pt-6 md:pt-12 pb-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs uppercase tracking-wider mb-6">
            <Smartphone className="w-3.5 h-3.5 text-mint" />
            <span>Android · APK oficial</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1] mb-5">
            Baixar o <span className="text-gradient-mint">Timo</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Nosso app é distribuído fora da Play Store. Siga o passo a passo abaixo — leva
            menos de 1 minuto.
          </p>

          <a
            href={APP_LINKS.download}
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold bg-gradient-to-r from-mint-glow via-mint to-coral text-deep glow-mint hover:scale-[1.03] transition-transform"
          >
            <Download className="w-5 h-5" /> Baixar o APK agora
          </a>

          <div className="mt-4 text-xs text-muted-foreground flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-mint" /> Arquivo oficial · seguro
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="relative z-10 px-6 md:px-12 pb-24">
        <div className="max-w-3xl mx-auto space-y-5">
          <StepCard
            n={1}
            icon={Download}
            iconColor="text-coral"
            image={step1}
            imageAlt="Pop-up de download do Timo no Chrome"
            title="Toque em “Baixar o APK”"
            desc={
              <>
                Ao tocar, o Chrome mostra um <b>pop-up no topo</b> da tela com o progresso
                do download. Fique de olho ali em cima — quando terminar, aparece o botão{" "}
                <b>“Abrir”</b>. Toque nele para ir direto para a instalação.
              </>
            }
          />

          <StepCard
            n={2}
            icon={FolderDown}
            iconColor="text-sunny"
            image={step2}
            imageAlt="Menu Transferências do Chrome com o arquivo timo.apk"
            title="Se o pop-up sumir, abra “Transferências”"
            desc={
              <>
                No Chrome, toque no menu <b>⋮</b> (canto superior direito) e escolha{" "}
                <b>Transferências</b> (ou <b>Downloads</b>). Toque no arquivo{" "}
                <b>timo.apk</b> para abrir.
              </>
            }
          />

          <StepCard
            n={3}
            icon={Settings}
            iconColor="text-mint"
            image={step3}
            imageAlt="Tela de permissão do Android: Permitir desta fonte"
            title="Autorize a instalação"
            desc={
              <>
                Na primeira vez, o Android pergunta se pode instalar apps de fontes
                desconhecidas. Vai aparecer um pop-up com o botão <b>“Configurações”</b> —
                toque nele, ative a chave <b>“Permitir desta fonte”</b> e volte.
              </>
            }
          />

          <StepCard
            n={4}
            icon={Sparkles}
            iconColor="text-coral"
            image={step4}
            imageAlt="Tela de instalação concluída do Timo"
            title="Instalar e abrir"
            desc={
              <>
                Toque em <b>Instalar</b>. Em alguns segundos aparece <b>Abrir</b> — e
                pronto, o Timo está no seu celular. Crie seu perfil e o clima já começa.
              </>
            }
          />

          <div className="glass rounded-3xl p-6 flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-mint shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold mb-1">Pronto! Já pode dar match.</div>
              <p className="text-sm text-muted-foreground">
                Se o download não começar, toque de novo no botão acima. Qualquer dúvida,
                é só chamar o suporte pelo próprio app depois de instalado.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <a
              href={APP_LINKS.download}
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold glass hover:bg-white/10 transition"
            >
              <Download className="w-4 h-4" /> Baixar novamente
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 px-6 md:px-12 py-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Timo" className="w-8 h-8 rounded-lg" />
            <span className="font-display font-bold">Timo</span>
            <span className="text-xs text-muted-foreground ml-2">© 2026</span>
          </div>
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
            ← Voltar para o site
          </Link>
        </div>
      </footer>
    </div>
  );
}

function StepCard({
  n,
  icon: Icon,
  iconColor,
  image,
  imageAlt,
  title,
  desc,
}: {
  n: number;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  image: string;
  imageAlt: string;
  title: string;
  desc: React.ReactNode;
}) {
  return (
    <div className="glass rounded-3xl p-5 md:p-6">
      <div className="flex gap-5">
        <div className="flex flex-col items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-mint-glow to-coral text-deep font-bold flex items-center justify-center text-lg shrink-0">
            {n}
          </div>
          <div className={`w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center ${iconColor}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {desc}
          </p>
        </div>
      </div>

      <div className="mt-5 relative overflow-hidden rounded-2xl border border-white/10 bg-deep/40">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          width={1024}
          height={1024}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/10" />
      </div>
    </div>
  );
}
