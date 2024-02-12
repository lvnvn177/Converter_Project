"""""
from fastapi import FastAPI, File, UploadFile
from detector import Detector
import uvicorn
import logging

logging.basicConfig(level=logging.INFO)

app = FastAPI()
detector = Detector()

@app.get("/")
async def home():
    return {"message": "Model service"}

@app.post("/detection")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    # 여기서 파일을 처리하고 응답을 반환합니다.
    return detector.get_result(image_file=file)

if __name__ == "__main__":
    uvicorn.run("app:app", reload=True, port=6000, host="127.0.0.1")
"""""

from fastapi import FastAPI, File, UploadFile
import uvicorn
import logging

logging.basicConfig(level=logging.INFO)

app = FastAPI()

@app.post("/detection")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    # 여기서 파일을 처리하고 응답을 반환합니다.
    return {"message": "File received"}

if __name__ == "__main__":
    uvicorn.run("app:app", reload=True, port=6000, host="127.0.0.1")