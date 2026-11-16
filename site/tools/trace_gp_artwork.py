"""Exact, offline, mobile-first geometric-series storyboard for TRACE.
Shares the approved A.P. video's typography, color palette, timing and 9:16 frame.
No generated numbers: every equation derives from a validated four-term series.
"""
import math
from PIL import Image,ImageDraw,ImageFont

PAL={"bg":"#FAF8F5","ink":"#172337","sub":"#5B6776","maroon":"#80324A",
     "gold":"#C5A371","surface":"#FFFFFF","line":"#E8E2DA","soft":"#F1ECE6",
     "green":"#E4F2E9","greenink":"#28624A","rose":"#FCEAE8"}
FONT="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BOLD="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
HEADINGS={
 "gp-intro":("A sum with","a secret"),
 "gp-pattern":("Watch the","numbers grow"),
 "gp-name":("Give our sum","a name"),
 "gp-double":("Double every","single term"),
 "gp-align":("Line up the","matching terms"),
 "gp-cancel":("Now watch them","cancel out"),
 "gp-rule":("Discover the","general rule"),
 "gp-practice":("Your turn.","Think first."),
 "gp-answer":("Check your","discovery")
}
EX=[1,2,4,8]
PR=[1,3,9,27]
SCENES=list(HEADINGS)

