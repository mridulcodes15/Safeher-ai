from ai.ocr.ocr import OCRReader

ocr = OCRReader()

image = "sample_image.png"

text = ocr.extract_text(image)

print("\n===== OCR OUTPUT =====\n")
print(text)