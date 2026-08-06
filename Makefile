# Talks — build/stage every deck under slides/ without per-deck wiring.
#
# Decks are auto-discovered:
#   slides/<slug>/package.json  -> Slidev deck (built with `slidev build --base /talks/<slug>/`)
#   slides/<slug>/index.html    -> static deck (Reveal.js etc., copied as-is)
#
# Adding a talk = adding a folder under slides/. No edits here, none in CI.

SHELL := /bin/bash
.DEFAULT_GOAL := help

SLIDES_DIR := slides
SITE_DIR := _site
BASE_PREFIX := /talks
NPM ?= npm
NPX ?= npx

SLIDEV_DECKS := $(sort $(patsubst $(SLIDES_DIR)/%/package.json,%,$(wildcard $(SLIDES_DIR)/*/package.json)))
STATIC_DECKS := $(sort $(filter-out $(SLIDEV_DECKS),$(patsubst $(SLIDES_DIR)/%/index.html,%,$(wildcard $(SLIDES_DIR)/*/index.html))))
DECKS := $(sort $(SLIDEV_DECKS) $(STATIC_DECKS))

# Static decks are copied wholesale minus build/source-only noise (their prose
# docs live in the repo, not on the published site).
STAGE_EXCLUDES := --exclude node_modules --exclude dist --exclude .slidev \
	--exclude .git --exclude .DS_Store --exclude '*.md' --exclude docs \
	--exclude screenshots

.PHONY: help list install build site serve clean dev

help: ## Show available targets and discovered decks
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN{FS=":.*?## "}{printf "  %-14s %s\n", $$1, $$2}'
	@echo ""
	@$(MAKE) --no-print-directory list

list: ## List auto-discovered decks
	@echo "Slidev decks: $(if $(SLIDEV_DECKS),$(SLIDEV_DECKS),none)"
	@echo "Static decks: $(if $(STATIC_DECKS),$(STATIC_DECKS),none)"

install: ## Install dependencies for every Slidev deck
	@for deck in $(SLIDEV_DECKS); do \
		echo "==> npm ci $$deck"; \
		( cd $(SLIDES_DIR)/$$deck && $(NPM) ci ); \
	done

dev: ## Run one deck locally: make dev DECK=<slug>
	@if [ -z "$(DECK)" ]; then echo "usage: make dev DECK=<slug>  (see 'make list')"; exit 2; fi
	@if [ ! -d "$(SLIDES_DIR)/$(DECK)" ]; then echo "no such deck: $(DECK)"; exit 2; fi
	@if [ -f "$(SLIDES_DIR)/$(DECK)/package.json" ]; then \
		cd $(SLIDES_DIR)/$(DECK) && $(NPM) run dev; \
	else \
		echo "static deck — serving $(SLIDES_DIR)/$(DECK) on http://localhost:8080"; \
		cd $(SLIDES_DIR)/$(DECK) && python3 -m http.server 8080; \
	fi

build: ## Build every Slidev deck (static decks need no build)
	@for deck in $(SLIDEV_DECKS); do \
		echo "==> build $$deck"; \
		( cd $(SLIDES_DIR)/$$deck && $(NPM) ci && $(NPX) slidev build --base $(BASE_PREFIX)/$$deck/ ) || exit 1; \
	done

site: build ## Build everything and stage the combined GitHub Pages site into _site/
	@rm -rf $(SITE_DIR)
	@mkdir -p $(SITE_DIR)
	@for deck in $(SLIDEV_DECKS); do \
		echo "==> stage $$deck (slidev)"; \
		mkdir -p "$(SITE_DIR)/$$deck"; \
		cp -a "$(SLIDES_DIR)/$$deck/dist/." "$(SITE_DIR)/$$deck/"; \
	done
	@for deck in $(STATIC_DECKS); do \
		echo "==> stage $$deck (static)"; \
		mkdir -p "$(SITE_DIR)/$$deck"; \
		rsync -a $(STAGE_EXCLUDES) "$(SLIDES_DIR)/$$deck/" "$(SITE_DIR)/$$deck/"; \
	done
	@# Per-deck add-ons (slides/<slug>/addons/head.html) are injected into the
	@# staged copy, so tool-exported bundles stay byte-identical in git.
	@node scripts/inject-deck-addons.mjs
	@# Site-root 404.html so Pages falls back to the SPA shell for deep-linked
	@# Slidev slide URLs (e.g. /cloud-native-k8s-101/1). Any Slidev dist will do.
	@for deck in $(SLIDEV_DECKS); do \
		if [ -f "$(SLIDES_DIR)/$$deck/dist/404.html" ]; then \
			cp "$(SLIDES_DIR)/$$deck/dist/404.html" "$(SITE_DIR)/404.html"; \
			break; \
		fi; \
	done
	@echo "==> staged: $(DECKS)"

PORT ?= 8080

serve: ## Serve the staged site at http://localhost:$(PORT)/talks/<slug>/
	@[ -d $(SITE_DIR) ] || $(MAKE) --no-print-directory site
	@# Decks are built with --base /talks/<slug>/, so the preview server needs a
	@# /talks prefix. Self-symlink gives it one without a second copy of the site.
	@ln -sfn . $(SITE_DIR)/talks
	@echo "serving $(SITE_DIR) on http://localhost:$(PORT)$(BASE_PREFIX)/"
	@for deck in $(DECKS); do echo "  http://localhost:$(PORT)$(BASE_PREFIX)/$$deck/"; done
	@cd $(SITE_DIR) && python3 -m http.server $(PORT)

clean: ## Remove _site/ and every deck's dist/
	@rm -rf $(SITE_DIR)
	@for deck in $(SLIDEV_DECKS); do rm -rf "$(SLIDES_DIR)/$$deck/dist"; done
