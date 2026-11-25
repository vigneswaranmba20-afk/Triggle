"""Reusable orthographic diagrams for the five narrated beats in each lesson."""
from functools import lru_cache
from math import atan2, cos, hypot, pi, sin
from pathlib import Path

from PIL import Image, ImageColor, ImageDraw, ImageFont

from trace_video_factory import FONT, BOLD

INK = "#192842"
MUTED = "#50617a"
LINE = "#c8d3e3"
INDIGO = "#455acd"
BLUE = "#aab9ff"
PALE = "#e8ecff"
TEAL = "#087568"
MINT = "#bceae0"
GOLD = "#a96410"
SAND = "#ffe5ae"
PAPER = "#f7f9fd"
WHITE = "#ffffff"

TITLES = (
    ("Cylinder", ("Make a vertical cut", "Unroll the curved wall", "Area of the rectangle",
                  "Two circular ends", "Total surface area")),
    ("Cone", ("Find the right triangle", "Find the slant height", "Open the curved surface",
              "Take a fraction of a circle", "Add the base for total area")),
    ("Frustum", ("Cut parallel to the base", "Two radii and a height", "Find the slant height",
                 "Subtract the missing cone", "Volume and curved area")),
    ("Cone and cylinder", ("Match the dimensions", "Pour one full cone", "Repeat the pour",
                           "Base area × height", "The one-third relationship")),
    ("Joined solids", ("Join solids of equal radius", "Find the hidden faces", "Count the exposed faces",
                      "Add the two volumes", "Area and volume rules")),
    ("Volume conservation", ("Rearrange twelve cubes", "Check the cube count", "Recast the same material",
                             "Equate the two volumes", "Solve for the new height")),
)


def ease(value):
    value = max(0, min(1, value))
    return value * value * (3 - 2 * value)


def mix(a, b, proportion):
    return tuple(round(x + (y - x) * proportion) for x, y in
                 zip(ImageColor.getrgb(a), ImageColor.getrgb(b)))


@lru_cache(maxsize=None)
def font(size, bold):
    return ImageFont.truetype(BOLD if bold else FONT, size)


@lru_cache(maxsize=None)
def formula(path):
    with Image.open(path) as image:
        glyphs = image.convert("RGBA")
    return glyphs.crop(glyphs.getbbox())


