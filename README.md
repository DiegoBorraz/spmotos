# SP Motos — vitrine (cenário 1)

Site estático de revenda: lista motos, mostra a ficha e oferece WhatsApp com Sandra ou Caroline.

## Rodar

```bash
npm install
npm run dev
```

Estoque via JSON de integração Click Garage. Copie `.env.example` para `.env.local`:

```
CLICKGARAGE_FEED_URL=https://clickgarage.com.br/integracoes/site-integracao/json/sp-motos-1
SITE_URL=http://localhost:3000
```

Números de WhatsApp ficam em `lib/store-whatsapp.ts` (Sandra e Caroline).

A URL do feed fica só no servidor (`.env.local`), nunca no navegador.
