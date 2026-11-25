"""Draw original, scaled Grade 9 textbook figures. Run from the repository root."""
from html import escape
from math import atan2, cos, degrees, hypot, radians, sin, sqrt
from pathlib import Path

DEST = Path("site/assets/grade9-ch4")
INK = "#263755"
BLUE = "#3067b1"
ACCENT = "#973f19"


def polar(point, radius, angle):
    x, y = point
    return x + radius * cos(radians(angle)), y - radius * sin(radians(angle))


def xy(point):
    return f"{point[0]:.3f} {point[1]:.3f}"


def path(data, color=INK, dash=False):
    dash_attr = ' stroke-dasharray="5 4"' if dash else ''
    return f'<path d="{data}" fill="none" stroke="{color}"{dash_attr}/>'


def lines(*points, color=INK, dash=False):
    return path("M " + " L ".join(map(xy, points)), color, dash)


def text(point, content):
    x, y = point
    return f'<text x="{x:.3f}" y="{y:.3f}">{escape(content)}</text>'


def labels(points, offsets):
    return ''.join(text((points[k][0]+dx, points[k][1]+dy), k)
                   for k, (dx, dy) in offsets.items())


def edges(points, *chains):
    return ''.join(lines(*(points[k] for k in chain)) for chain in chains)


def circle(centre, radius, color=BLUE):
    x, y = centre
    return f'<circle cx="{x}" cy="{y}" r="{radius}" fill="none" stroke="{color}"/>'


def arc(point, radius, start, delta):
    return path(f"M {xy(polar(point,radius,start))} A {radius} {radius} 0 "
                f"{int(abs(delta)>180)} {int(delta<0)} {xy(polar(point,radius,start+delta))}", ACCENT)


def direction(vertex, endpoint):
    return degrees(atan2(vertex[1]-endpoint[1], endpoint[0]-vertex[0]))


def angle(a, v, b, label, radius=18, label_radius=38, reflex=False):
    start = direction(v, a)
    delta = (direction(v,b)-start+180) % 360 - 180
    if reflex:
        delta -= 360 if delta > 0 else -360
    marker = arc(v,radius,start,delta)
    return marker + (text(polar(v,label_radius,start+delta/2),label) if label else '')


def right(point, a, b, size=9):
    u, v = direction(point,a), direction(point,b)
    p, q = polar(point,size,u), polar(point,size,v)
    return lines(p,(q[0]+p[0]-point[0],q[1]+p[1]-point[1]),q,color=ACCENT)


def ticks(a,b,count=1):
    dx,dy = b[0]-a[0],b[1]-a[1]
    length = hypot(dx,dy)
    ux,uy = dx/length,dy/length
    shape = ''
    for i in range(count):
        shift = (i-(count-1)/2)*6
        x,y = (a[0]+b[0])/2+shift*ux,(a[1]+b[1])/2+shift*uy
        shape += lines((x-5*uy,y+5*ux),(x+5*uy,y-5*ux),color=ACCENT)
    return shape


def arrows(a,b,count=1):
    x, y = ((a[i]+b[i])/2 for i in (0,1))
    d = direction(a,b)
    return ''.join(lines(polar(p,7,d+145),p,polar(p,7,d-145),color=BLUE)
                   for p in (polar((x,y),7*i,d) for i in range(count)))


def save(name, body):
    svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 224">\n'
           '<g stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" '
           f'fill="{INK}" font-family="system-ui,sans-serif" font-size="13" '
           'font-weight="600" text-anchor="middle" dominant-baseline="middle">\n'
           + body.replace('><','>\n<') + '\n</g>\n</svg>\n')
    (DEST / f'ex4-{name}.svg').write_text(svg,encoding='utf-8')


def round_figure(name, bearings, chains, offsets, marks=lambda p: '', centre=(160,112), radius=84):
    points = {key:polar(centre,radius,value) for key,value in bearings.items()}
    points['O'] = centre
    save(name,circle(centre,radius)+edges(points,*chains)+labels(points,offsets)+marks(points))


