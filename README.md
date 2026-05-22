# Snake Game

Um projeto de estudo com um snake game desenvolvido em React. Além de praticar fundamentos de frontend, o objetivo deste projeto também é aprender temas relacionados ao desenvolvimento com IA, explorando como ferramentas e assistentes podem apoiar criação, iteração e melhoria de software.

## Tecnologias

- React 18
- Vite
- Tailwind CSS
- PostCSS

## Como rodar localmente

Pré-requisitos:

- Node.js instalado
- npm instalado

Passos:

```bash
npm install
npm run dev
```

Depois, abra o endereço exibido pelo Vite no navegador.

## Scripts disponíveis

- `npm run dev`: inicia o ambiente de desenvolvimento
- `npm run build`: gera a versão de produção
- `npm run preview`: visualiza localmente o build de produção

## Deploy

O deploy está configurado via GitHub Actions em `.github/workflows/deploy.yml`, usando o fluxo nativo do GitHub Pages. Em builds rodando no GitHub, o `base` do Vite é ajustado automaticamente para funcionar tanto em user/org pages (`https://usuario.github.io/`) quanto em project pages (`https://usuario.github.io/repositorio/`).

## Estrutura do projeto

```text
snake-game/
├── src/
│   ├── App.jsx       # lógica e interface do jogo
│   ├── main.jsx      # inicialização da aplicação
│   └── index.css     # estilos globais e animações
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Como jogar

- use as setas do teclado ou `W`, `A`, `S`, `D` para mover
- pressione `Espaço` para pausar ou retomar
- no mobile, use os botões de direção na tela
- evite bater nas paredes ou no próprio corpo
