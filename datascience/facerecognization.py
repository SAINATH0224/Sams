import cv2
import numpy as np
from mtcnn.mtcnn import MTCNN
from PIL import Image
import os

detector = MTCNN()

def validate_image(path):
    # 1. File Type & Format Checks
    valid_ext = ['.jpg', '.jpeg', '.png']
    ext = os.path.splitext(path)[1].lower()
    if ext not in valid_ext:
        return False, "Not a valid image file type."

    if not os.path.exists(path) or os.path.getsize(path) == 0:
        return False, "File missing or empty."

    try:
        img = Image.open(path)
        img.verify()
    except Exception as e:
        return False, f"Corrupted or unreadable image. Error: {e}"

    # 2. Reload image using OpenCV
    image = cv2.imread(path)
    if image is None:
        return False, "Failed to read image with OpenCV."

    h, w, _ = image.shape
    if h < 160 or w < 160:
        return False, "Image too small. Use at least 160x160 pixels."

    # 3. Brightness check
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    brightness = hsv[..., 2].mean()
    if brightness < 50:
        return False, "Image too dark. Improve lighting."
    if brightness > 230:
        return False, "Image too bright. Reduce exposure."

    # 4. Blur check
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blur_score = cv2.Laplacian(gray, cv2.CV_64F).var()
    if blur_score < 50:
        return False, f"Blurry or unclear image. Score: {blur_score:.2f}"

    # 5. Face Detection
    faces = detector.detect_faces(image)
    if len(faces) == 0:
        return False, "No face detected. Make sure your face is clearly visible."
    if len(faces) > 1:
        return False, "Multiple faces detected. Submit only your face."

    # 6. Face box size and position checks
    x, y, w_box, h_box = faces[0]['box']
    x = max(0, x)
    y = max(0, y)

    # Face coverage ratio
    face_area = w_box * h_box
    img_area = w * h
    coverage_ratio = face_area / img_area
    if coverage_ratio < 0.02:
        return False, "Face too small in image. Please zoom in or crop closer."

    # Aspect ratio check
    aspect_ratio = w / h
    if aspect_ratio > 1.2:
        return False, "Image too wide. Possibly a group photo or poster."

    # Check face alignment in image
    if x < 10 or y < 10 or (x + w_box) > w - 10 or (y + h_box) > h - 10:
        return False, "Face too close to edge. Please center your face."

    # Final check passed
    return True, "Image is clean, clear, and valid for attendance system."

if __name__ == "__main__":
    path = r"C:\Users\maddi\OneDrive - Shri Vile Parle Kelavani Mandal\Desktop\pic1.jpg"
    is_valid, message = validate_image(path)
    print(message)