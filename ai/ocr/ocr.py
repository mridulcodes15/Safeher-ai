import easyocr

class OCRReader:
    def __init__(self):
        print("Loading OCR model...")
        self.reader = easyocr.Reader(['en'])
        print("OCR model loaded!")

    def extract_text(self, image_path):
        results = self.reader.readtext(image_path)

        text = ""
        for item in results:
            text += item[1] + "\n"

        return text.strip()