class Diagram:
    def __init__(self):
        self.image = Image.new("RGB", (720, 1280), PAPER)
        self.draw = ImageDraw.Draw(self.image)

    def typeface(self, text, size, bold):
        return font(size, bold)

    def text(self, xy, text, size=32, color=INK, bold=False, anchor="mm"):
        f = self.typeface(text, size, bold)
        bounds = self.draw.textbbox(xy, text, f, anchor=anchor)
        if bounds[0] < 28 or bounds[2] > 692 or bounds[1] < 26 or bounds[3] > 1248:
            raise ValueError(f"Text outside the safe area: {text!r} at {xy}")
        self.draw.text(xy, text, fill=color, font=f, anchor=anchor)

    def line(self, points, fill=INDIGO, width=4):
        self.draw.line(points, fill=fill, width=width, joint="curve")

    def polygon(self, points, fill, edge=INDIGO, width=4):
        self.draw.polygon(points, fill)
        if edge:
            self.line([*points, points[0]], edge, width)

    def dash(self, start, end, color=MUTED, width=3):
        x, y = start
        dx, dy = end[0] - x, end[1] - y
        length = hypot(dx, dy)
        if not length:
            return
        for i in range(0, round(length), 15):
            j = min(i + 7, length)
            self.line([(x + dx * i / length, y + dy * i / length),
                       (x + dx * j / length, y + dy * j / length)], color, width)

    def ellipse(self, x, y, radius, depth, fill, edge=INDIGO, width=4):
        self.draw.ellipse((x-radius, y-depth, x+radius, y+depth), fill=fill,
                          outline=edge, width=width)

    def arrow(self, start, end, color=TEAL, width=4):
        angle = atan2(end[1] - start[1], end[0] - start[0])
        self.line([start, end], color, width)
        self.polygon([end, *((end[0] - 13*cos(angle + a), end[1] - 13*sin(angle + a))
                             for a in (-.48, .48))], color, None)

    def dimension(self, start, end, label, text_at, color=TEAL):
        self.arrow(start, end, color, 3)
        self.arrow(end, start, color, 3)
        self.text(text_at, label, 34, color, True)

    def cylinder(self, x, top, height, r, wall=PALE, cap=WHITE, bottom=None, fill=0,
                 edge=INDIGO, top_rim=True):
        dep = r*.25
        y = top + height
        self.ellipse(x, y, r, dep, wall if bottom is None else bottom, edge)
        self.draw.rectangle((x-r, top, x+r, y), fill=wall)
        self.line([(x-r, top), (x-r, y)], edge)
        self.line([(x+r, top), (x+r, y)], edge)
        self.draw.arc((x-r, y-dep, x+r, y+dep), 0, 180, fill=edge, width=4)
        if bottom:
            self.draw.arc((x-r, y-dep, x+r, y+dep), 0, 180, fill=GOLD, width=10)
        if fill > 0:
            level = y - height*fill
            self.ellipse(x, y, r-4, dep-3, MINT, None)
            self.draw.rectangle((x-r+4, level, x+r-4, y), fill=MINT)
            self.ellipse(x, level, r-4, dep-3, "#76d4c1", TEAL, 3)
        if top_rim and fill < .999:
            self.ellipse(x, top, r, dep, cap, edge)
        elif top_rim:
            self.ellipse(x, top, r, dep, None, edge)

    def cone(self, x, top, height, r, fill=PALE, base=WHITE, inverted=False):
        if inverted:
            self.polygon([(x-r, top), (x, top+height), (x+r, top)], fill)
            self.ellipse(x, top, r, r*.25, base, INDIGO)
        else:
            y = top + height
            self.ellipse(x, y, r, r*.25, fill)
            self.polygon([(x, top), (x+r, y), (x-r, y)], fill, None)
            self.line([(x-r, y), (x, top), (x+r, y)])
            self.draw.arc((x-r, y-r*.25, x+r, y+r*.25), 180, 360, fill=LINE, width=3)

    def hemisphere(self, x, y, r, fill=MINT, disc=WHITE, rim=TEAL):
        self.draw.pieslice((x-r, y-r, x+r, y+r), 180, 360, fill=fill,
                           outline=rim, width=4)
        if disc:
            self.ellipse(x, y, r, r*.25, disc, rim)

    def frustum(self, x, y, height, r, R):
        base = y + height
        self.ellipse(x, base, R, R*.25, PALE)
        self.polygon([(x-r, y), (x+r, y), (x+R, base), (x-R, base)], PALE, None)
        self.line([(x-r,y),(x-R,base)])
        self.line([(x+r,y),(x+R,base)])
        self.ellipse(x, y, r, r*.25, MINT)

    def right_angle(self, x, y, side=1):
        self.line([(x, y-22), (x+side*22, y-22), (x+side*22, y)], MUTED, 3)


