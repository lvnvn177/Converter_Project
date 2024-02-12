from model import Model
import torch
import io
from PIL import Image

class Detector:
    def __init__(self):
        self.model = Model.load_model()
        self.image_processor = Model.load_processor()

    def get_prediction(self, image_bytes):
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        inputs = self.image_processor(images=image, return_tensors="pt")
        outputs = self.model(**inputs)
        target_sizes = torch.tensor([image.size[::-1]])
        results = self.image_processor.post_process_object_detection(outputs, threshold=0.9, target_sizes=target_sizes)[
            0
        ]
        return results["boxes"].tolist()[0]
    
    def get_result(self, image_file):
        image_bytes = image_file.file.read()
        table_cord = self.get_prediction(image_bytes)
        result = {
            "a": table_cord[0],
            "b": table_cord[1],
            "c": table_cord[2],
            "d": table_cord[3],
        }
        return result
