#!/bin/bash
echo "Algorithm		Encode (ms)	Decode (ms)" > benchmark.tsv
cat conf/algo.txt | while IFS= read -r algo; do
deno run dist/bench.js $algo >> benchmark.tsv
done
exit