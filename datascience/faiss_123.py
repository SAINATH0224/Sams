import faiss
import pickle
import numpy as np

# ---- Step 1: Load FAISS index ----
try:
    index = faiss.read_index("face_index.faiss")
    print(f" Loaded FAISS index. Total vectors stored: {index.ntotal}")
except Exception as e:
    print(f" Failed to load FAISS index: {e}")
    index = None

# ---- Step 2: Load metadata ----
try:
    with open("face_metadata.pkl", "rb") as f:
        metadata = pickle.load(f)
    print(f" Loaded metadata. Total entries: {len(metadata)}")
except Exception as e:
    print(f" Failed to load metadata: {e}")
    metadata = None