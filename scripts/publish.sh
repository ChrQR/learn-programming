#!/usr/bin/env bash
# Build the site on the cluster's Dagger engine and push the image to registry.rannes.dev,
# authenticating with the `zot-push` secret that already lives in the dagger namespace.
#
#   scripts/publish.sh                 # pushes :latest and :<git short sha>
#   scripts/publish.sh --tags=v1       # any extra args go to `dagger call publish`
set -euo pipefail
cd "$(dirname "$0")/.."

pod="$(kubectl get pod --namespace=dagger --selector=name=dagger-dagger-helm-engine \
	--output=jsonpath='{.items[0].metadata.name}')"
if [ -z "$pod" ]; then
	echo "Could not find the Dagger engine pod in namespace 'dagger'." >&2
	exit 1
fi
export _EXPERIMENTAL_DAGGER_RUNNER_HOST="kube-pod://${pod}?namespace=dagger"
echo "Using Dagger engine pod: $pod"

# The secret value is read by the Dagger CLI and passed to the engine as a secret; it is never
# printed or stored on disk here.
docker_config='cmd://kubectl get secret zot-push --namespace=dagger --output=jsonpath={.data.\.dockerconfigjson} | base64 -d'

args=("$@")
if ! printf '%s\n' "${args[@]}" | grep -q -- '^--tags'; then
	args+=("--tags=latest,$(git rev-parse --short HEAD)")
fi

exec dagger call publish --docker-config="$docker_config" "${args[@]}"
