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

.PHONY: helm-lint
helm-lint:
	helm lint charts/radix-web-console --values charts/radix-web-console/ci/test-values.yaml

.PHONY: helm-template
helm-template:
	helm template radix-web-console charts/radix-web-console --values charts/radix-web-console/ci/test-values.yaml

.PHONY: run
run:
	docker compose -f docker-compose.yml up --build

.PHONY: down
down:
	docker compose down