def exercise_41():
    for part, top, bottom, bend, positions in [
        ('i',140,150,(59,108),('A','C','T')),
        ('ii',48,24,(86,128),('B','D',''))
    ]:
        ray_angles = (180-top, bottom-180) if part=='i' else (top,-bottom)
        a = polar(bend,88,ray_angles[0])
        c = polar(bend,110,ray_angles[1])
        b,d = ((236,a[1]),(236,c[1])) if part=='i' else ((45,a[1]),(45,c[1]))
        save('1-q1-'+part,lines(b,a,bend,c,d)+arrows(a,b)+arrows(c,d)
             +text((a[0],a[1]-15),positions[0])+text((c[0],c[1]+15),positions[1])
             +text((b[0],b[1]-15),'B' if part=='i' else 'A')
             +text((d[0],d[1]+15),'D' if part=='i' else 'C')
             +text((bend[0]-17,bend[1]+15),positions[2])
             +angle(b,a,bend,f'{top}°',19,40)+angle(bend,c,d,f'{bottom}°',18,42)
             +angle(a,bend,c,'x°',21,39,part=='ii'))
    d=(207,167)
    a=polar(d,145,127)
    c=(63,167)
    e=polar(c,(d[0]-c[0])*sin(radians(53))/sin(radians(89)),38)
    b=(263,a[1])
    save('1-q1-iii',lines(b,a,e,d,c,e)+arrows(a,b)+arrows(c,d)
         +labels(dict(A=a,B=b,C=c,D=d,E=e),dict(A=(-4,-13),B=(3,-13),C=(-12,9),D=(10,10),E=(15,-5)))
         +angle(b,a,d,'53°',17,40)+angle(d,c,e,'38°',17,42)+angle(c,e,d,'x°',19,39))

    p=dict(A=(31,62),B=(67,130),C=(151,130),P=(207,119),Q=(243,51),R=(159,51))
    save('1-q3-i',edges(p,'ABCA','PQRP')+labels(p,dict(A=(-7,-12),B=(-6,15),C=(10,14),P=(7,15),Q=(6,-14),R=(-7,-14)))
         +ticks(p['A'],p['B'])+ticks(p['P'],p['Q'])+ticks(p['B'],p['C'],2)+ticks(p['Q'],p['R'],2))
    p=dict(A=(70,172),B=(250,172),C=(250,52),D=(70,52))
    save('1-q3-ii',edges(p,'ABCDA','DB')+labels(p,dict(A=(-11,14),B=(11,14),C=(11,-14),D=(-11,-14)))
         +ticks(p['A'],p['D'])+ticks(p['B'],p['C'])+ticks(p['A'],p['B'],2)+ticks(p['D'],p['C'],2))
    p=dict(Y=(68,41),P=(68,110),Z=(68,179),X=(252,110))
    save('1-q3-iii',edges(p,'YPZXY','PX')+labels(p,dict(Y=(-13,0),P=(-13,0),Z=(-13,0),X=(14,0)))
         +ticks(p['Y'],p['P'],2)+ticks(p['Z'],p['P'],2)+ticks(p['Y'],p['X'])+ticks(p['Z'],p['X']))
    for part in ('iv','v'):
        p=dict(A=(69,50),B=(54,149),O=(160,112),C=(251,174),D=(266,75))
        if part=='v':
            p.update(A=(61,66),C=(259,158),B=(61,166),D=(259,58))
        marks = ticks(p['A'],p['O'])+ticks(p['O'],p['C'])
        if part=='iv':
            marks += angle(p['A'],p['B'],p['O'],'')+angle(p['C'],p['D'],p['O'],'')
        else:
            marks += ticks(p['B'],p['O'],2)+ticks(p['O'],p['D'],2)
        save('1-q3-'+part,edges(p,'AOC','BOD','AB','CD')+marks
             +labels(p,dict(A=(-8,-13),B=(-9,13),O=(1,-13),C=(9,13),D=(8,-13))))
    p=dict(A=(160,38),B=(60,173),C=(260,173),M=(160,173))
    save('1-q3-vi',edges(p,'ABCA','AM')+ticks(p['A'],p['B'])+ticks(p['A'],p['C'])
         +right(p['M'],p['B'],p['A'])+labels(p,dict(A=(0,-14),B=(-12,9),C=(12,9),M=(0,16))))
    b=(42,165)
    c=(244,165)
    a=polar(b,202*sin(radians(15))/sin(radians(80)),85)
    d=(288,165)
    save('1-q5',lines(a,b,c,a)+lines(c,d)+text((a[0]-9,a[1]-13),'A')+text((32,177),'B')
         +text((242,180),'C')+text((290,179),'D')+angle(b,a,c,'',17)+text((93,109),'(x+35)°')
         +angle(c,b,a,'',18)+text((75,151),'(2x−5)°')+angle(a,c,d,'(4x−15)°',20,53))


