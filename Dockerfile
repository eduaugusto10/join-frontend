# Estágio de build
FROM node:18-alpine as build

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o código fonte
COPY . .

# Construir a aplicação
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Copiar os arquivos de build do estágio anterior
COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuração personalizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta 3000
EXPOSE 3000

# Iniciar o nginx
CMD ["nginx", "-g", "daemon off;"] 