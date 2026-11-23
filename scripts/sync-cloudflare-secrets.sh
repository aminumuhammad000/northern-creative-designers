#!/usr/bin/env bash
# ==============================================================================
# Cloudflare Worker Secrets Synchronization Script
# Project: northcdesigners (Northern Creative Designers)
#
# This script securely reads sensitive credentials from .env.local and uploads
# them to Cloudflare Workers as encrypted secrets via Wrangler CLI.
#
# SECURITY GUARANTEES:
# - Secret values are NEVER echoed to the terminal, stdout, or stderr.
# - Secret values are NEVER passed as command-line arguments (preventing leaks
#   in process tables `ps aux` and shell history `~/.bash_history`).
# - Values are piped directly into `wrangler secret put` via stdin.
# ==============================================================================

set -euo pipefail

ENV_FILE=".env.local"
WRANGLER_ENV=""
DRY_RUN=false

# Sensitive variables that MUST be encrypted in Cloudflare Workers
SECRET_KEYS=(
  "SUPABASE_SERVICE_ROLE_KEY"
  "CLOUDINARY_API_KEY"
  "CLOUDINARY_API_SECRET"
  "RESEND_API_KEY"
  "QR_TOKEN_SECRET"
)

# Parse CLI arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --env)
      WRANGLER_ENV="$2"
      shift 2
      ;;
    --file)
      ENV_FILE="$2"
      shift 2
      ;;
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    -h|--help)
      echo "Usage: $0 [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --env <environment>   Specify Cloudflare environment (e.g. production, preview)"
      echo "  --file <path>         Path to env file (default: .env.local)"
      echo "  --dry-run             Simulate without uploading secrets to Cloudflare"
      echo "  -h, --help            Show this help message"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

echo "=================================================="
echo " Cloudflare Worker Secrets Sync - northcdesigners"
echo "=================================================="

# Check if environment file exists
if [ ! -f "$ENV_FILE" ]; then
  echo "[-] Error: Environment file '$ENV_FILE' not found!"
  exit 1
fi

# Check Wrangler authentication (skip on dry run)
if [ "$DRY_RUN" = false ]; then
  echo "[*] Checking Cloudflare Wrangler authentication..."
  if ! npx wrangler whoami > /dev/null 2>&1; then
    echo "[-] Error: You are not authenticated with Cloudflare."
    echo "    Please run 'npx wrangler login' first, then re-run this script."
    exit 1
  fi
  echo "[+] Wrangler authentication verified."
fi

EXTRA_FLAGS=()
if [ -n "$WRANGLER_ENV" ]; then
  EXTRA_FLAGS+=(--env "$WRANGLER_ENV")
  echo "[*] Target Environment: $WRANGLER_ENV"
else
  echo "[*] Target Environment: default (production worker)"
fi

echo ""
echo "[*] Synchronizing encrypted secrets from '$ENV_FILE'..."

SUCCESS_COUNT=0
SKIPPED_COUNT=0

for key in "${SECRET_KEYS[@]}"; do
  # Extract value safely without exposing in subshell trace
  # Match KEY=value, handle optional quotes, strip carriage returns
  val=$(grep "^${key}=" "$ENV_FILE" 2>/dev/null | head -n 1 | cut -d= -f2- | sed -e 's/^[[:space:]]*["'"'"']//' -e 's/["'"'"'][[:space:]]*$//' -e $'s/\r$//' || true)

  if [ -z "$val" ]; then
    echo " [!] Skipped: '$key' (empty or not found in $ENV_FILE)"
    SKIPPED_COUNT=$((SKIPPED_COUNT + 1))
    continue
  fi

  if [ "$DRY_RUN" = true ]; then
    echo " [DRY-RUN] Would upload secret: '$key' (length: ${#val} chars)"
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
  else
    echo -n " [*] Uploading encrypted secret: '$key'... "
    if printf '%s' "$val" | npx wrangler secret put "$key" "${EXTRA_FLAGS[@]}" > /dev/null 2>&1; then
      echo "SUCCESS"
      SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    else
      echo "FAILED"
      echo "[-] Failed to upload '$key' via wrangler secret put."
    fi
  fi
done

echo ""
echo "=================================================="
echo " Synchronization Summary:"
echo "   Successfully uploaded / verified: $SUCCESS_COUNT"
echo "   Skipped (missing/empty):          $SKIPPED_COUNT"
echo "=================================================="
echo ""
echo "NOTE: Public and non-sensitive variables (such as NEXT_PUBLIC_SUPABASE_URL)"
echo "should be configured in the Cloudflare Dashboard under:"
echo "Workers & Pages > northcdesigners > Settings > Variables and Secrets > Environment Variables"
echo "or via wrangler.jsonc."