def exercise_42():
    top,bottom = 45,177
    run = (bottom-top) * cos(radians(75))/sin(radians(75))
    e,f = ((25,top),(297,top)),((25,bottom),(297,bottom))
    d,c = ((82,top),(82-run,bottom)),((173,top),(173-run,bottom))
    b,a = ((173-run,top),(173,bottom)),((240,top),(240+run,bottom))
    for part in ('i','ii','iii','iv'):
        body = ''.join(lines(*segment) for segment in (a,b,c,d,e,f))
        for segment,label,offset in [(a,'a',(14,1)),(b,'b',(17,18)),(c,'c',(13,-19)),(d,'d',(-13,0)),(e,'e',(-55,-13)),(f,'f',(-55,13))]:
            body += text(tuple((segment[0][i]+segment[1][i])/2+offset[i] for i in (0,1)),label)
        cross=((b[0][0]+b[1][0])/2,(top+bottom)/2)
        body += angle(e[0],c[0],c[1],'75°',12,25)+angle(b[1],cross,c[1],'30°',21,43)
        targets = [(b[0],cross,c[0]),(d[1],d[0],e[1]),(f[1],d[1],d[0]),(f[0],c[1],c[0])]
        body += angle(*targets[['i','ii','iii','iv'].index(part)],'x°',18,24 if part=='i' else 35)
        save('2-q7-'+part,body)

    b,c=(65,184),(245,184)
    a=polar(b,100/cos(radians(58)),58)
    o=polar(b,100/cos(radians(29)),29)
    p=dict(A=a,B=b,C=c,O=o)
    save('2-q8',edges(p,'ABCA','BOC')+labels(p,dict(A=(0,-12),B=(-12,12),C=(12,12),O=(0,-14)))
         +angle(b,a,c,'64°',14,31)+angle(c,b,a,'58°',29,56)
         +angle(b,o,c,'x°',15,31)+angle(a,c,o,'y°',32,67))

    s=22
    a,b,c=(58,47),(102,47),(234,47)
    ae_x=(6**2+8**2-7**2)/(2*8)
    bf_x=(8**2+6**2-7**2)/(2*6)
    e=(a[0]+s*ae_x,a[1]+s*sqrt(36-ae_x**2))
    f=(b[0]+s*bf_x,b[1]+s*sqrt(64-bf_x**2))
    u=((b[0]-c[0])* (f[1]-b[1]))/((e[0]-c[0])*(f[1]-b[1])-(f[0]-b[0])*(e[1]-c[1]))
    dpt=(c[0]+u*(e[0]-c[0]),c[1]+u*(e[1]-c[1]))
    p=dict(A=a,B=b,C=c,D=dpt,E=e,F=f)
    save('2-q9',edges(p,'ABCEA','BFC')+labels(p,dict(A=(-9,-13),B=(0,-13),C=(10,-13),D=(-13,0),E=(-10,12),F=(7,12))))

    p=dict(A=(65,35),B=(255,35),C=(255,187),D=(65,187),E=(141,35),F=(255,130),G=(179,187),H=(65,92))
    m=(65+3*19,92-2.25*19)
    n=(m[0]+.6*7.6*19,m[1]+.8*7.6*19)
    save('2-q10',edges(p,'ABCDA','EFGHE')+lines(m,n,color=ACCENT)
         +right(m,p['H'],n,7)+right(n,p['F'],m,7)
         +labels(p,dict(A=(-12,-9),B=(12,-9),C=(12,9),D=(-12,9),E=(0,-13),F=(13,0),G=(0,13),H=(-12,0)))
         +''.join(text(pt,val) for pt,val in [((103,22),'4'),((201,22),'6'),((270,83),'5'),((270,158),'3'),
            ((218,201),'4'),((123,201),'6'),((49,144),'5'),((49,65),'3'),((m[0]+48,m[1]+50),'d')]))

    p=dict(Q=(24,176),A=(108,176),B=(192,176),P=(276,176),D=(128,42),C=(212,42),
           M=(118,109),N=(202,109),O=(165,75.5))
    save('2-q11',edges(p,'QABP','ABCDA','DNP','CMQ')
         +ticks(p['A'],p['M'])+ticks(p['M'],p['D'])+ticks(p['B'],p['N'])+ticks(p['N'],p['C'])
         +arrows(p['D'],p['C'])+arrows(p['A'],p['B'])
         +labels(p,dict(Q=(-5,15),A=(0,15),B=(0,15),P=(6,15),D=(-6,-13),C=(6,-13),M=(-13,0),N=(13,0),O=(0,-15))))


