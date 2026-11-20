"""Offline, mathematically exact parabola artwork for Grade 10 discriminant.

The plot is generated from the coefficients, never an AI illustration.
Image geometry is proportional to a 720×1280 portrait frame and remains
legible at 360×640. All displayed root/discriminant values are calculated.
No network/API calls, no student-facing release from this module.
"""
import math

# Pure mathematical QA runs in npm test without Pillow; only rendering needs it.
try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    Image = ImageDraw = ImageFont = None

PAL = {
    "bg": "#FAF8F5", "paper": "#FFFFFF", "ink": "#172337",
    "sub": "#5B6776", "maroon": "#80324A", "gold": "#C5A371",
    "line": "#E8E2DA", "soft": "#F1ECE6", "green": "#28624A",
    "greenbg": "#E4F2E9", "rose": "#FCEAE8", "red": "#A84752",
    "blue": "#255980", "bluebg": "#E8F1FA",
}
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
ORDER = [
    "disc-intro", "disc-roots", "disc-slider", "disc-two", "disc-touch",
    "disc-none", "disc-rule", "disc-practice", "disc-answer"
]
HEADINGS = {
    "disc-intro": ("Why do roots", "change?"),
    "disc-roots": ("Roots live on", "the x-axis"),
    "disc-slider": ("Change only", "the value of c"),
    "disc-two": ("Two crossings.", "Two real roots."),
    "disc-touch": ("One touch.", "Equal roots."),
    "disc-none": ("No crossing.", "No real roots."),
    "disc-rule": ("Discover the", "discriminant"),
    "disc-practice": ("Your turn.", "Think first."),
    "disc-answer": ("Check your", "prediction"),
}


def discriminant(a, b, c):
    if a == 0:
        raise ValueError("Quadratic coefficient a must not equal zero")
    return b * b - 4 * a * c


def real_roots(a, b, c):
    delta = discriminant(a, b, c)
    if delta < 0:
        return ()
    root = math.sqrt(delta)
    return ((-b - root) / (2 * a), (-b + root) / (2 * a))


def _smooth(t):
    t = max(0., min(1., t))
    return t * t * (3 - 2 * t)


def example_c(values, scene, fraction):
    first, middle, final = values
    if scene == "disc-slider":
        return first + (final - first) * _smooth(fraction)
    if scene == "disc-touch":
        return first + (middle - first) * _smooth(fraction)
    if scene == "disc-none":
        return middle + (final - middle) * _smooth(fraction)
    if scene == "disc-rule":
        return middle
    return first


