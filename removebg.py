from rembg import remove
from PIL import Image
import sys
import os

# ===================== GANTI PATH DI SINI =====================
INPUT_PATH = "assets/cat.png"       # path foto input
OUTPUT_PATH = "assets/cat-nobg.png"   # path foto output (gunakan .png agar transparan)
# ==============================================================

def hapus_background(input_path, output_path):
    if not os.path.exists(input_path):
        print(f"File tidak ditemukan: {input_path}")
        sys.exit(1)

    print(f"Memproses: {input_path}")
    with open(input_path, "rb") as f:
        input_data = f.read()

    output_data = remove(input_data)

    with open(output_path, "wb") as f:
        f.write(output_data)

    print(f"Selesai! Hasil sudah disimpan di: {output_path}")

if __name__ == "__main__":
    hapus_background(INPUT_PATH, OUTPUT_PATH)
