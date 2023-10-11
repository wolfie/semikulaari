# Config

Check out `src/lib/configs.ts`. It has some timing settings that you can play with.

# Deploy

```bash
yarn build && npx wrangler pages deploy .svelte-kit/cloudflare
```

# Warning

remember NOT TO USE Node 18.14. It will kill your sanity when trying to run on ipad. `nvm use` is your friend.