def exercise_43():
    round_figure('3-q3',dict(A=180,B=0,C=90,D=270),('AOB','COD','AC'),
        dict(A=(-13,0),B=(13,0),C=(0,-14),D=(0,14),O=(12,14)),lambda p:right(p['O'],p['A'],p['C']))
    round_figure('3-q7-i',dict(A=100,B=225,C=315),('BAC','BOC'),
        dict(A=(0,-12),B=(-12,7),C=(12,7),O=(0,-14)),lambda p:
        lines(p['O'],polar(p['O'],68,255))+angle(p['B'],p['O'],polar(p['O'],68,255),'30°',17,45)
        +angle(polar(p['O'],68,255),p['O'],p['C'],'60°',17,47)+angle(p['B'],p['A'],p['C'],'x°',20,45))
    round_figure('3-q7-ii',dict(P=45,Q=205,R=285),('PQRP','QOR'),
        dict(P=(10,-9),Q=(-13,7),R=(8,13),O=(1,-13)),lambda p:
        angle(p['Q'],p['O'],p['R'],'80°',17,39)+angle(p['O'],p['R'],p['P'],'30°',17,45)
        +angle(p['P'],p['Q'],p['O'],'',26)+text((64,114),'x°')+lines((76,119),(112,142),color=ACCENT))
    round_figure('3-q7-iii',dict(M=180,N=0,P=70),('MOP','ONP','MP'),
        dict(M=(-13,0),N=(13,0),P=(4,-14),O=(-5,15)),lambda p:
        angle(p['P'],p['O'],p['N'],'70°',15,40)+angle(p['O'],p['P'],p['N'],'x°',16,39))
    round_figure('3-q7-iv',dict(Y=150,X=90,Z=30),('YXZ','YOZ'),
        dict(Y=(-13,-7),X=(0,-14),Z=(14,-6),O=(0,14)),lambda p:
        angle(p['Y'],p['X'],p['Z'],'120°',15,31)+angle(p['Y'],p['O'],p['Z'],'x°',17,33))
    round_figure('3-q7-v',dict(B=180,A=40,C=300),('BAC','BOACO'),
        dict(B=(-13,1),A=(13,-8),C=(7,14),O=(-6,14)),lambda p:
        angle(p['B'],p['O'],p['A'],'140°',17,39)+angle(p['A'],p['O'],p['C'],'100°',17,32)
        +angle(p['B'],p['A'],p['C'],'x°',14,30))
    p=dict(O=(160,112))
    p['C']=polar(p['O'],84,76)
    p['D']=polar(p['O'],84,284)
    p['B']=polar(p['O'],84,26)
    p['A']=polar(p['O'],84,154)
    p['P']=(p['C'][0],p['A'][1])
    save('3-q8',circle(p['O'],84)+edges(p,'AB','CD','AC')+right(p['P'],p['C'],p['A'])
         +angle(p['C'],p['A'],p['B'],'25°',21,48)+labels(p,dict(O=(-2,12),A=(-12,0),B=(12,0),C=(4,-12),D=(4,13),P=(10,13))))


def crossing(a,b,c,d):
    ux,uy = b[0]-a[0],b[1]-a[1]
    vx,vy = d[0]-c[0],d[1]-c[1]
    t = ((c[0]-a[0])*vy-(c[1]-a[1])*vx)/(ux*vy-uy*vx)
    return a[0]+t*ux,a[1]+t*uy