def cylinder_scene(d, beat, stage, t, *,
                   show_length=True, show_height=True, show_circle_area=True,
                   length_label="2πr", height_label="h", visible_discs=2):
    radius, height, x = 78, 230, 360
    width = 2*pi*radius
    if beat == 0:
        d.cylinder(x, 470, height, radius, BLUE)
        d.dimension((x,470), (x+radius,470), "r", (396,413), TEAL)
        d.dimension((217,470),(217,700),"h",(181,585),GOLD)
        if stage:
            end_y = 480 + (height-10)*t
            d.line([(x+radius-21, 480), (x+radius-21, end_y)], GOLD, 7)
            if t > .7:
                d.text((360,797), "Vertical seam", 33, GOLD, True)
        return
    if beat == 1:
        # Each cross section has fixed arc length; curvature decreases to zero.
        if not stage:
            d.cylinder(x,460,height,radius,BLUE)
            d.line([(x+radius-21,470),(x+radius-21,690)],GOLD,6)
            if show_height:
                d.dimension((629,460),(629,690),height_label,(654,567),GOLD)
            return
        bend = 2*pi*(1-t) if stage else 2*pi
        if bend < .001:
            arc = [(x-width/2 + width*i/60, 460) for i in range(61)]
        else:
            rho = width/bend
            arc = [(x+rho*sin(bend*(i/60-.5)),
                    460+rho*(1-cos(bend*(i/60-.5)))*.28) for i in range(61)]
        low = [(a, b+height) for a,b in arc]
        for i in sorted(range(len(arc)-1),key=lambda j:(arc[j][1]+arc[j+1][1])/2):
            # Project separate surface strips so the near wall occludes the
            # far wall when the opening is narrower than a semicircle.
            shade = max(0,min(1,(arc[i][1]-460)/47))
            d.polygon([arc[i],arc[i+1],low[i+1],low[i]],mix(PALE,BLUE,shade*.75),None)
        d.line(arc, INDIGO, 5)
        d.line(low, INDIGO, 5)
        d.line([arc[0],low[0]], GOLD, 6)
        d.line([arc[-1],low[-1]], GOLD, 6)
        if t > .87 and show_length:
            d.dimension((x-width/2,744),(x+width/2,744),length_label,(x,798),TEAL)
        if show_height:
            d.dimension((629,460),(629,690),height_label,(654,567),GOLD)
        return
    if beat == 2:
        left = x - width/2
        d.polygon([(left,460),(x+width/2,460),(x+width/2,690),(left,690)], PALE)
        if stage:
            extent = left + width*t
            d.draw.rectangle((left+2,462,max(left+2,extent),688),fill=BLUE)
        d.dimension((left,435),(x+width/2,435),"2πr",(x,391),TEAL)
        d.dimension((629,460),(629,690),"h",(654,567),GOLD)
        return
    if beat == 3:
        cy = 603
        d.polygon([(x-width/2,cy-114),(x+width/2,cy-114),(x+width/2,cy+114),
                   (x-width/2,cy+114)], PALE)
        for index, y in enumerate((cy-114-radius-24, cy+114+radius+24)[:visible_discs]):
            d.ellipse(x,y,radius,radius,SAND if stage >= index+1 else WHITE,GOLD)
            if show_circle_area:
                d.text((x,y),"πr²",32,GOLD,True)
        return
    d.cylinder(212,480,208,73,BLUE,WHITE)
    d.cylinder(508,480,208,73,BLUE,SAND,SAND)
    # Recess and inner edge distinguish the open cylinder.
    d.ellipse(212,482,61,13,"#c4cffc",INDIGO,3)
    d.text((212,770),"Wall only",34,INK,True)
    d.text((508,770),"Closed cylinder",34,INK,True)


def cone_scene(d, beat, stage, t):
    x, top, h, r = 278, 414, 246, 111
    bottom = top+h
    length = hypot(h,r)
    if beat < 2:
        d.cone(x,top,h,r,PALE)
        if stage or beat:
            d.polygon([(x,top),(x,bottom),(x+r,bottom)], MINT,None)
            d.line([(x,top),(x,bottom)],TEAL,6)
            d.line([(x,bottom),(x+r,bottom)],GOLD,6)
            d.right_angle(x,bottom)
            d.text((x-34,top+136),"h",36,TEAL,True)
            d.text((x+57,bottom+64),"r",36,GOLD,True)
        if beat == 1:
            traced = t if stage == 1 else float(stage > 1)
            end = (x+r*traced,top+h*traced)
            d.line([(x,top),end],INDIGO,8)
            d.text((x+111,top+103),"ℓ",43,INDIGO,True)
        return
    cx, cy = 359, 614
    arc_angle = 2*pi*r/length
    rotation = -pi/2
    a0 = rotation-arc_angle/2
    displayed = arc_angle*(t if beat == 2 and stage == 1 else 1)
    if beat == 2 and not stage:
        d.cone(360,430,h,r,PALE)
        return
    if beat == 3:
        for i in range(70):
            a = 2*pi*i/70
            b = a+.049
            d.line([(cx+length*cos(a),cy+length*sin(a)),
                    (cx+length*cos(b),cy+length*sin(b))],LINE,4)
    points=[(cx+length*cos(a0+displayed*i/90),cy+length*sin(a0+displayed*i/90))
            for i in range(91)]
    d.polygon([(cx,cy),*points],BLUE)
    d.line(points,GOLD,7)
    if stage and (beat != 2 or stage > 1 or t>.66):
        d.text((cx,cy-40),"ℓ",43,INDIGO,True)
        d.text((cx,cy-length-30),"2πr",35,GOLD,True)
    if beat == 4:
        if stage >= 2:
            d.ellipse(cx,750,r,r,SAND,GOLD)
            d.text((cx,750),"πr²",37,GOLD,True)
        elif stage:
            d.text((cx,719),"Sector area",36,TEAL,True)


