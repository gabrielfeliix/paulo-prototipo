# Plano de Implementação - Paleta Azul QWize

Este plano descreve a reestruturação cromática do projeto para adotar a identidade visual baseada na imagem da pasta `minha paleta`:
- **Azul Cobalto Elétrico (`#2b5cff`)** como a cor principal das seções (substituindo o amarelo).
- **Azul Escuro Profundo (`#080c16`)** como a cor de fundo das seções escuras (substituindo o carvão).
- **Ciano Elétrico (`#00f0ff`)** para o "Q" do logotipo e realces secundários.
- **Laranja/Âmbar (`#ff9500`)** da imagem como cor de destaque para estatísticas e componentes de contraste.

---

## 1. Alteração de Variáveis CSS (`style.css`)
Substituiremos as variáveis atuais pelas cores da paleta:
```css
:root {
    --blue: #2b5cff;        /* Cor principal da página (seção Hero, Módulos) */
    --dark-blue: #080c16;   /* Fundo das seções escuras (Ticker, Inscrição, Rodapé) */
    --cyan: #00f0ff;        /* Ciano elétrico do logotipo "Q" e realces */
    --orange: #ff9500;      /* Laranja de destaque da palavra "método" */
    --white: #ffffff;
    --black: #000000;
    
    --font-heading: 'Cabinet Grotesk', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --font-body: 'Satoshi', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    
    --transition-brutal: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.15s ease, border-color 0.15s ease;
    --transition-smooth: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 2. Ajustes de HTML (`index.html`)

### Logotipo QWize
Removeremos a tag `span` antiga do meio de `Q<span>W</span>ize` e estruturaremos com uma classe especial para pintar o "Q" de ciano:
```html
<a href="#" class="logo"><span class="q-color">Q</span>Wize</a>
```
- No cabeçalho, o "Wize" será preto (`var(--black)`).
- No rodapé, o "Wize" será branco (`var(--white)`).

---

## 3. Estilização por Seção

### Cabeçalho
- **Fundo**: Azul Cobalto (`var(--blue)`) com links em branco e borda inferior preta de 2px.

### Hero
- **Fundo**: Azul Cobalto (`var(--blue)`) com padrão de pontos pretos (10% de opacidade).
- **Título**: Texto principal em branco, com o texto destacado (`highlight-orange`) em laranja (`var(--orange)`).
- **Meta Cards**: Fundos brancos com bordas pretas e sombras rígidas pretas.

### Ticker de Marcas
- **Fundo**: Azul Escuro (`var(--dark-blue)`).
- **Texto**: Ciano Elétrico (`var(--cyan)`) com opacidade de 50%.

### Seção de Contraste (Autocomplete vs Engenharia)
- **Fundo**: Branco (`var(--white)`).
- **Card Solução (Engineer)**: Fundo em Azul Cobalto (`var(--blue)`), texto branco/laranja, borda preta de 2px e sombra de 8px preta.

### Seção de Experiência (Bento Grid)
- **Fundo**: Branco (`var(--white)`).
- **Card 1 (Bio)**: Fundo Ciano Elétrico (`var(--cyan)`), texto preto, borda preta de 2px e sombra rígida.
- **Card 2 (Estatísticas)**: Fundo Laranja (`var(--orange)`), texto preto, borda preta de 2px e sombra rígida.
- **Card 3 (Setores)**: Fundo Branco (`var(--white)`), texto preto.

### Seção de Módulos (Grade de Currículos)
- **Fundo**: Azul Cobalto (`var(--blue)`) com padrão de pontos pretos (10% de opacidade).
- **Cards**: Fundo Branco, borda preta e sombra preta.
- **Números de Módulo**: Fundo Ciano (`var(--cyan)`) que vira Laranja (`var(--orange)`) no hover.

### Seção de Detalhes
- **Fundo**: Branco.
- **Card Principal**: Fundo Azul Cobalto (`var(--blue)`), texto branco.
- **Card Inclusos**: Fundo Laranja (`var(--orange)`), texto preto.

### Seção de Inscrição
- **Fundo**: Azul Escuro (`var(--dark-blue)`).
- **Card do Formulário**: Fundo Branco.
- **Inputs**: Fundo branco, foco com sombra em Ciano (`var(--cyan)`).

### Rodapé
- **Fundo**: Azul Escuro (`var(--dark-blue)`).
- **Links Sociais**: Fundo azul escuro, borda branca, virando Ciano (`var(--cyan)`) com texto preto no hover.

---

## 4. Plano de Verificação
- Verificar se todas as cores e contrastes estão perfeitamente visíveis.
- Conferir o alinhamento das letras "QWize" no logotipo do cabeçalho e rodapé.
- Garantir que todos os botões e animações funcionem normalmente no mobile e desktop.
