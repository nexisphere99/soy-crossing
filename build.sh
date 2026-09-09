#!/bin/bash
# build.sh   compile all Twee/JS/CSS sources into a single HTML file
set -e

TWEEGO="${TWEEGO:-$HOME/tweego/tweego}"
OUT="build/crossing.html"

mkdir -p build

"$TWEEGO" \
	--format=sugarcube-2 \
	--head=src/head.html \
	-o "$OUT" \
	src/story.twee \
	src/init \
	src/systems \
	src/ui \
	src/passages \
	src/css

# crossing.html references game_files/img/... relatively, so it needs a
# game_files/ next to it. Symlink for dev; ship a copy alongside if you move it.
ln -sfn ../game_files build/game_files

echo "Build complete: $OUT"