def artwork(spec,beat,fraction,index,total,w,h,demo):
    scene=beat["scene"]
    if scene not in HEADINGS: raise ValueError("Unrecognised G.P. storyboard scene")
    scale=w/720
    P=lambda x:round(x*scale)
    im=Image.new("RGB",(w,h),PAL["bg"]);d=ImageDraw.Draw(im)
    font=lambda size,bold=False:ImageFont.truetype(BOLD if bold else FONT,max(10,P(size)))
    def box(x0,y0,x1,y1,color,r=16,stroke=None,sw=1):
        d.rounded_rectangle((P(x0),P(y0),P(x1),P(y1)),radius=P(r),fill=PAL.get(color,color),
                            outline=PAL.get(stroke,stroke) if stroke else None,width=max(1,P(sw)))
    def txt(x,y,text,size=31,color="ink",bold=False,anchor=None):
        d.text((P(x),P(y)),text,font=font(size,bold),fill=PAL.get(color,color),anchor=anchor)
    def mid(y,text,size=35,color="ink",bold=False):
        txt(360,y,text,size,color,bold,"mt")
    def horizontal(y,x0=60,x1=660,color="line",width=2):
        d.line([(P(x0),P(y)),(P(x1),P(y))],fill=PAL.get(color,color),width=P(width))
    box(28,28,692,1252,"surface",22,"line",2)
    box(60,76,112,84,"maroon",5)
    txt(128,61,"TRIGGLE",34,"ink",True)
    txt(563,71,"CLASS 10",17,"sub",True)
    txt(60,135,"GEOMETRIC SERIES",17,"maroon",True)
    horizontal(184)
    a,b=HEADINGS[scene]
    txt(58,209,a,48,"ink",True)
    txt(58,275,b,48,"ink",True)
    horizontal(1092)
    txt(60,1114,"WATCH  ·  UNDERSTAND  ·  TRY",17,"sub",True)
    box(60,1186,660,1196,"soft",6)
    box(60,1186,60+600*(index+max(0,min(1,fraction)))/total,1196,"maroon",6)
    txt(60,1210,f"{index+1:02d} / {total:02d}",15,"sub",True)
    if demo:
        box(100,987,620,1057,"rose",12)
        mid(1012,"TECHNICAL DEMO  ·  NO NARRATION",20,"maroon",True)
    # Aligned positions are mathematically significant. The two empty endpoints
    # are intentional: 2S has no 1 term; S has no 16 term.
    def row(label,values,y,mark=False,upper=False):
        txt(61,y+55,label,33,"maroon",True,"lm")
        x0=151;gap=6;size=93
        for i,v in enumerate(values):
            x=x0+i*(size+gap)
            if v is None:continue
            cancelled=mark and i in (1,2,3)
            edge=mark and (i==4 if upper else i==0)
            bg="soft" if cancelled else ("green" if edge else "surface")
            box(x,y,x+size,y+106,bg,12,"line",1)
            txt(x+size/2,y+56,str(v),39,"sub" if cancelled else ("greenink" if edge else "ink"),True,"mm")
            if cancelled:
                # Cross out only the identical terms at positions 2, 4 and 8.
                d.line([(P(x+17),P(y+76)),(P(x+size-17),P(y+29))],fill=PAL["maroon"],width=P(4))
    def aligned(mark=False):
        mid(441,"Place the two sums together",25,"sub")
        row("2S",[None,2,4,8,16],504,mark,True)
        row("− S",[1,2,4,8,None],636,mark,False)
        horizontal(774,145,655,"maroon",2)
        if mark:
            mid(799,"Only 16 − 1 remains",35,"maroon",True)
        else:
            mid(800,"2, 4, 8 match perfectly",27,"sub",True)
    if scene=="gp-intro":
        mid(491,"1 + 2 + 4 + 8",58,"maroon",True)
        mid(597,"Can we add these quickly?",28,"sub")
        box(135,715,585,814,"soft",18)
        mid(755,"A visual shortcut awaits",26,"ink",True)
    elif scene=="gp-pattern":
        terms=EX
        for i,n in enumerate(terms):
            x=61+i*154
            box(x,502,x+125,627,"maroon" if i==3 else "soft",18)
            txt(x+62,565,str(n),52,"#FFFFFF" if i==3 else "ink",True,"mm")
            if i<3:txt(x+132,562,"×",29,"gold",True,"mm")
        mid(714,"× 2     × 2     × 2",34,"maroon",True)
        mid(798,"Common ratio r = 2",27,"sub")
    elif scene=="gp-name":
        mid(478,"S = 1 + 2 + 4 + 8",46,"maroon",True)
        mid(626,"S means the whole sum.",27,"sub")
        box(122,733,598,834,"soft",18)
        mid(772,"No long addition needed",25,"ink",True)
    elif scene=="gp-double":
        mid(471,"S = 1 + 2 + 4 + 8",39,"ink",True)
        box(82,589,638,736,"soft",18)
        mid(634,"2S = 2 + 4 + 8 + 16",39,"maroon",True)
        mid(808,"Every term is multiplied by 2",26,"sub")
    elif scene=="gp-align":
        aligned()
    elif scene=="gp-cancel":
        aligned(True)
        mid(898,"2S − S = S = 15",34,"maroon",True)
    elif scene=="gp-rule":
        mid(446,"Multiply by r, then subtract",24,"sub")
        mid(528,"rS − S = arⁿ − a",39,"maroon",True)
        horizontal(606,112,608)
        # Hand-drawn stacked fraction: mathematically legible on 320px screens.
        txt(134,722,"Sₙ =",43,"ink",True)
        mid(667,"a(rⁿ − 1)",44,"maroon",True)
        horizontal(724,317,555,"maroon",3)
        mid(748,"r − 1",39,"maroon",True)
        mid(867,"Use this only when r ≠ 1",24,"sub")
    elif scene=="gp-practice":
        mid(464,"1 + 3 + 9 + 27",49,"maroon",True)
        mid(585,"Common ratio = 3",27,"sub")
        box(90,706,630,828,"soft",18)
        mid(747,"What remains in 3S − S?",27,"ink",True)
        mid(900,"Pause and solve on paper",25,"sub")
    elif scene=="gp-answer":
        mid(432,"3S = 3 + 9 + 27 + 81",34,"ink",True)
        mid(510,"S = 1 + 3 + 9 + 27",34,"ink",True)
        horizontal(602,80,640,"maroon",2)
        mid(643,"3S − S = 81 − 1",38,"maroon",True)
        mid(747,"2S = 80",43,"ink",True)
        box(176,838,544,937,"green",20)
        mid(871,"S = 40",49,"greenink",True)
    return im
