#!/usr/bin/env bash
# Build the site on the cluster's Dagger engine and push the image to registry.rannes.dev.
#
#   scripts/publish.sh               # or: bun run deploy   -> pushes :latest and :<git short sha>
#   scripts/publish.sh --tags=v1     # any extra args go to `dagger call publish`
#
# The push key comes from ZOT_API_KEY in your shell (Dagger's env:// secret provider hands it to
# the engine as a secret). If it is not set, the script falls back to the cluster's `zot-push`
# secret, read with kubectl through the cmd:// provider. Nothing is printed or written to disk.
set -euo pipefail
cd "$(dirname "$0")/.."

if [ -z "${_EXPERIMENTAL_DAGGER_RUNNER_HOST:-}" ]; then
	pod="$(kubectl get pod --namespace=dagger --selector=name=dagger-dagger-helm-engine \
		--output=jsonpath='{.items[0].metadata.name}')"
	if [ -z "$pod" ]; then
		echo "Could not find the Dagger engine pod in namespace 'dagger'." >&2
		exit 1
	fi
	export _EXPERIMENTAL_DAGGER_RUNNER_HOST="kube-pod://${pod}?namespace=dagger"
	echo "Using Dagger engine pod: $pod"
fi

args=("$@")
if ! printf '%s\n' "${args[@]}" | grep -q -- '^--tags'; then
	args+=("--tags=latest,$(git rev-parse --short HEAD)")
fi

if [ -n "${ZOT_API_KEY:-}" ]; then
	exec dagger call publish --password=env://ZOT_API_KEY "${args[@]}"
else
	echo "ZOT_API_KEY is not set; using the cluster's zot-push secret instead."
	exec dagger call publish-with-docker-config \
		--docker-config="cmd://kubectl get secret zot-push --namespace=dagger --output=jsonpath='{.data.\\.dockerconfigjson}' | base64 -d" \
		"${args[@]}"
fi
