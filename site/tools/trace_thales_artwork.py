"""Exact, offline 9:16 Thales-theorem artwork for TRACE Mission 05.

All geometric coordinates are computed, not painted by an image model.
Pure mathematical tests work without Pillow; Pillow is needed only to render.
"""
from fractions import Fraction
import math

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    Image = ImageDraw = ImageFont = None

P = {
    "bg": "#FAF8F5", "white": "#FFFFFF", "ink": "#172337",
    "sub": "#5B6776", "maroon": "#80324A", "gold": "#C5A371",
    "line": "#E8E2DA", "soft": "#F1ECE6", "green": "#28624A",
    "greenbg": "#E4F2E9", "blue": "#255980", "bluebg": "#E8F1FA",
    "red": "#A84752", "rose": "#FCEAE8"
}
FONT="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BOLD="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
SCENES=[
    "bpt-hook", "bpt-points", "bpt-slide", "bpt-rule", "bpt-angles",
    "bpt-proof", "bpt-example", "bpt-practice", "bpt-answer"
]
HEADINGS={
    "bpt-hook":("One line.","Two equal ratios?"),
    "bpt-points":("Meet triangle","A B C"),
    "bpt-slide":("Move the","parallel line"),
    "bpt-rule":("Compare top","with bottom"),
    "bpt-angles":("Same angles.","Same shape."),
    "bpt-proof":("Why the","ratios match"),
    "bpt-example":("Try a real","set of lengths"),
    "bpt-practice":("Your turn.","Think first."),
    "bpt-answer":("Check and","verify the ratios"),
}


def lengths(ad, db, ac):
    if any(type(x) is not int or x <= 0 or x > 500 for x in (ad, db, ac)):
        raise ValueError("Thales requires positive integer segment lengths")
    ab = ad + db
    ae = Fraction(ad * ac, ab)
    ec = Fraction(db * ac, ab)
    if ae / ec != Fraction(ad, db):
        raise ValueError("Thales part-to-part ratio arithmetic incorrect")
    return {"AB": ab, "AE": ae, "EC": ec, "AD": ad, "DB": db, "AC": ac}


def interpolate(a,b,t):
    return (a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t)


def parallel_segments(triangle,t):
    if not (0 < t < 1):
        raise ValueError("Cut points must stay strictly inside the triangle")
    a,b,c=(tuple(triangle[k]) for k in ("A","B","C"))
    d,e=interpolate(a,b,t),interpolate(a,c,t)
    cross=(e[0]-d[0])*(c[1]-b[1])-(e[1]-d[1])*(c[0]-b[0])
    if abs(cross)>1e-7:
        raise ValueError("DE is not exactly parallel to BC")
    return a,b,c,d,e


def slide_t(scene, fraction, data):
    fraction=max(0,min(1,float(fraction)))
    fraction=fraction*fraction*(3-2*fraction)
    if scene=="bpt-slide":
        return .68-(.68-.32)*fraction
    if scene in ("bpt-practice","bpt-answer"):
        x=data["practice"]
    else:
        x=data["example"]
    return x["AD"]/(x["AD"]+x["DB"])


