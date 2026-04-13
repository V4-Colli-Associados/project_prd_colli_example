import {
  quickStart,
  directoryStructure,
  toolRoles,
  faq,
} from "@/data/guide";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <Badge variant="outline" className="mb-4 font-mono text-xs">
            _new-project
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight">
            Vibe Coding — Guia de Uso
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl text-balance">
            Este diretorio e o ponto de partida para projetos com metodologia
            vibe coding. Documentacao antes de codigo, contexto antes de
            prompts, decisoes registradas antes de esquecidas.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10 space-y-12">
        {/* Quick Start */}
        <section>
          <h2 className="text-xl font-semibold mb-1">Como comecar</h2>
          <p className="text-sm text-muted-foreground mb-6">
            5 passos, nesta ordem. Nao pule para o codigo.
          </p>
          <div className="space-y-3">
            {quickStart.map((step) => (
              <Card key={step.number}>
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {step.number}
                    </div>
                    <div>
                      <CardTitle className="text-base">{step.title}</CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pl-[3.25rem]">
                  <ul className="space-y-1.5">
                    {step.details.map((d, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Directory Structure */}
        <section>
          <h2 className="text-xl font-semibold mb-1">Estrutura do diretorio</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Cada pasta tem um ciclo de vida diferente. Fundamentos mudam raramente,
            operacao muda todo dia.
          </p>
          <div className="space-y-2">
            {directoryStructure.map((item) => (
              <div
                key={item.path}
                className="flex items-center justify-between py-2.5 px-4 rounded-md border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <code className="text-sm font-mono text-primary flex-shrink-0">
                    {item.path}
                  </code>
                  <span className="text-sm text-muted-foreground truncate">
                    {item.description}
                  </span>
                </div>
                {item.badge && (
                  <Badge variant="secondary" className="text-[10px] flex-shrink-0 ml-2">
                    {item.badge}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* AI Tools */}
        <section>
          <h2 className="text-xl font-semibold mb-1">Quando usar cada IA</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Nao faca os tres fazerem a mesma coisa. De um papel claro para cada
            um.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {toolRoles.map((tool) => (
              <Card key={tool.name}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{tool.name}</CardTitle>
                  <CardDescription>
                    <Badge variant="outline" className="text-[10px]">
                      {tool.role}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3">
                    {tool.when}
                  </p>
                  <ul className="space-y-1">
                    {tool.examples.map((ex, i) => (
                      <li
                        key={i}
                        className="text-xs text-muted-foreground/80 italic"
                      >
                        "{ex}"
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Methodology Principles */}
        <section>
          <h2 className="text-xl font-semibold mb-1">Principios da metodologia</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Regras que guiam todas as decisoes deste diretorio.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "Docs antes de codigo",
                desc: "PRD e spec escritos antes de abrir o editor. A IA gera codigo melhor com contexto.",
              },
              {
                title: "CLAUDE.md como indice",
                desc: "~100 linhas que apontam para docs/. Progressive disclosure, nao enciclopedia.",
              },
              {
                title: "ADRs nunca deletadas",
                desc: "Decisoes revertidas viram novas ADRs. O historico e a memoria do projeto.",
              },
              {
                title: "Separar por estabilidade",
                desc: "Fundamentos (meses) vs Decisoes (semanas) vs Operacao (dias). Nunca misturar.",
              },
              {
                title: "Repo e a fonte de verdade",
                desc: "O que o agente nao ve no repo, nao existe. Slack e cabeca nao contam.",
              },
              {
                title: "Divida tecnica: pague cedo",
                desc: "Agentes replicam padroes ruins. Limpe regularmente, nao acumule.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="border border-border rounded-md p-4"
              >
                <p className="text-sm font-medium mb-1">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-semibold mb-1">Perguntas frequentes</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Duvidas comuns sobre a metodologia e o diretorio.
          </p>
          <Accordion className="space-y-2">
            {faq.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-md px-4"
              >
                <AccordionTrigger className="text-sm font-medium hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground pb-2">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <footer className="border-t border-border mt-4">
        <div className="mx-auto max-w-3xl px-6 py-4 text-center text-xs text-muted-foreground">
          Vibe Coding Training — SCIENT — Leia docs/ antes de comecar
        </div>
      </footer>
    </div>
  );
}

export default App;
