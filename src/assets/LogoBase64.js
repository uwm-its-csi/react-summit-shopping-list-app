export const img = new Image();

img.src = "data:image/png;base64,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";