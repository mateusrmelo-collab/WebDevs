# DevMateus — Curso de desenvolvimento web

Landing page de Mateus Rodrigues, agora separada em HTML, CSS e JavaScript, sem comentários nesses três arquivos.

## Como usar

1. Extraia **todo** o conteúdo do ZIP.
2. Mantenha os arquivos e as pastas na estrutura abaixo.
3. Abra `index.html` no navegador.

Para publicar, envie a estrutura inteira para o GitHub Pages, Netlify ou outra hospedagem estática. Não é necessário instalar pacotes, compilar arquivos ou configurar um back-end.

```text
index.html
style.css
script.js
assets/
  favicon.svg
  mateus.jpg
  fonts/
  icons/
licenses/
README.md
```

**Substitua o HTML antigo pelo `index.html` deste pacote.** Não cole o conteúdo de `script.js` depois do fechamento da página: ele já é carregado pela tag `<script src="script.js" defer></script>`.

## Organização

- `index.html`: estrutura e conteúdo da página. Não contém CSS ou JavaScript embutidos.
- `style.css`: todos os estilos, responsividade e declarações das fontes locais.
- `script.js`: contagem regressiva, editor demonstrativo, menu, módulos, FAQ e calendário.
- `assets/`: imagens, ícones e fontes locais, sem grandes blocos Base64 no código.
- `licenses/`: avisos de licença dos recursos de terceiros, preservados fora do HTML, CSS e JavaScript e não exibidos no site.

## Correções

- JavaScript separado do documento HTML, evitando que os exemplos de código interfiram na marcação da página.
- Exemplos renderizados com nós de texto e `textContent`, sem `innerHTML`.
- Abas HTML, CSS e JS com 13 linhas, mesma escala tipográfica e tamanho de editor estável.
- Comentários removidos do HTML, CSS e JavaScript, inclusive dos exemplos.
- Nenhum trecho `/cdn-cgi/` ou código de desafio do Cloudflare incluído no projeto.
- Sem scripts, texto de programação ou licenças soltos no final da página.

## Personalizar

Edite os textos em `index.html`, o visual em `style.css` e as interações em `script.js`. As alterações são diretas: não existe etapa de build.

A data está em `CONFIG.launchAt`, no início de `script.js`:

```js
launchAt: "2026-09-15T00:00:00-03:00"
```

O lançamento considera **15/09/2026, às 00h no horário de Brasília**, conforme a definição adotada para a página. Ao alterar a data, ajuste também os textos, os metadados, o elemento `time`, os dados visíveis do calendário e o nome/UID do lembrete.

Os botões abrem o calendário, não uma inscrição. O arquivo `.ics` inclui um alarme para um dia antes; no Google Agenda, revise seus lembretes ao salvar. O evento de 30 minutos é apenas um marcador de lançamento, não o agendamento de uma aula.

Não há coleta de dados pessoais, rastreadores, pagamento ou formulário fictício. Preço, formato das aulas e condições de acesso não foram inventados. A organização da trilha em seis etapas é uma sugestão editorial a revisar antes da divulgação.

## Recursos

- Avatar: disponibilizado no portfólio de Mateus Rodrigues; mantidos os direitos dos respectivos titulares.
- Tecnologias e habilidades: todas as 18 habilidades da imagem fornecida, incluindo React, Node.js e MongoDB.
- Ícones de tecnologias: Devicon, licença MIT.
- Fontes locais: Space Grotesk, Inter e JetBrains Mono, sob SIL Open Font License.
- Ícones de interface e elementos visuais: SVG e CSS locais.

Os links externos levam ao portfólio, GitHub e Google Agenda somente quando escolhidos pelo visitante. Para visualizar o layout completo aqui, use a prévia ao vivo; o visualizador isolado de um arquivo HTML pode bloquear os arquivos CSS/JS separados. O projeto extraído funciona diretamente no navegador.
