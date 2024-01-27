from flask import Flask, request, jsonify
from tensorflow import keras
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.imagenet_utils import decode_predictions
import numpy as np
import fitz  # PyMuPDF 라이브러리

app = Flask(__name__)

# Load the trained model
model = keras.models.load_model('path/to/your/model.h5')

def convert_pdf_to_images(pdf_path):
    pdf_document = fitz.open(pdf_path)
    images = []
    for page_number in range(pdf_document.page_count):
        page = pdf_document.load_page(page_number)
        image = page.get_pixmap()
        images.append(image)
    return images

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # 파일 업로드 및 딥러닝 모델 예측 처리
        uploaded_file = request.files['file']
        
        # PDF를 이미지로 변환
        pdf_images = convert_pdf_to_images(uploaded_file)
        
        predictions = []

        for img in pdf_images:
            img_array = np.frombuffer(img.samples, dtype=np.uint8).reshape((img.height, img.width, 4))
            img_array = img_array[:, :, :3]  # Remove alpha channel if present
            img_array = np.expand_dims(img_array, axis=0)
            img_array = img_array.astype('float32') / 255.0

            prediction = model.predict(img_array)
            decoded_prediction = decode_predictions(prediction)
            predictions.append({'class': decoded_prediction[0][0][1], 'confidence': float(decoded_prediction[0][0][2])})

        # 결과를 딕셔너리로 구성하여 JSON 형태로 반환
        return jsonify({'results': predictions})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
