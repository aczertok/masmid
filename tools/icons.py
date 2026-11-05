# Draws the app icon: an open sefer on techeles blue with a gold flame, and the word לימוד.
import sys
from PIL import Image, ImageDraw, ImageFont
out=sys.argv[1]
def icon(size,pad=0.0,round_=True):
    S=1024;im=Image.new("RGBA",(S,S),(0,0,0,0));d=ImageDraw.Draw(im)
    bg=(36,87,166,255)
    if round_:d.rounded_rectangle([0,0,S-1,S-1],radius=220,fill=bg)
    else:d.rectangle([0,0,S,S],fill=bg)
    k=1-pad*2;cx=S/2;oy=S*0.04
    def P(x,y):return (cx+(x-512)*k, S/2+(y-512)*k+oy)
    # pages
    d.polygon([P(170,560),P(500,610),P(500,820),P(170,770)],fill=(251,246,232,255))
    d.polygon([P(854,560),P(524,610),P(524,820),P(854,770)],fill=(251,246,232,255))
    d.polygon([P(500,610),P(524,610),P(524,820),P(500,820)],fill=(201,163,74,255))
    for i in range(4):
        y=640+i*36
        d.line([P(215,y-30+0),P(470,y+10)],fill=(201,188,152,255),width=int(10*k))
        d.line([P(809,y-30),P(554,y+10)],fill=(201,188,152,255),width=int(10*k))
    # flame
    d.ellipse([P(452,330),P(572,520)],fill=(244,165,28,255))
    d.ellipse([P(482,400),P(542,510)],fill=(255,226,122,255))
    d.polygon([P(452,430),P(512,250),P(572,430)],fill=(244,165,28,255))
    f=ImageFont.truetype("/usr/share/fonts/truetype/freefont/FreeSerifBold.ttf",int(150*k)) if True else None
    t="לימוד"[::-1]
    w=d.textlength(t,font=f);x,y=P(512,200)
    return im.resize((size,size),Image.LANCZOS),(t,f)
for s in (192,512):icon(s)[0].save(f"{out}/icon-{s}.png")
icon(512,pad=0.12,round_=False)[0].save(f"{out}/maskable-512.png")
icon(180,round_=False)[0].convert("RGB").save(f"{out}/apple-touch-icon.png")
icon(32)[0].save(f"{out}/favicon.png")
print("ok")
