# Sweg Labs – Automação com Playwright (JavaScript) + Page Object Model

Suíte E2E para https://www.saucedemo.com/ cobrindo:

1. Login com sucesso
2. Adição de um produto ao carrinho
3. Validação das informações no checkout (item, preço, subtotal, total) e conclusão da compra

## Estrutura

```
pages/    -> Page Objects (um arquivo por tela: Login, Inventory, Cart, Checkout)
tests/    -> Testes (só usam os Page Objects, sem seletores soltos)
utils/    -> Funções auxiliares
playwright.config.js
```

## Pré-requisito
Node.js 18 ou superior.

## Como rodar

```bash
npm install
npx playwright install                       # baixa os binários dos navegadores onde são executados os testes
npm init playwright@latest                   # inicia e configura um projeto completo de testes
npx playwright test                          # roda todos os testes
npx playwright test --headed                 # roda com o navegador visível
npx playwright test --ui                     # UI Mode (interativo)
npx playwright show-report                   # abre o relatório HTML
```

## Usuário de teste
`standard_user` / `secret_sauce` (público, divulgado na própria página de login).
