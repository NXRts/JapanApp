#!/bin/bash
set -e

ICON_SRC="public/icons/icon-512.png"
ICON_DIR="public/icons"

if [ ! -f "$ICON_SRC" ]; then
    echo "Error: Source icon $ICON_SRC not found!"
    exit 1
fi

echo "Generating icons from $ICON_SRC..."

convert "$ICON_SRC" -resize 48x48 "$ICON_DIR/icon-48.png"
convert "$ICON_SRC" -resize 72x72 "$ICON_DIR/icon-72.png"
convert "$ICON_SRC" -resize 96x96 "$ICON_DIR/icon-96.png"
convert "$ICON_SRC" -resize 128x128 "$ICON_DIR/icon-128.png"
convert "$ICON_SRC" -resize 144x144 "$ICON_DIR/icon-144.png"
convert "$ICON_SRC" -resize 384x384 "$ICON_DIR/icon-384.png"

echo "All icons generated successfully!"
