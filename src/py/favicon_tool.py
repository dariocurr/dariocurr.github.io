from PIL import Image

path = "../assets/img/favicon.ico"
new_path = "../assets/img/orange_favicon.ico"
img = Image.open(path)
width, height = img.size
primary_color = [245, 157, 98, 255]

for x in range(0, width):
    for y in range(0, height):
        pixel_color = img.getpixel((x, y))
        if pixel_color[0] == 1 and pixel_color[1] == 1 and pixel_color[2] == 1:
            primary_color[3] = pixel_color[3]
            img.putpixel((x, y), tuple(primary_color))

img.save(new_path, "png")