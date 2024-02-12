from transformers import AutoImageProcessor, TableTransformerForObjectDetection

class Model:
    def __init__(self) -> None:
        pass

    def load_model():
        model = TableTransformerForObjectDetection.from_pretrained("./models/ttd/")
        return model
    
    def load_processor():
        image_processor = AutoImageProcessor.from_pretrained("./models/ttd/")
        return image_processor
        