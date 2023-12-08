.PHONY: test
test:
	npm test

.PHONY: gen-radix-api
gen-radix-api:
	npm run "apigen:radix"

.PHONY: gen-local-radix-api
gen-local-radix-api:
	npm run "apigen:local-radix"

.PHONY: gen-cost-api
gen-cost-api:
	npm run "apigen:cost"

.PHONY: gen-scan-api
gen-scan-api:
	npm run "apigen:scan"

.PHONY: gen-log-api
gen-log-api:
	npm run "apigen:log"

.PHONY: lint
lint:
	npm run "lint"

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

