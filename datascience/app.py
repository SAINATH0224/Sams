from flask import Flask, request, render_template, jsonify
from werkzeug.utils import secure_filename
import os
import cv2
import numpy as np
from keras_facenet import FaceNet
import faiss
import uuid
import pickle

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Load face detector and FaceNet embedder
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
embedder = FaceNet()

# Define index/metadata file paths
embedding_size = 512
index_file = "face_index.faiss"
meta_file = "face_metadata.pkl"

# Load existing data or start fresh
if os.path.exists(index_file) and os.path.exists(meta_file):
    face_index = faiss.read_index(index_file)
    with open(meta_file, "rb") as f:
        metadata = pickle.load(f)
    print("Loaded saved FAISS index and metadata.")
else:
    face_index = faiss.IndexFlatL2(embedding_size)
    metadata = {}
    print("Starting with empty FAISS index and metadata.")

# Function to extract face embedding from image
def extract_face_embedding(image_path):
    img = cv2.imread(image_path)
    if img is None:
        return None, "Invalid image file"

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

    if len(faces) == 0:
        return None, "No face detected"

    x, y, w, h = faces[0]
    face_img = img[y:y+h, x:x+w]
    face_img = cv2.resize(face_img, (160, 160))
    face_array = face_img.astype('float32') / 255.0
    face_array = np.expand_dims(face_array, axis=0)

    embedding = embedder.embeddings(face_array)[0]
    return embedding, None

# Upload form (optional, you can remove this if not needed)
@app.route('/')
def home():
    return '''
    <h1>Upload Face Image</h1>
    <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="image" accept="image/*">
        <button type="submit">Upload</button>
    </form>
    '''

# Upload endpoint
@app.route('/upload', methods=['POST'])
def upload():
    if 'image' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    embedding, error = extract_face_embedding(filepath)
    if error:
        os.remove(filepath)
        return jsonify({"error": error}), 400

    # Generate a unique ID and store embedding
    image_id = str(uuid.uuid4())
    face_index.add(np.array([embedding]).astype('float32'))
    metadata[image_id] = filename

    # Save index and metadata to disk
    faiss.write_index(face_index, index_file)
    with open(meta_file, "wb") as f:
        pickle.dump(metadata, f)

    return jsonify({
        "message": "Face embedding stored and saved!",
        "image_id": image_id
    })

# View metadata
@app.route('/metadata', methods=['GET'])
def get_metadata():
    return jsonify(metadata)

if __name__ == '__main__':
    app.run(debug=True)