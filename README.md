```bash
pwd
cd D:/projects/next
mkdir blog
cd blog

# init next
ec next-app . # pnpm create next-app .
code .
mkdir -p content/posts
code .prettierrc # https://github.com/tailwindlabs/prettier-plugin-tailwindcss

# Install deps
ea react-markdown @tailwindcss/typography @google-cloud/text-to-speech server-only # pnpm add
ec @eslint/config@latest
ea -D @types/react @types/node @shadcn/ui prettier prettier-plugin-tailwindcss eslint-plugin-import @eslint/compat

# Initialize shadcn/ui
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card

pnpm remove @tailwindcss/typography tailwind-merge tailwindcss-animate
ea -D @tailwindcss/typography tailwind-merge tailwindcss-animate
ea server-only

```