def artwork(spec, beat, fraction, index, total, w, h, demo):
    scene = beat["scene"]
    if scene not in HEADINGS:
        raise ValueError("Unknown discriminant scene: " + str(scene))
    if h * 9 != w * 16:
        raise ValueError("Discriminant artwork requires 9:16 portrait")
    if Image is None:
        raise RuntimeError("Install the local Pillow renderer before drawing frames")
    visual = spec["visual"]
    a = visual["example"]["a"]
    b = visual["example"]["b"]
    values = visual["example"]["cValues"]
    practice = visual["practice"]
    c = example_c(values, scene, fraction)
    sc = w / 720
    px = lambda v: round(sc * v)
    image = Image.new("RGB", (w, h), PAL["bg"])
    draw = ImageDraw.Draw(image)
    def font(size, bold=False):
        return ImageFont.truetype(BOLD if bold else FONT, max(10, px(size)))
    def box(x0, y0, x1, y1, fill="paper", radius=16, border=None):
        draw.rounded_rectangle(
            (px(x0), px(y0), px(x1), px(y1)), radius=max(1, px(radius)),
            fill=PAL.get(fill, fill), outline=PAL.get(border, border) if border else None,
            width=max(1, px(2)),
        )
    def txt(x, y, value, size=32, color="ink", bold=False, anchor=None):
        draw.text((px(x), px(y)), str(value), font=font(size, bold),
                  fill=PAL.get(color, color), anchor=anchor)
    def mid(y, value, size=32, color="ink", bold=False):
        txt(360, y, value, size, color, bold, "mt")
    def line(x0,y0,x1,y1,color="line",size=2):
        draw.line([(px(x0),px(y0)),(px(x1),px(y1))],
                  fill=PAL.get(color,color),width=max(1,px(size)))
    def plot(pa,pb,pc,small=False):
        # Student sees *actual* real x-axis intersections; no artificial dots.
        if small: left,right,top,bottom=145,575,788,989
        else: left,right,top,bottom=91,632,445,907
        xmin,xmax=-0.4,4.4
        ymin,ymax=-2.0,6.0
        xmap=lambda x:left+(x-xmin)*(right-left)/(xmax-xmin)
        ymap=lambda y:bottom-(y-ymin)*(bottom-top)/(ymax-ymin)
        box(left-10,top-15,right+10,bottom+15,"paper",16,"line")
        for yi in (0,2,4):
            line(left,ymap(yi),right,ymap(yi),"soft",2)
        line(left,ymap(0),right,ymap(0),"ink",3)
        line(xmap(0),top,xmap(0),bottom,"sub",2)
        if not small:
            for xt in (1,2,3):
                line(xmap(xt),ymap(0)-7,xmap(xt),ymap(0)+7,"sub",2)
                txt(xmap(xt),ymap(0)+24,str(xt),22,"sub",True,"mt")
            txt(right-6,ymap(0)-43,"x",22,"sub",True,"rt")
            txt(xmap(0)+10,top+14,"y",22,"sub",True)
        points=[]
        for i in range(240):
            x=xmin+(xmax-xmin)*i/239
            y=pa*x*x+pb*x+pc
            if ymin <= y <= ymax:
                points.append((px(xmap(x)),px(ymap(y))))
            elif len(points)>1:
                draw.line(points,fill=PAL["maroon"],width=max(2,px(7 if not small else 5)),joint="curve")
                points=[]
            else:
                points=[]
        if len(points)>1:
            draw.line(points,fill=PAL["maroon"],width=max(2,px(7 if not small else 5)),joint="curve")
        roots=real_roots(pa,pb,pc)
        for root in roots:
            if xmin <= root <= xmax:
                X,Y=px(xmap(root)),px(ymap(0))
                rad=max(3,px(9 if not small else 7))
                draw.ellipse((X-rad,Y-rad,X+rad,Y+rad),fill=PAL["green"],outline=PAL["paper"],width=max(1,px(2)))
        return roots

    # Fixed chrome with clear margins and running scene progress.
    box(28,28,692,1252,"paper",22,"line")
    box(60,76,112,84,"maroon",5)
    txt(128,61,"TRIGGLE",34,"ink",True)
    txt(559,70,"CLASS 10",18,"sub",True)
    txt(60,136,"NATURE OF ROOTS",19,"maroon",True)
    line(60,184,660,184)
    first,second=HEADINGS[scene]
    txt(58,208,first,48,"ink",True)
    txt(58,272,second,48,"ink",True)
    line(60,1092,660,1092)
    txt(60,1114,"WATCH  ·  UNDERSTAND  ·  TRY",18,"sub",True)
    box(60,1186,660,1196,"soft",6)
    box(60,1186,60+600*(index+max(0,min(1,fraction)))/total,1196,"maroon",6)
    txt(60,1210,f"{index+1:02d} / {total:02d}",16,"sub",True)

    if scene in ORDER[:6]:
        mid(379,"y = x² − 4x + c",39,"maroon",True)
        roots = plot(a,b,c)
        if scene == "disc-intro":
            mid(960,"One curve. Three possible outcomes.",26,"sub",True)
            mid(1010,"Watch what happens as it rises.",24,"maroon")
        elif scene == "disc-roots":
            mid(955,"Where y = 0, we find a real root.",26,"ink",True)
            mid(1004,"Crossings happen on the x-axis.",24,"sub")
        elif scene == "disc-slider":
            mid(959,"Only c changes.",34,"maroon",True)
            mid(1009,"The curve moves vertically.",24,"sub")
        else:
            target={"disc-two":values[0],"disc-touch":values[1],"disc-none":values[2]}[scene]
            # During transitions, label the final c/Δ only after the animation
            # has substantially arrived at that mathematical state.
            settled=scene=="disc-two" or fraction>=.90
            if settled:
                delta=discriminant(a,b,target)
                mid(958,f"c = {target}      Δ = {delta}".replace("-","−"),32,"maroon",True)
                if scene == "disc-two":
                    mid(1008,f"Real roots: {roots[0]:.0f} and {roots[-1]:.0f}",26,"green",True)
                elif scene == "disc-touch":
                    x=(-b)/(2*a)
                    mid(1008,f"Repeated root: x = {x:g}",26,"green",True)
                else:
                    mid(1008,"No real x-intercepts",27,"red",True)
            else:
                mid(963,"Watch the curve move upward.",25,"sub")
    elif scene == "disc-rule":
        mid(409,"Δ = b² − 4ac",53,"maroon",True)
        for y,sign,label,color,fill in [
            (525,"> 0","Two unequal real roots","green","greenbg"),
            (655,"= 0","Equal real roots","blue","bluebg"),
            (785,"< 0","No real roots","red","rose")]:
            box(80,y,640,y+112,fill,17)
            txt(113,y+53,"Δ "+sign,32,color,True,"lm")
            txt(624,y+55,label,23,"ink",True,"rm")
        mid(964,"The sign tells the story.",27,"sub",True)
    elif scene == "disc-practice":
        mid(454,"2x² − 6x + 5 = 0",45,"ink",True)
        box(90,547,630,650,"soft",20)
        mid(580,"a = 2    b = −6    c = 5",28,"ink",True)
        mid(704,"What is Δ?",48,"maroon",True)
        mid(800,"How many real roots?",30,"ink",True)
        box(105,878,615,958,"bluebg",14)
        mid(905,"Pause and predict before the answer",22,"blue",True)
        # NEVER draw Δ's value or the root classification in this beat.
    elif scene == "disc-answer":
        pa,pb,pc=(practice[k] for k in ("a","b","c"))
        delta=discriminant(pa,pb,pc)
        mid(409,f"Δ = ({pb})² − 4({pa})({pc})".replace("-","−"),34,"ink",True)
        mid(502,f"= {pb*pb} − {4*pa*pc}",46,"ink",True)
        mid(577,f"= {delta}".replace("-","−"),65,"maroon",True)
        box(135,670,585,748,"greenbg" if delta>=0 else "rose",18)
        mid(697,("Real roots" if delta>=0 else "No real roots"),31,
            "green" if delta>=0 else "red",True)
        plot(pa,pb,pc,small=True)
    if demo:
        box(100,1036,620,1073,"rose",9)
        mid(1043,"DEMO · PLACEHOLDER AUDIO ONLY",18,"red",True)
    return image
