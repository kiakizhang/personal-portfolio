import os
import glob

def compress_images():
    try:
        from PIL import Image
    except ImportError:
        import subprocess
        import sys
        print("Installing Pillow...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
        from PIL import Image

    public_dir = r"c:\Users\29479\Desktop\personal-portfolio\public"
    files = glob.glob(os.path.join(public_dir, "*.jpg"))
    
    total_saved = 0
    for f in files:
        size_kb = os.path.getsize(f) / 1024
        if size_kb > 150:  # Compress if > 150KB
            try:
                print(f"Compressing {os.path.basename(f)} (Size: {size_kb:.2f}KB)")
                with Image.open(f) as img:
                    # Convert to RGB if not already
                    if img.mode != 'RGB':
                        img = img.convert('RGB')
                    # Save with optimize and quality reduction
                    img.save(f, format="JPEG", quality=75, optimize=True)
                new_size_kb = os.path.getsize(f) / 1024
                print(f" -> New size: {new_size_kb:.2f}KB (Saved: {size_kb - new_size_kb:.2f}KB)")
                total_saved += (size_kb - new_size_kb)
            except Exception as e:
                print(f"Error compressing {os.path.basename(f)}: {e}")
                
    print(f"Total space saved: {total_saved / 1024:.2f}MB")

if __name__ == "__main__":
    compress_images()
