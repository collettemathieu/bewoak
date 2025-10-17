#!/bin/bash

set -e

PROJECT_ROOT="apps/search/client-e2e"
SERVER_PID=""

cleanup() {
    if [ ! -z "$SERVER_PID" ] && kill -0 "$SERVER_PID" 2>/dev/null; then
        echo "🛑 Stopping server (PID: $SERVER_PID)"
        kill "$SERVER_PID" 2>/dev/null || true
        wait "$SERVER_PID" 2>/dev/null || true
    fi
}

trap cleanup EXIT INT TERM

echo "🔨 Building search-client..."
bun nx build search-client

echo "🚀 Starting SSR server..."
bun dist/apps/search/client/server/server.mjs &
SERVER_PID=$!

echo "⏳ Waiting for server to be ready..."
sleep 3

if ! curl -s http://localhost:4000 > /dev/null 2>&1; then
    echo "❌ Server is not responding on port 4000"
    exit 1
fi

echo "✅ Server is ready! Running E2E tests..."
TS_NODE_PROJECT="$PROJECT_ROOT/tsconfig.spec.json" bun run cucumber-js --config="$PROJECT_ROOT/cucumber.js"

echo "🎉 Tests completed!"