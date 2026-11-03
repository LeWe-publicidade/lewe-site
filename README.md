# LeWe Soluções — site estático v0.2

Segunda versão com scroll reveal, barra de progresso, ticker em movimento, parallax moderado, filtros, lightbox e formulário de contato.

## Atenção ao formulário

O GitHub Pages não processa formulários no servidor. Esta versão utiliza um **POST nativo para o serviço externo FormSubmit.co**, apontando provisoriamente para `werner.wellington@gmail.com`. **A primeira mensagem exige confirmação de ativação na caixa de entrada**. Sem esse passo e um envio de teste confirmado, o formulário não deve ser tratado como operacional. O formulário envia dados a serviço terceiro; revisar aviso de privacidade e conformidade antes de divulgação pública. Para trocar destinatário, editar o `action` do formulário `id="contact-form"` no `index.html`.

O endereço do email aparece no código público. Para ocultá-lo, usar token de formulário ou outro endpoint configurado pelo usuário.

## Como atualizar no GitHub

Abra `https://github.com/LeWe-publicidade/lewe-site` e substitua os arquivos de mesmo nome (ou use GitHub Desktop / Git). **Não remova** `.github/workflows/static.yml` já instalado no repositório: o ZIP não inclui o workflow, pois contém apenas o site. Assim, o deploy existente continuará funcionando.

## Conteúdo e pendências

Leia `CHECKLIST_PRODUCAO.md` para as tarefas de design e conteúdo. O wordmark, favicon e arte do hero são **provisórios**. O contato é **provisório**. Peças de portfólio representam trabalhos anteriores da direção criativa, não clientes necessariamente contratados pela LeWe. Verifique permissões de divulgação.

## Hospedagem e migração

Arquivos estáticos, caminhos relativos, sem bibliotecas JS ou CDN de terceiros. Pode ser publicado em GitHub Pages ou outra hospedagem estática. O formulário depende de terceiro até que seja substituído por um backend próprio.

# LeWe Soluções — site estático (MVP 01)

Vitrine comercial inicial em **HTML5 + CSS3 + JavaScript puro**. Sem frameworks, backend, banco de dados ou dependências externas.

## Estrutura

- `index.html`: conteúdo e seções da página.
- `styles.css`: identidade visual responsiva.
- `script.js`: filtros do portfólio, menu móvel e ampliação das imagens.
- `assets/`: **sete imagens reais de projetos fornecidas pelo usuário**, comprimidas em WebP.
- `favicon.svg`: símbolo temporário tipográfico (não é a marca aprovada).
- `.nojekyll`: habilita publicação estática sem processamento Jekyll.
- `robots.txt`: orientação básica para rastreamento.

## Como visualizar localmente
Abra `index.html` no navegador, ou execute `python -m http.server 8000` na pasta e abra `http://localhost:8000`.

## Publicar com GitHub Pages (grátis)
1. Crie um repositório público `lewe-site` na conta da LeWe.
2. Envie os **arquivos desta pasta para a raiz** do repositório (não envie a pasta pai como subpasta).
3. Em `Settings` → `Pages`, selecione `Deploy from a branch`, branch `main`, pasta `/(root)` e salve.
4. O endereço padrão será `https://SEU-USUARIO.github.io/lewe-site/`. Os caminhos relativos já estão configurados para essa modalidade.
5. Para domínio personalizado e DNS, configurar após validar a versão inicial.

## Revisão antes de divulgar

- **Marca**: o wordmark e favicon atuais são provisórios; substituir pelos arquivos finais aprovados.
- **Contato**: o e-mail `werner.wellington@gmail.com` é contato temporário; substituir por e-mail/WhatsApp oficial da LeWe quando definido.
- **Cases**: as imagens são exemplos do histórico profissional da direção criativa, não clientes contratados diretamente pela LeWe. Confirmar autorizações de exibição pública.
- **Serviços**: verificar operacionalmente o que a LeWe entrega diretamente ou por parceiros antes de assumir compromissos comerciais.
- **SEO**: depois da escolha de domínio, adicionar endereço canônico, Open Graph, favicon oficial e analytics conforme necessidade.
- **Privacidade**: esta versão não coleta dados nem usa cookies analíticos.

## Migração
Copie todos os arquivos para qualquer hospedagem com suporte a arquivos estáticos. Não é necessário Node.js, PHP ou base de dados.

## Licença e direitos
Código produzido para a LeWe. As peças de portfólio, marcas de clientes e conteúdos visuais mantêm seus direitos respectivos; não redistribuir esses arquivos isoladamente sem autorização.
