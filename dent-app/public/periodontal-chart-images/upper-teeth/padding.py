from PIL import Image, ImageOps

target_height = 515

for i in range(1, 9):
    filename = f"column_{i}.png"   # or .png
    img = Image.open(filename)
    
    delta = target_height - img.height
    padding = (0, delta // 2, 0, delta - (delta // 2))  # left, top, right, bottom
    
    new_img = ImageOps.expand(img, padding, fill="white")
    new_img.save(f"column_{i}_padded.png")
