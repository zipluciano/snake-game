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

O deploy está configurado via GitHub Actions em `.github/workflows/deploy.yml`, usando o fluxo nativo do GitHub Pages. O Vite usa `base: './'` para gerar caminhos relativos no build, evitando problemas de carregamento de assets tanto em user/org pages quanto em project pages.

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
