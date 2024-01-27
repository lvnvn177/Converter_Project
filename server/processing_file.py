from transformers import AutoImageProcessor, TableTransformerModel, TableTransformerForObjectDetection
from huggingface_hub import hf_hub_download
from PIL import Image
import torch
import matplotlib.pyplot as plt
# Download and load the sample image
file_path = hf_hub_download(repo_id="nielsr/example-pdf", repo_type="dataset", filename="example_pdf.png")
image = Image.open(file_path).convert("RGB")

# Image processing and model loading
image_processor = AutoImageProcessor.from_pretrained("microsoft/table-transformer-detection")
model = TableTransformerModel.from_pretrained("microsoft/table-transformer-detection")

# Inference using the model
inputs = image_processor(images=image, return_tensors="pt")
outputs = model(**inputs)

# Extracting last hidden states
last_hidden_states = outputs.last_hidden_state
list(last_hidden_states.shape)

# Object detection using a specialized model
model = TableTransformerForObjectDetection.from_pretrained("microsoft/table-transformer-detection")

inputs = image_processor(images=image, return_tensors="pt")
outputs = model(**inputs)

# Post-processing and result visualization
target_sizes = torch.tensor([image.size[::-1]])
results = image_processor.post_process_object_detection(outputs, threshold=0.9, target_sizes=target_sizes)[0]

for score, label, box in zip(results["scores"], results["labels"], results["boxes"]):
    # Print detected objects, confidence, and location
    box = [round(i, 2) for i in box.tolist()]
    print(
        f"Detected {model.config.id2label[label.item()]} with confidence "
        f"{round(score.item(), 3)} at location {box}"
    )

# Extracting bounding box coordinates
list = results["boxes"]
list = list.tolist()
list = list[0]

# Cropping the image based on bounding box
crop_image = image.crop(list)


# Save the cropped image
crop_image_path = '/home/lvnvn/Converter_Project/server/result/process_image.png'
crop_image.save(crop_image_path)

# Print the path to the cropped image
print(f"Cropped image saved at: {crop_image_path}")