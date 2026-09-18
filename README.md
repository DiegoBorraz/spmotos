# SP Motos — vitrine (cenário 1)

Site estático de revenda: lista motos, mostra a ficha e manda para o WhatsApp da loja.

## Rodar

```bash
npm install
npm run dev
```

Por padrão o estoque mock vem da [API Ninjas de motos](https://api-ninjas.com/api/motorcycles) (`STOCK_SOURCE=mock` e `API_NINJAS_KEY` no `.env.local`). Preço, km e fotos da vitrine continuam no overlay local — a Ninjas só envia ficha técnica.

Para usar a API Click Garage, copie `.env.example` e defina:

```
STOCK_SOURCE=api
CLICKGARAGE_TOKEN=...
WHATSAPP_E164=5551...
SITE_URL=http://localhost:3000
```

As chaves (`API_NINJAS_KEY`, `CLICKGARAGE_TOKEN`) nunca vão para o navegador.
