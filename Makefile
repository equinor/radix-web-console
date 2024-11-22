.PHONY: test
test:
	npm test

.PHONY: gen-radix-api
gen-radix-api:
	npm run "apigen:radix"

.PHONY: gen-local-radix-api
gen-local-radix-api:
	OVERRIDE_RADIX_API_SWAGGER_URL=http://localhost:3002/swaggerui/swagger.json npm run "apigen:radix"

.PHONY: gen-cost-api
gen-cost-api:
	npm run "apigen:cost"

.PHONY: gen-scan-api
gen-scan-api:
	npm run "apigen:scan"

.PHONY: gen-log-api
gen-log-api:
	npm run "apigen:log"

.PHONY: gen-local-radix-log-api
gen-local-radix-log-api:
	OVERRIDE_RADIX_LOG_API_SWAGGER_URL=http://localhost:8003/swagger/doc.json npm run "apigen:log"

.PHONY: gen-service-now-api
gen-service-now-api:
	npm run "apigen:service-now"

.PHONY: lint
lint:
	npm run "lint"
	npm run "lint-ts"

.PHONY: lint-fix
lint-fix:
	npm run "lint-fix"

.PHONY: lint-strict
lint-strict:
	npm run "lint-strict"

.PHONY: run
run:
	docker compose -f docker-compose.yml up

.PHONY: run-rebuild
run-rebuild:
	docker compose -f docker-compose.yml up --build

.PHONY: run-host
run-host:
	docker compose -f docker-compose-host.yml up

.PHONY: run-host-rebuild
run-host-rebuild:
	docker compose -f docker-compose-host.yml up --build

.PHONY: run-mac
run-mac:
	docker compose -f docker-compose-host-macos.yml up

.PHONY: run-mac-rebuild
run-mac-rebuild:
	docker compose -f docker-compose-host-macos.yml up --build

.PHONY: down
down:
	docker compose down