def artwork(spec, beat, fraction, index, total, w, h, demo):
    scene=beat["scene"]
    if scene not in HEADINGS:
        raise ValueError("Unknown Thales scene: "+str(scene))
    if h*9!=w*16:
        raise ValueError("Thales artwork must be 9:16 portrait")
    if Image is None:
        raise RuntimeError("Install offline Pillow renderer to draw frames")
    visual=spec["visual"]
    raw=visual["triangle"]
    t=slide_t(scene,fraction,visual)
    a,b,c,d,e=parallel_segments(raw,t)
    k=w/720
    px=lambda v:round(v*k)
    im=Image.new("RGB",(w,h),P["bg"])
    dr=ImageDraw.Draw(im)
    def ft(size,bold=False):
        return ImageFont.truetype(BOLD if bold else FONT,max(10,px(size)))
    def rectangle(x0,y0,x1,y1,color="white",radius=16,border=None):
        dr.rounded_rectangle((px(x0),px(y0),px(x1),px(y1)),
            radius=px(radius),fill=P.get(color,color),
            outline=P.get(border,border) if border else None,width=max(1,px(2)))
    def text(x,y,s,size=29,color="ink",bold=False,anchor=None):
        dr.text((px(x),px(y)),str(s),font=ft(size,bold),fill=P.get(color,color),anchor=anchor)
    def center(y,s,size=30,color="ink",bold=False):
        text(360,y,s,size,color,bold,"mt")
    def line(x0,y0,x1,y1,color="line",size=2):
        dr.line([(px(x0),px(y0)),(px(x1),px(y1))],
            fill=P.get(color,color),width=max(1,px(size)),joint="curve")
    def segment(p0,p1,color,size=6):
        line(p0[0],p0[1],p1[0],p1[1],color,size)
    def point(name,p0,dx=0,dy=0):
        radius=max(3,px(7))
        x,y=px(p0[0]),px(p0[1])
        dr.ellipse((x-radius,y-radius,x+radius,y+radius),fill=P["maroon"])
        text(p0[0]+dx,p0[1]+dy,name,26,"ink",True,"mm")
    def pair_mark(p0,p1,offset):
        cx=(p0[0]+p1[0])/2+offset
        cy=(p0[1]+p1[1])/2
        for dx in (-8,6):
            line(cx+dx-7,cy+7,cx+dx+5,cy-7,"maroon",3)

    # Reusable Bond-light scene chrome; all geometry respects portrait safe area.
    rectangle(28,28,692,1252,"white",22,"line")
    rectangle(60,76,112,84,"maroon",5)
    text(128,59,"TRIGGLE",34,"ink",True)
    text(560,68,"CLASS 10",18,"sub",True)
    text(60,136,"BASIC PROPORTIONALITY",18,"maroon",True)
    line(60,184,660,184)
    heading=HEADINGS[scene]
    text(60,208,heading[0],49,"ink",True)
    text(60,272,heading[1],45,"ink",True)

    # Triangle figures use a fixed coordinate frame; sliding D/E is derived
    # from the same interpolation t on AB and AC, preserving true parallelism.
    if scene=="bpt-angles":
        dr.polygon([(px(x),px(y)) for x,y in (a,d,e)],fill=P["greenbg"])
    elif scene in ("bpt-rule","bpt-proof"):
        segment(a,d,"green",9);segment(a,e,"green",9)
        segment(d,b,"gold",9);segment(e,c,"gold",9)
    elif scene in ("bpt-practice","bpt-answer"):
        dr.polygon([(px(x),px(y)) for x,y in (a,d,e)],fill=P["bluebg"])
    segment(a,b,"ink",5)
    segment(a,c,"ink",5)
    segment(b,c,"ink",5)
    segment(d,e,"maroon",8)
    # Parallel-line marks are matching, even while the line is moving.
    pair_mark(d,e,0);pair_mark(b,c,0)
    point("A",a,0,-26)
    point("B",b,-25,21)
    point("C",c,24,21)
    point("D",d,-26,0)
    point("E",e,26,0)

    rectangle(70,915,650,1068,"soft",17)
    if scene=="bpt-hook":
        center(939,"Move DE. Watch D and E.",30,"ink",True)
        center(994,"What stays unchanged?",29,"maroon")
    elif scene=="bpt-points":
        center(938,"D on AB     E on AC",31,"ink",True)
        center(995,"DE is parallel to BC",30,"maroon")
    elif scene=="bpt-slide":
        center(940,"DE  ∥  BC",40,"maroon",True)
        center(997,"Two cuts move together",29,"sub")
    elif scene=="bpt-rule":
        center(939,"AD / DB  =  AE / EC",34,"maroon",True)
        center(998,"TOP / BOTTOM on both sides",23,"ink",True)
    elif scene=="bpt-angles":
        center(937,"Triangle ADE  ~  Triangle ABC",26,"green",True)
        center(996,"Parallel lines preserve angles",25,"ink")
    elif scene=="bpt-proof":
        center(937,"AD / AB  =  AE / AC",33,"blue",True)
        center(996,"AD / DB  =  AE / EC",33,"maroon",True)
    elif scene=="bpt-example":
        x=lengths(**{k.lower():v for k,v in visual["example"].items()})
        center(938,f"AB = 3 + 5 = {x['AB']} cm",29,"ink",True)
        center(997,f"AE = (3 / 8) × 16 = {x['AE']} cm",27,"green",True)
    elif scene=="bpt-practice":
        center(939,"AD = 4     DB = 6     AC = 20",26,"ink",True)
        center(997,"Find AE. Pause the video.",27,"blue",True)
        # No value for AE or EC, or ratio solution, is present in this scene.
    elif scene=="bpt-answer":
        x=lengths(**{k.lower():v for k,v in visual["practice"].items()})
        center(932,f"AB = {x['AB']}    AE = {x['AE']}    EC = {x['EC']}",27,"green",True)
        center(994,"4 / 6  =  8 / 12",35,"maroon",True)

    line(60,1094,660,1094)
    text(60,1118,"WATCH  ·  UNDERSTAND  ·  TRY",18,"sub",True)
    rectangle(60,1186,660,1196,"soft",6)
    rectangle(60,1186,60+600*(index+max(0,min(1,float(fraction))))/total,1196,"maroon",6)
    text(60,1213,f"{index+1:02d} / {total:02d}",17,"sub",True)
    if demo:
        rectangle(120,1040,600,1075,"rose",8)
        center(1049,"TECHNICAL DEMO · NO REAL NARRATION",16,"red",True)
    return im
