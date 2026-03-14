# NexusArqui

Sistema de gestão integrado para escritório de arquitetura. Aplicação desktop (Windows) com suporte offline via PWA/Service Worker.

## Stack

- **React 18** + **TypeScript** (strict mode)
- **Vite** (bundler + dev server)
- **TailwindCSS** (design system customizado)
- **IndexedDB** (persistência local via wa-sqlite)
- **PWA** (vite-plugin-pwa / Workbox para funcionamento offline)
- **Vitest** (testes unitários)
- **ESLint + Prettier + Husky** (qualidade de código)

## Setup

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Scripts Principais

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |
| `npm run typecheck` | Verificação de tipos TypeScript |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (auto-fix) |
| `npm test` | Rodar testes |
| `npm run verify` | Pipeline completa de verificação |

## Arquitetura

```
src/frontend/
  pages/           → Composição de telas (rotas)
  components/      → UI reutilizável (domínio + ui/)
  services/        → Regras de negócio e infraestrutura
  context/         → Estado global (React Context por domínio)
  hooks/           → Custom hooks reutilizáveis
  types/           → Contratos de tipos por domínio
  utils/           → Funções puras utilitárias
  constants/       → Constantes do app (tema, navegação, etc.)
```

### Domínios

- **Agenda** — Calendário, tarefas (Kanban), lembretes, bloco de notas
- **Comercial** — Prospects, orçamentos, propostas
- **Projetos** — Gestão de projetos com Gantt, checklist, financeiro
- **Clientes** — Cadastro completo com reuniões, notas, auditoria
- **Financeiro** — Gestão de caixa, visão geral, previsão, histórico
- **Documentos** — Arquivo pessoal e por projeto
- **Suprimentos** — Fornecedores, catálogo, cotações, comissões
- **Marketing** — Painel, conteúdos, redes sociais (Instagram)
- **Subcontratação** — Freelancers e serviços contratados
- **Relatórios** — Financeiro, projetos, aquisição

### Documentação Técnica

- `docs/architecture.md` — Arquitetura detalhada de camadas
- `docs/architecture-screaming.md` — Screaming architecture por domínio
- `docs/data-contracts/types-contracts.md` — Contratos de tipos
- `docs/design-system/` — Tokens de design e catálogo de componentes

## Offline

O app funciona 100% offline após o primeiro carregamento. Os dados são persistidos em IndexedDB local. O Service Worker (Workbox) faz cache de todos os assets estáticos automaticamente.

## Convenções

- **Conventional Commits** obrigatórios (hook commit-msg)
- **Imports**: `@/` alias para `src/frontend/`, relativo para módulos irmãos
- **Componentes**: PascalCase, barrel exports via `index.ts`
- **Serviços**: Lógica pura separada de UI
- **Tipos**: Um arquivo por domínio em `src/frontend/types/`
