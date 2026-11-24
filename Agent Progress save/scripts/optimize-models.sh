#!/usr/bin/env bash
# Optimize the raw GLBs in assets/ (≈19 MB, ~1.9M tris, 4K textures each)
# into web-ready files in public/models/ (target < 3 MB each).
# Usage (from repo root): bash "Agent Progress save/scripts/optimize-models.sh"
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
GT=node_modules/.bin/gltf-transform
declare -A MAP=(
  ["Bose QuietComfort Headphones (2nd Gen).glb"]="bose-qc2"
  ["Hybrid Active Noise Cancelling Bluetooth Headphones Wireless Headphones.glb"]="hybrid-anc"
  ["Skullcandy Crusher 540 Active Wireless Sensory Bass Headphones - Forest.glb"]="crusher-540"
)
for src in "${!MAP[@]}"; do
  out="public/models/${MAP[$src]}.glb"
  [ -f "$out" ] && { echo "skip $out (exists)"; continue; }
  echo "optimizing $src -> $out"
  $GT optimize "assets/$src" "$out" \
    --simplify-ratio 0.06 --simplify-error 0.0005 \
    --texture-size 2048 --texture-compress webp \
    --compress meshopt
  ls -lh "$out"
done