def frustum_scene(d, beat, stage, t):
    R, r, h, x, base = 144, 80, 184, 360, 800
    top = base-h
    H = h*R/(R-r)
    apex = base-H
    if beat == 0:
        if not stage:
            d.cone(x,apex,H,R)
        else:
            d.frustum(x,top,h,r,R)
            lift = 82*t
            d.cone(x,apex-lift,H-h,r,SAND)
        if not stage or t<.65:
            d.dash((x-R-39,top),(x+R+39,top),TEAL,4)
        return
    if beat == 1:
        d.polygon([(x-r,top),(x+r,top),(x+R,base),(x-R,base)],PALE)
        d.dash((x,top),(x,base),MUTED)
        d.dimension((x,top),(x+r,top),"r",(x+35,top-52),TEAL)
        if stage:
            d.dimension((x,base),(x+R,base),"R",(x+70,base+60),INDIGO)
            d.dimension((568,top),(568,base),"h",(606,667),GOLD)
        return
    x = 335
    if beat < 4 or stage < 2:
        d.polygon([(x-r,top),(x+r,top),(x+R,base),(x-R,base)],PALE)
    if beat == 2:
        d.polygon([(x+r,top),(x+r,base),(x+R,base)],MINT,None)
        d.line([(x+r,top),(x+r,base)],TEAL,5)
        d.line([(x+r,base),(x+R,base)],GOLD,5)
        d.right_angle(x+r,base)
        d.text((x+r-45,667),"h",35,TEAL,True)
        d.text((x+r+52,832),"R − r",35,GOLD,True)
        if stage:
            d.line([(x+r,top),(x+r+(R-r)*t,top+h*t)],INDIGO,7)
            d.text((x+R+27,654),"ℓ",43,INDIGO,True)
    elif beat == 3:
        if stage:
            visibility = t if stage == 1 else 1
            d.polygon([(x-r,top),(x,apex),(x+r,top)],
                      mix(WHITE,SAND,visibility),mix(WHITE,GOLD,visibility))
        if stage >= 2:
            d.dash((x,apex),(x,base),MUTED)
            d.line([(x,top),(x+r,top)],TEAL,5)
            d.line([(x,base),(x+R,base)],INDIGO,5)
            d.dimension((546,apex),(546,base),"H",(581,531),GOLD)
            d.dimension((224,apex),(224,top),"H − h",(150,(apex+top)/2),TEAL)
            d.text((x+100,top-43),"r",32,TEAL,True)
            d.text((x+86,base+52),"R",32,INDIGO,True)
        if stage >= 3:
            d.text((x,top-144),"Remove",30,GOLD,True)
    else:
        if stage >= 2:
            d.frustum(362,top-58,h,r,R)
            d.text((360,845),"Curved wall",36,TEAL,True)
        else:
            d.text((x,677),"Frustum volume",36,INDIGO,True)