def exercise_44():
    round_figure('4-q1',dict(A=180,B=0,C=60,D=120),('AOB','ADCBA','AC'),
        dict(A=(-13,0),B=(13,0),C=(12,-10),D=(-9,-12),O=(0,14)),lambda p:
        angle(p['A'],p['D'],p['C'],'120°',14,33)+angle(p['B'],p['A'],p['C'],'x°',24,48))
    for part in ('i','ii','iii'):
        round_figure('4-q2-'+part,dict(A=180,C=0,D=70,E=120,B=280),('AOC','AEDCBA','AD'),
            dict(A=(-13,0),C=(13,0),D=(10,-12),E=(-8,-12),B=(2,13),O=(0,13)),lambda p:
            angle(p['C'],p['A'],p['D'],'35°',19,48)+angle(p['B'],p['A'],p['C'],'40°',20,47)
            +angle(p['A'],p['D'],p['E'],'30°',20,47))
    round_figure('4-q3',dict(A=220,B=320,C=60,D=88),('ABCDA',),
        dict(A=(-13,7),B=(14,7),C=(14,-9),D=(-10,-12)),lambda p:
        angle(p['D'],p['A'],p['B'],'',14)+text((128,152),'(2y+4)°')
        +angle(p['A'],p['B'],p['C'],'',14)+text((191,128),'(6x−4)°')
        +angle(p['B'],p['C'],p['D'],'',14)+text((197,84),'(4y−4)°')
        +angle(p['C'],p['D'],p['A'],'',14)+text((146,58),'(7x+2)°'))
    for part in ('i','ii'):
        def mark(p):
            P=crossing(p['A'],p['C'],p['B'],p['D'])
            return (text((P[0]-12,P[1]-12),'P')+angle(p['C'],p['B'],p['D'],'40°',15,42)
                    +angle(p['C'],p['A'],p['B'],'60°',15,38))
        round_figure('4-q4-'+part,dict(A=230,B=350,C=110,D=190),('ABCDA','AC','BD'),
            dict(A=(-10,12),B=(12,7),C=(0,-12),D=(-13,-3)),mark)

    p=dict(O=(160,105),A=(92,54),B=(228,54),C=(109,173),D=(211,173),M=(160,54),L=(160,173))
    save('4-q5',circle(p['O'],85)+edges(p,'AB','CD')+lines(p['M'],p['L'],color=ACCENT,dash=True)
         +right(p['M'],p['A'],p['O'])+right(p['L'],p['C'],p['O'])+arrows(p['A'],p['B'])+arrows(p['D'],p['C'])
         +labels(p,dict(A=(-13,-4),B=(13,-4),C=(-13,5),D=(13,5),O=(-13,0),M=(13,-11),L=(14,-12)))
         +text((157,37),'8')+text((158,191),'6')+text((186,115),'7'))

    a,b,c,d,o=(58,136),(262,136),(160,68),(160,136),(160,178.5)
    save('4-q6',arc(o,110.5,direction(o,b),direction(o,a)-direction(o,b))+lines(a,b)+lines(c,d,dash=True)
         +right(d,a,c)+labels(dict(A=a,B=b,C=c,D=d),dict(A=(-13,3),B=(13,3),C=(0,-13),D=(0,16)))
         +text((172,107),'2')+text((160,181),'6')+lines((58,165),(262,165),color=BLUE)+lines((58,159),(58,171),color=BLUE)+lines((262,159),(262,171),color=BLUE))
    round_figure('4-q7',dict(A=210,B=275,C=330),('ABCA','AOC'),
        dict(A=(-13,4),B=(4,14),C=(13,5),O=(0,-13)),lambda p:angle(p['A'],p['B'],p['C'],'120°',13,34))

    o=(160,112)
    u,v=sqrt(11)*14,sqrt(20)*14
    p=dict(O=o,P=(160+u,112-v),A=(104,112-v),B=(216,112-v),C=(160+u,42),D=(160+u,182))
    save('4-q8',circle(o,84)+edges(p,'AB','CD')+right(p['P'],p['A'],p['C'])
         +labels(p,dict(O=(-11,11),P=(-14,14),A=(-13,-7),B=(13,-7),C=(3,-13),D=(6,14))))
    round_figure('4-q9',dict(P=230,Q=330,R=170),('PQRP','POQ'),
        dict(P=(-12,11),Q=(12,9),R=(-13,-6),O=(0,-13)),lambda p:
        angle(p['P'],p['O'],p['Q'],'100°',17,27)+angle(p['P'],p['Q'],p['R'],'30°',24,32))


def construction_bases():
    names = ['LMN','ABC','ABC','PQR','PQR','ABC','ABC','PQR']
    lengths = [7.5,4,6,5,7,6.5,6,4.5]
    more_names = ['ABC','PQR','ABC','QRP','ABC','ABC','ABC','ABC']
    more_lengths = [8,4.5,5,7,6.5,8,9,6]
    for section, vertices, bases in [(5,names,lengths),(6,more_names,more_lengths)]:
        for n,(v,length) in enumerate(zip(vertices,bases),start=1):
            a,b = (160-11*length,112),(160+11*length,112)
            save(f'{section}-q{n}',lines(a,b)+text((a[0]-12,112),v[0])+text((b[0]+12,112),v[1])
                 +text((160,93),str(length)))


