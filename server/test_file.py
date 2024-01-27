from transformers import AutoImageProcessor, TableTransformerModel, TableTransformerForObjectDetection
from huggingface_hub import hf_hub_download
from PIL import Image
import torch
import matplotlib.pyplot as plt
# Download and load the sample image
file_path = hf_hub_download(repo_id="nielsr/example-pdf", repo_type="dataset", filename="example_pdf.png")
image = Image.open(file_path).convert("RGB")
crop_image_path = '/home/lvnvn/Converter_Project/server/result/process_image_1.png'
image.save(crop_image_path)