def compare_scene(d, beat, stage, t):
    r, top, h = 93, 466, 252
    level = 0.0
    remaining = 0.0
    pouring = False
    if beat == 1:
        remaining = 1 if stage == 1 else 1-t if stage >= 2 else 0
        level = t/3 if stage >= 2 else 0
        pouring = stage >= 2 and t < .98
    elif beat == 2:
        level = (1 + t)/3 if stage == 1 else (2+t)/3 if stage >= 2 else 1/3
        remaining = 1-t if stage else 0
        pouring = stage > 0 and t < .98
    elif beat >= 3:
        level = 1
        remaining = float(beat == 4)
    d.cone(176,top,h,r,MINT if remaining == 1 else PALE,inverted=True,
           base="#76d4c1" if remaining == 1 else WHITE)
    if 0 < remaining < 1:
        fraction = remaining ** (1/3)
        depth, radius = h*fraction, r*fraction
        meniscus = top+h-depth
        d.polygon([(176-radius,meniscus),(176,top+h),(176+radius,meniscus)],MINT,TEAL)
        d.ellipse(176,meniscus,radius,radius*.25,"#76d4c1",TEAL,3)
    d.cylinder(530,top,h,r,WHITE,None,fill=level)
    if pouring:
        d.arrow((277,top+25),(420,top+25),TEAL,8)
    if beat == 0:
        d.dimension((339,top),(339,top+h),"h",(374,top+h/2),GOLD)
        for x in (176,530):
            d.dimension((x,top),(x+r,top),"r",(x+44,top-52),TEAL)
    if beat in (1,2,3):
        for third in (1,2,3):
            y = top + h*(1-third/3)
            d.line([(611,y),(636,y)],TEAL,3)
        if stage or beat >= 2:
            for y, label in ((top,"1"),(top+h/3,"⅔"),(top+2*h/3,"⅓")):
                d.text((654,y),label,28,TEAL,True)
    d.text((176,803),"Cone",37,INDIGO,True)
    d.text((530,803),"Cylinder",37,INDIGO,True)


def combined_scene(d, beat, stage, t):
    x, r, y, h = 360, 133, 504, 248
    if beat < 2:
        closed = t if stage == 1 else float(stage > 1)
        gap = (86 if beat == 0 else 112) * (1-closed)
        d.cylinder(x,y+gap/2,h,r,PALE,SAND if beat == 1 else WHITE,top_rim=gap>6)
        d.hemisphere(x,y-gap/2,r,MINT,SAND if beat == 1 and gap>5 else None)
        if beat == 1 and gap > 53:
            d.text((360,y),"Joining faces",30,GOLD,True)
        elif beat == 1 and gap <= 6:
            d.line([(x-r,y),(x+r,y)],LINE,4)
        return
    exposed = beat == 2 and stage
    d.cylinder(x,y,h,r,BLUE if exposed or beat >= 3 else PALE,None,
               SAND if stage>=2 and beat==2 else None,top_rim=False)
    d.hemisphere(x,y,r,MINT if beat>=3 or stage>=3 else WHITE,None)
    d.line([(x-r,y),(x+r,y)],LINE,3)
    if exposed:
        d.text((360,625),"Curved wall",34,INK,True)
        if stage >= 2:
            d.text((360,815),"Bottom disc",33,GOLD,True)
        if stage >= 3:
            d.text((360,450),"Curved dome",32,TEAL,True)
    elif beat >= 3:
        d.text((360,450),"Hemisphere",32,TEAL,True)
        d.text((360,626),"Cylinder",35,INDIGO,True)


def cube_slots():
    return ([(i,j,k) for k in range(2) for j in range(2) for i in range(3)],
            [(i,j,0) for j in range(3) for i in range(4)])


def iso(i,j,k,origin=(322,690),scale=57):
    return origin[0]+(i-j)*scale, origin[1]+(i+j)*scale*.51-k*scale*1.04


