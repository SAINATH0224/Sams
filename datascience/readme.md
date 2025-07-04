# Face Embedding Storage and Retrieval Web App

This Flask application allows users to upload face images, extract 512-dimensional FaceNet embeddings, and store them in a FAISS vector index with corresponding metadata.

## 📦 Features

- Upload face images through a web interface or POST request
- Detect faces using OpenCV's Haar Cascade
- Extract face embeddings using the `keras-facenet` model
- Store embeddings in a FAISS index
- Save image metadata using `pickle`
- Retrieve all stored metadata via API

---

## 🛠️ Requirements

- Python 3.7+
- Flask
- OpenCV
- NumPy
- FAISS
- keras-facenet
- Werkzeug
- Pickle (built-in)

Install the dependencies:

```bash
pip install flask opencv-python numpy faiss-cpu keras-facenet werkzeug
