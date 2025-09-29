# ---------- Build stage ----------
	FROM node:16-alpine AS builder

	WORKDIR /app
	
	# Yarn Classic via Corepack
	RUN corepack enable && corepack prepare yarn@1.22.22 --activate
	
	# Only copy manifests first
	COPY package.json yarn.lock ./
	
	# Install deps
	RUN yarn install --frozen-lockfile --non-interactive
	
	# Copy source
	COPY . .
	
	# If you enable Firebase, pass these as build args (see build command below)
	ARG API_KEY
	ARG AUTH_DOMAIN
	ARG PROJECT_ID
	ARG STORAGE_BUCKET
	ARG MESSAGING_SENDER_ID
	ARG APP_ID
	ARG MEASUREMENT_ID
	ENV API_KEY=$API_KEY \
		AUTH_DOMAIN=$AUTH_DOMAIN \
		PROJECT_ID=$PROJECT_ID \
		STORAGE_BUCKET=$STORAGE_BUCKET \
		MESSAGING_SENDER_ID=$MESSAGING_SENDER_ID \
		APP_ID=$APP_ID \
		MEASUREMENT_ID=$MEASUREMENT_ID
	
	# Disable telemetry; set production env
	ENV NUXT_TELEMETRY_DISABLED=1 \
		NODE_ENV=production
	
	# Static site build
	RUN yarn generate
	
	# ---------- Runtime stage ----------
	FROM nginx:alpine AS runner
	
	# Copy SPA nginx config
	COPY nginx.conf /etc/nginx/conf.d/default.conf
	
	# Copy built static assets
	COPY --from=builder /app/dist /usr/share/nginx/html
	
	EXPOSE 80
	CMD ["nginx", "-g", "daemon off;"]