def cube(d, xyz, identity, labelled, origin, scale):
    i,j,k=xyz
    a,b,c,e,f,g,h=[iso(i+dx,j+dy,k+dz,origin,scale)
                   for dx,dy,dz in ((0,0,1),(1,0,1),(1,1,1),(0,1,1),
                                    (1,0,0),(1,1,0),(0,1,0))]
    tone = (BLUE,MINT,SAND)[(identity-1)//4]
    d.polygon([b,c,g,f],mix(tone,INK,.19),WHITE,3)
    d.polygon([e,c,g,h],mix(tone,INK,.32),WHITE,3)
    d.polygon([a,b,c,e],tone,WHITE,3)
    if labelled:
        d.text(((a[0]+c[0])/2,(a[1]+c[1])/2),str(identity),22,INK,True)


def conservation_scene(d, beat, stage, t):
    if beat <= 1:
        first, second = cube_slots()
        if beat == 0:
            # Lift the top layer before separating the same numbered cubes.
            p = t if stage else 0
            slots=[]
            for a,b in zip(first,second):
                lifted=max(0,1-abs(2*p-1))
                slots.append(tuple(u+(v-u)*p for u,v in zip(a,b))[:2]+
                             (a[2]+(b[2]-a[2])*p+lifted*(.55+a[2]*1.1),))
            for i, pos in sorted(enumerate(slots,1),key=lambda z:(sum(z[1][:2])+z[1][2]*.11,z[1][2])):
                cube(d,pos,i,True,(337,634),70)
            if p < .1:
                d.text((360,812),"3 × 2 × 2",37,INDIGO,True)
            elif p > .9:
                d.text((360,900),"4 × 3 × 1",37,INDIGO,True)
        else:
            for layer in (0,1):
                for identity,(x,y,z) in sorted(enumerate(first,1),key=lambda item:sum(item[1][:2])):
                    if z == layer:
                        cube(d,(x,y,0),identity,True,(185,425+layer*170),44)
            for identity,pos in sorted(enumerate(second,1),key=lambda item:sum(item[1][:2])):
                cube(d,pos,identity,True,(503,497),41)
            d.text((209,745),"3 × 2 × 2",36,INDIGO,True)
            d.text((523,745),"4 × 3 × 1",36,INDIGO,True)
            d.text((360,860),"Same 12 unit cubes",35,TEAL,True)
        return
    R, r = 108, 89
    H = 4*R**3/(3*r**2)
    d.ellipse(175,591,R,R,BLUE)
    d.draw.arc((175-R,591-R*.26,175+R,591+R*.26),0,360,fill=INDIGO,width=3)
    center=(525,591)
    d.cylinder(center[0],center[1]-H/2,H,r,MINT,WHITE,edge=TEAL)
    if beat == 2:
        if stage:
            d.arrow((305,591),(409,591),TEAL,6)
            d.text((360,798),"No material lost",35,TEAL,True)
        if stage >= 2:
            d.text((360,854),"Density unchanged",35,TEAL,True)
    else:
        d.dimension((175,591),(175+R,591),"R",(222,547),INDIGO)
        d.dimension((525,591-H/2),(525+r,591-H/2),"r",(567,440),TEAL)
        d.dimension((644,591-H/2),(644,591+H/2),"H",(674,591),GOLD)
        d.text((175,792),"Sphere",36,INDIGO,True)
        d.text((525,792),"Cylinder",36,TEAL,True)
        if beat == 4 and stage >= 3:
            d.text((360,865),"Surface area can change",34,GOLD,True)


SCENES=(cylinder_scene,cone_scene,frustum_scene,compare_scene,combined_scene,conservation_scene)


def artwork(lesson, beat, stage, progress, rows, *, diagram=None, titles=None, scene=None):
    d = Diagram() if diagram is None else diagram
    title, headings = TITLES[lesson] if titles is None else titles
    d.draw.rectangle((0,0,720,12),fill=INDIGO)
    d.text((48,87),title,32,INDIGO,True,"lm")
    d.line([(48,129),(672,129)],LINE,2)
    d.text((48,215),headings[beat],42,INK,True,"lm")
    d.draw.rounded_rectangle((40,289,680,928),radius=33,fill=WHITE,outline=LINE,width=2)
    (SCENES[lesson] if scene is None else scene)(d,beat,stage,ease(progress))
    if rows:
        images=[formula(str(Path(p))) for p in rows]
        if any(im.width>616 for im in images) or sum(im.height for im in images)+24*(len(images)-1)>227:
            raise ValueError(f"Equation exceeds safe typesetting bounds for {title}, beat {beat+1}")
        y=1080-(sum(im.height for im in images)+24*(len(images)-1))/2
        for im in images:
            d.image.paste(im,((720-im.width)//2,round(y)),im)
            y+=im.height+24
    return d.image
