#!/usr/bin/env bash
# Downloads all Misirli Promet motorcycle images from the exported manifest
# into public/moto/<code>/<index>.jpg. Resumable: skips files already present.
# Manifest format (TSV, one image per line):  <code>\t<index>\t<url>
set -u
MANIFEST="/c/Users/marko/Downloads/misirli_images_manifest.txt"
ROOT="/c/Users/marko/misirli-promet/public/moto"
mkdir -p "$ROOT"

total=$(wc -l < "$MANIFEST" | tr -d ' ')
ok=0; skip=0; fail=0; n=0

while IFS=$'\t' read -r code idx url; do
  [ -z "$code" ] && continue
  n=$((n+1))
  dir="$ROOT/$code"
  mkdir -p "$dir"
  out="$dir/$idx.jpg"
  if [ -s "$out" ]; then skip=$((skip+1)); continue; fi
  code_http=$(curl -s --retry 3 --retry-delay 1 -m 60 -o "$out" -w "%{http_code}" "$url")
  if [ "$code_http" = "200" ] && [ -s "$out" ]; then
    ok=$((ok+1))
  else
    fail=$((fail+1)); rm -f "$out"
    echo "FAIL $code/$idx http=$code_http" >> "$ROOT/_dl_errors.log"
  fi
  if [ $((n % 25)) -eq 0 ]; then echo "progress: $n/$total (ok=$ok skip=$skip fail=$fail)"; fi
done < "$MANIFEST"

echo "DONE: total=$total ok=$ok skip=$skip fail=$fail"