def exercise_47():
    b,d=(51,112),(51+56*(1/sin(radians(54))*cos(radians(54))+1/sin(radians(21))*cos(radians(21))),112)
    a=polar(b,56/sin(radians(54)),54)
    c=(a[0],168)
    p=dict(A=a,B=b,C=c,D=d)
    save('7-q2',edges(p,'ABCDA')+ticks(a,b)+ticks(b,c)+ticks(a,d,2)+ticks(c,d,2)
         +angle(a,b,c,'108°',18,39)+angle(a,d,c,'42°',24,56)
         +labels(p,dict(A=(-3,-13),B=(-13,0),C=(-3,13),D=(13,0))))
    p=dict(A=(93,177),B=(227,177),C=(227,43),D=(93,43),O=(160,110))
    save('7-q3',edges(p,'ABCDA','AC','BD')+labels(p,dict(A=(-13,11),B=(13,11),C=(13,-11),D=(-13,-11),O=(0,17))))

    d=(51,173)
    a=polar(d,93,75)
    b=crossing(d,polar(d,150,35),a,polar(a,150,5))
    c=(b[0]+(d[1]-b[1])/sqrt(3),d[1])
    e=polar(c,48,35)
    p=dict(A=a,B=b,C=c,D=d,E=e)
    save('7-q4',edges(p,'ABCDA','DB','CE')+arrows(d,b)+arrows(c,e)
         +angle(d,a,b,'110°',14,36)+angle(a,b,d,'30°',23,60)
         +angle(a,d,c,'75°',29,52)+angle(d,c,b,'60°',16,39)+angle(b,c,e,'x°',15,42)
         +labels(p,dict(A=(-5,-12),B=(6,-12),C=(6,14),D=(-10,12),E=(11,-5))))

    body=''
    for left,names in [(35,'BCA'),(180,'EDF')]:
        b,a=(left,166),(left+100,166)
        c=polar(b,100*sin(radians(50))/sin(radians(60)),70)
        body += (lines(a,b,c,a)+ticks(b,c)+angle(a,b,c,'70°',13,28)+angle(c,a,b,'50°',13,33)
                 +angle(b,c,a,'60°',13,33)+text((b[0]-9,b[1]+13),names[0])
                 +text((c[0]-1,c[1]-12),names[1])+text((a[0]+7,a[1]+13),names[2]))
    save('7-q5',body)
    round_figure('7-q13',dict(A=218,B=298,C=72),('ACB','AOB'),dict(A=(-13,7),B=(9,12),C=(5,-13),O=(7,-12)),
        lambda p:angle(p['A'],p['C'],p['B'],'40°',18,40))
    p=dict(A=(75,112),B=(245,112),O=(160,112),E=(211,112),D=(211,44),C=(211,180))
    save('7-q15',circle(p['O'],85)+edges(p,'AB','CD')+ticks(p['D'],p['E'])+ticks(p['E'],p['C'])
         +labels(p,dict(A=(-13,0),B=(13,1),O=(0,-13),E=(-13,13),D=(6,-11),C=(6,12))))

    p,spt=(93,170),(93,54)
    def chord_endpoint(a,o,angle_deg):
        direction_vector = polar((0,0),1,angle_deg)
        distance = 2*sum((o[i]-a[i])*direction_vector[i] for i in (0,1))
        return polar(a,distance,angle_deg)
    o1,o2=(107,112),(145,112)
    r1,r2=hypot(o1[0]-p[0],58),hypot(o2[0]-p[0],58)
    q,t=chord_endpoint(p,o1,10),chord_endpoint(p,o2,10)
    r,v=chord_endpoint(spt,o1,-20),chord_endpoint(spt,o2,-20)
    pts=dict(P=p,Q=q,R=r,S=spt,T=t,V=v)
    save('7-q16',circle(o1,r1)+circle(o2,r2,ACCENT)+edges(pts,'PQTVRSP','QR')
         +angle(q,r,spt,'',11)+text((81,91),'100°')+lines((102,93),(r[0]-10,r[1]-2),color=ACCENT)
         +labels(pts,dict(P=(-10,14),Q=(0,16),R=(1,-13),S=(-10,-13),T=(13,1),V=(13,-1))))

    def extend(p):
        p['E']=polar(p['C'],51,direction(p['D'],p['C']))
        p['F']=polar(p['C'],56,direction(p['A'],p['B']))
        return (edges(p,'DCE','CF')+arrows(p['A'],p['B'])+arrows(p['C'],p['F'])
                +angle(p['A'],p['D'],p['C'],'80°',17,35)+angle(p['A'],p['B'],p['C'],'100°',15,37)
                +angle(p['E'],p['C'],p['F'],'20°',23,40)
                +labels(p,dict(A=(-13,6),B=(1,13),C=(5,-14),D=(-11,-12),E=(8,-13),F=(10,10),O=(0,0))))
    round_figure('7-q18',dict(A=220,B=270,C=20,D=150),('ABCDA',),{},extend,centre=(134,112),radius=80)
    p=dict(O=(160,104),P=(85,144),Q=(235,144),R=(160,144),S=(160,189))
    save('7-q20',circle(p['O'],85)+edges(p,'PQ','ORS','PO')+right(p['R'],p['O'],p['Q'])
         +labels(p,dict(O=(0,-13),P=(-13,5),Q=(13,5),R=(13,12),S=(0,13)))
         +text((118,111),'17')+text((202,167),'30'))


