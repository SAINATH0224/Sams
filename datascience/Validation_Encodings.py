# face_service.py

import base64
import io
import cv2
import numpy as np
from PIL import Image
import face_recognition
from typing import Optional, Tuple

from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance, PointStruct

# ----------------- CONFIGURATION -----------------

QDRANT_HOST     = "localhost"
QDRANT_PORT     = 6333
COLLECTION_NAME = "faces"
VECTOR_SIZE     = 128           # face_recognition embeddings
MATCH_THRESHOLD = 0.6           # Euclidean distance threshold

# ----------------- QDRANT CLIENT SETUP -----------------

qdrant_client = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT)

# Create collection if missing
if COLLECTION_NAME not in [c.name for c in qdrant_client.get_collections().collections]:
    qdrant_client.recreate_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=VECTOR_SIZE, distance=Distance.COSINE),
    )

# ----------------- HELPER: FACE VALIDATION -----------------

def is_face(rgb_img) -> bool:
    face_locations = face_recognition.face_locations(rgb_img)
    if len(face_locations) != 1:
        return False

    landmarks_list = face_recognition.face_landmarks(rgb_img)
    if len(landmarks_list) != 1:
        return False

    required_features = [
        "chin", "left_eyebrow", "right_eyebrow",
        "nose_bridge", "nose_tip",
        "left_eye", "right_eye",
        "top_lip", "bottom_lip"
    ]

    landmarks = landmarks_list[0]
    for feature in required_features:
        if feature not in landmarks or not landmarks[feature]:
            return False

    return True

# ----------------- IMAGE VALIDATION + EMBEDDING -----------------

def validate_and_get_embedding(
    b64_string: str,
    blur_thresh: float = 20.0,
    min_w: int = 160,
    min_h: int = 160
) -> Tuple[bool, Optional[np.ndarray], str]:
    try:
        img_bytes = base64.b64decode(b64_string)
    except Exception:
        return False, None, "Invalid base64."

    try:
        tmp = Image.open(io.BytesIO(img_bytes))
        tmp.verify()
    except Exception:
        return False, None, "Corrupted or unreadable image."

    arr = np.frombuffer(img_bytes, np.uint8)
    bgr = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    if bgr is None:
        return False, None, "Unable to decode image."

    gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
    if cv2.Laplacian(gray, cv2.CV_64F).var() < blur_thresh:
        return False, None, "Image too blurry."

    h, w = bgr.shape[:2]
    if w < min_w or h < min_h:
        return False, None, f"Image too small (min {min_w}×{min_h})."

    rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)

    # Check for frontal face with all features
    if not is_face(rgb):
        return False, None, "Must contain exactly one clear, frontal face with all key features."

    encs = face_recognition.face_encodings(rgb)
    if not encs:
        return False, None, "Face detected but no encoding generated."

    return True, encs[0], "OK"

# ----------------- REGISTRATION FUNCTION -----------------

def register_face(b64_string: str, user_id: int) -> str:
    valid, embedding, msg = validate_and_get_embedding(b64_string)
    if not valid:
        return f"Registration failed: {msg}"

    point = PointStruct(
        id=user_id,
        vector=embedding.tolist(),
        payload={"user_id": user_id}
    )
    qdrant_client.upsert(collection_name=COLLECTION_NAME, points=[point])
    return f"Success: Registered user_id={user_id}"

# ----------------- VERIFICATION FUNCTION -----------------

def verify_face(b64_string: str) -> str:
    valid, embedding, msg = validate_and_get_embedding(b64_string)
    if not valid:
        return f"Verification failed: {msg}"

    points, _ = qdrant_client.scroll(
        collection_name=COLLECTION_NAME,
        limit=1000,
        with_vectors=True
    )

    for pt in points:
        dist = np.linalg.norm(np.array(pt.vector) - embedding)
        if dist < MATCH_THRESHOLD:
            return str(pt.id)

    return "unknown"

# ----------------- HELPER: IMAGE TO BASE64 -----------------

def image_to_base64(image_path: str) -> str:
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode("utf-8")

# ----------------- EXAMPLE USAGE -----------------

if __name__ == "__main__":
    reg_image_path1 = r"C:\Users\byaga\Downloads\humanfaces\humanfaces\Humans\1 (99).png"
    reg_image_path2=r"C:\Users\byaga\Downloads\humanfaces\humanfaces\Humans\1 (980).jpg"
    reg_image_path3=r"C:\Users\byaga\Downloads\humanfaces\humanfaces\Humans\1 (987).jpg"
    reg_image_path4=r"C:\Users\byaga\Downloads\humanfaces\humanfaces\Humans\1 (991).jpg"
    reg_image_path5=r"C:\Users\byaga\Downloads\humanfaces\humanfaces\Humans\1 (80).png"
    reg_image_path6 = r"C:\Users\byaga\Downloads\humanfaces\humanfaces\Humans\1 (718).jpg"

    ver_image_path=r"C:\Users\byaga\Downloads\humanfaces\humanfaces\Humans\1 (718).jpg"

    SAMPLE_REG_B64 = image_to_base64(reg_image_path6)
    SAMPLE_VER_B64 = image_to_base64(ver_image_path)

    #print(register_face(SAMPLE_REG_B64, user_id=6))
    print("Verification result:", verify_face(SAMPLE_VER_B64))
