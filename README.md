# 🦁 Lions Seminovos - Plataforma Web e Catálogo

Este projeto consiste no desenvolvimento da interface web para a **Lions Seminovos**, incluindo a página inicial institucional e a página de catálogo de veículos. O foco do desenvolvimento foi criar uma experiência moderna, responsiva (Mobile-First) e com animações suaves, mantendo a identidade visual da marca (fundo escuro e detalhes em vermelho).

O projeto foi construído utilizando tecnologias web fundamentais, sem a necessidade de frameworks complexos, garantindo leveza e performance:

- **HTML5:** Estruturação semântica e acessível.
- **CSS3:** Estilização avançada utilizando Flexbox, CSS Grid, Variáveis (Custom Properties), Media Queries e Keyframes (animações).
- **JavaScript (Vanilla):** Manipulação do DOM, criação de lógica de carrossel, envio simulado de formulário e uso da API `IntersectionObserver` para animações de scroll.
- **HLS.js:** Biblioteca externa utilizada para renderizar o streaming de vídeo (formato `.m3u8`) de forma nativa em navegadores que não possuem suporte a ele.

## 🧠 Decisões Tomadas e Como o Teste foi Resolvido

O desenvolvimento foi pensado para entregar um código limpo, de fácil manutenção e altamente responsivo.

### 1. Abordagem Mobile-First e Layouts Modernos

- Todo o CSS foi escrito pensando primeiro na tela de celular. As regras para telas maiores (Desktop) foram adicionadas usando `@media (min-width: 768px)`.
- **CSS Grid e Flexbox:** O layout de formulários, o catálogo de carros e a divisão de colunas lado a lado (como no formulário de agendamento) foram feitos inteiramente com Grid e Flexbox, abandonando técnicas antigas como `float`. Isso garante que o layout não quebre em telas menores.

### 2. Semântica e Acessibilidade

- Uso extensivo de tags semânticas (`<header>`, `<section>`, `<article>`, `<figure>`, `<aside>`).
- Adição de atributos de acessibilidade, como `aria-label` em botões de navegação do carrossel e `aria-expanded` no menu hambúrguer.

### 3. Interatividade e Micro-interações (UX/UI)

- **Carrossel (Hero):** Lógica em JavaScript puro para navegação (setas, bolinhas), autoplay e suporte a gestos de _swipe_ (deslizar o dedo) no celular.
- **Animações de Scroll:** Utilização do `IntersectionObserver` do JavaScript. O texto da seção de vídeo "surge" de forma em cascata (fade-in + slide-up) toda vez que entra na tela, voltando a ficar invisível ao sair, permitindo que a animação se repita.
- **Formulário de Agendamento:** O formulário foi estilizado simulando um cartão 3D (com sombras e detalhes vermelhos). O envio utiliza `e.preventDefault()` do JavaScript para não recarregar a página (evitando erros HTTP 405) e exibir uma animação de "sucesso" no lugar do formulário.

### 4. Design System

- Uso de Variáveis CSS (`:root`) para centralizar as cores da marca (ex: `--accent-red: #a30000`), facilitando a alteração de temas no futuro.

### Para acessar Clique no link abaixo

Para acessar clique aqui: https://evelyneleoterio.github.io/lionsseminovos/

## 📂 Organização do Código

O projeto está organizado visando a separação de responsabilidades:

```text
📁 lions-seminovos/
│
├── 📁 assets/            # Imagens locais, logos e arquivos de mídia
│
├── 📁 css/
│   └── style.css         # Todo o CSS do projeto (dividido por seções)
│
├── 📁 js/
│   └── main.js           # Lógica do menu, carrossel, animações e form

Para acessar clique aqui: https://evelyneleoterio.github.io/lionsseminovos/
│
├── index.html            # Página inicial (Hero, Vídeo, Agendamento)
├── catalogo.html         # Página de estoque (Filtros e Grid de carros)
└── README.md             # Documentação do projeto
```