def preserved_figures():
    body=''
    for left,names in [(47,'BCA'),(196,'DEF')]:
        b,c=(left,168),(left+94,168)
        a=polar(b,94*sin(radians(70))/sin(radians(50)),60)
        body += (lines(a,b,c,a)+ticks(a,b)+angle(c,b,a,'60°',13,30)+angle(a,c,b,'70°',13,30)
                 +text((b[0]-10,b[1]+13),names[0])+text((c[0]+10,c[1]+13),names[1])
                 +text((a[0]+2,a[1]-13),names[2]))
    save('1-q4',body)

    w=144/sin(radians(46))*cos(radians(46))
    p=dict(A=(160-w/2,187),B=(160+w/2,187),C=(160+w/2,43),D=(160-w/2,43),O=(160,115))
    save('2-q3',edges(p,'ABCDA','AC','BD')+right(p['B'],p['A'],p['C'])
         +angle(p['B'],p['A'],p['O'],'46°',22,44)
         +angle(p['O'],p['B'],p['C'],'?',22,44)
         +labels(p,dict(A=(-11,12),B=(11,12),C=(11,-12),D=(-11,-12),O=(0,-15))))

    a,b,c,d,o=(160,43),(252,112),(160,181),(68,112),(160,112)
    save('2-q4',lines(a,b,c,d,a)+lines(a,c,dash=True)+lines(b,d,dash=True)+right(o,a,b)
         +''.join(ticks(u,v) for u,v in [(a,b),(b,c),(c,d),(d,a)])
         +text((174,144),'12')+text((111,126),'16')+text((218,63),'?'))

    for n,r,half_chord,dist in [(1,26,10,24),(2,17,15,8),(4,15,9,12)]:
        o=(160,105)
        scale=79/r
        a,b,m=(160-half_chord*scale,105+dist*scale),(160+half_chord*scale,105+dist*scale),(160,105+dist*scale)
        body=circle(o,79)+lines(a,b)+lines(o,m,dash=True)+right(m,a,o)+text((174,99),'O')
        if n==1:
            body+=lines((81,105),(239,105))+text((125,91),'52')+text((160,m[1]+15),'20')+text((172,(105+m[1])/2),'?')
        elif n==2:
            body+=lines(o,a)+text((160,m[1]+15),'30')+text((175,(105+m[1])/2),'8')+text((121,111),'?')
        else:
            body+=lines(o,a)+text((115,135),'15')+text((174,(105+m[1])/2),'12')+text((160,m[1]+15),'?')
        save(f'3-q{n}',body)

    first,second=(134,112),(198,112)
    a,b=(198,64),(198,160)
    save('3-q6',circle(first,80)+circle(second,48,ACCENT)+lines(a,b)+lines(first,second,dash=True)
         +lines(first,a)+right(second,first,a)+text((121,123),'O₁')+text((214,113),'O₂')
         +text((157,80),'5')+text((165,127),'4')+text((211,84),'3'))


if __name__ == '__main__':
    exercise_41()
    exercise_42()
    exercise_43()
    exercise_44()
    construction_bases()
    exercise_47()
    preserved_figures()
