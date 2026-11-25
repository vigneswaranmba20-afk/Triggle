# TRACE MathGuard V1.0 — Grade 10 Chapter 7 (Mensuration) Audit Report

- **Total audited items**: 71 (62 exercises + 9 concepts)
- **Overall status**: PASS=34, PARTIAL=14, FAIL=22, UNVERIFIABLE=1
- **Answer verification (independent SymPy)**: PASS=70, FAIL=0, UNVERIFIABLE=1
- **Intermediate-step verification**: PASS=31, PARTIAL=11, FAIL=21, UNVERIFIABLE=8
- **Tamil consistency validation**: PASS=50, PARTIAL=10, FAIL=1, MISSING=10

## Items Requiring Attention (Non-PASS Overall Status)

| ID | Type | Section | Overall | Answer | Steps | Tamil | Severity | Discrepancy |
|---|---|---|---|---|---|---|---|---|
| `c10-7-ex7-1-q1` | exercise | 7.1 | FAIL | PASS | FAIL | MISSING | major | Intermediate step equality failure: [{'stepIndex': 2, 'line': '220k^2=5500 => k=5', 'lhs': 'k=[-5, 5]', 'rhs': 'k=[5]'}] |
| `c10-7-ex7-1-q2` | exercise | 7.1 | FAIL | PASS | FAIL | MISSING | major | Intermediate step equality failure: [{'stepIndex': 3, 'line': '1540=2\\times\\dfrac{22}{7}\\times7h=44h', 'lhs': '1540', 'rhs': '44*h'}] |
| `c10-7-ex7-1-q3` | exercise | 7.1 | PARTIAL | PASS | PASS | MISSING | minor | Tamil prompt missing in student data module |
| `c10-7-ex7-1-q4` | exercise | 7.1 | FAIL | PASS | FAIL | MISSING | major | Intermediate step equality failure: [{'stepIndex': 0, 'line': 'PQ=\\sqrt{PR^2-QR^2}=\\sqrt{20^2-16^2}=12  cm', 'lhs': 'P*Q', 'rhs': 'sqrt(P**2*R**2 - Q**2*R**2)'}, {'stepIndex': 2, 'line': 'CSA _{QR}=\\pi r\\ell=\\pi(12)(20)=240\\pi  cm ^2', 'lhs': 'A*C*Q*R*S*_', 'rhs': 'pi*l*r'}] |
| `c10-7-ex7-1-q5` | exercise | 7.1 | PARTIAL | PASS | PASS | MISSING | minor | Tamil prompt missing in student data module |
| `c10-7-ex7-1-q6` | exercise | 7.1 | FAIL | PASS | FAIL | MISSING | major | Intermediate step equality failure: [{'stepIndex': 1, 'line': 'Area of one cap = \\pi rl = \\pi *5*13 = 65\\pi  cm^{2}', 'lhs': 'A*a**2*c*e**2*f*n*o**2*p*r', 'rhs': 'pi*l*r'}] |
| `c10-7-ex7-1-q7` | exercise | 7.1 | PARTIAL | PASS | PARTIAL | MISSING | minor | Tamil prompt missing in student data module; Unparsed step indices: [0, 3, 4] |
| `c10-7-ex7-1-q8` | exercise | 7.1 | FAIL | PASS | FAIL | MISSING | major | Intermediate step equality failure: [{'stepIndex': 1, 'line': 'New radius = r + (25/100)r = 1.25r', 'lhs': 'N*a*d*e*i*r*s*u*w', 'rhs': '5*r/4'}, {'stepIndex': 2, 'line': 'A_new = 4\\pi (1.25r)^{2} = 1.5625 A', 'lhs': '25*pi*r**2/4', 'rhs': '25*A/16'}, {'stepIndex': 3, 'line': 'Increase % = (1.5625 - 1)*100 = 56.25%', 'lhs': '225/4', 'rhs': '9/16'}] |
| `c10-7-ex7-1-q9` | exercise | 7.1 | PARTIAL | PASS | PASS | MISSING | minor | Tamil prompt missing in student data module |
| `c10-7-ex7-1-q10` | exercise | 7.1 | PARTIAL | PASS | PASS | MISSING | minor | Tamil prompt missing in student data module |
| `c10-7-ex7-2-q1` | exercise | 7.2 | FAIL | PASS | FAIL | PARTIAL | major | Intermediate step equality failure: [{'stepIndex': 3, 'line': '75\\pi  * H = \\pi  * 25 * 14 => H = 350/75 = 14/3 m = 4.67 m', 'lhs': '350*pi', 'rhs': 'H'}] |
| `c10-7-ex7-2-q3` | exercise | 7.2 | FAIL | PASS | FAIL | PASS | major | Intermediate step equality failure: [{'stepIndex': 0, 'line': '\\begin{aligned}2\\pi r=484 => 2\\times\\dfrac{22}{7}\\times r=484', 'lhs': 'r=[242/pi]', 'rhs': 'r=[77]'}] |
| `c10-7-ex7-2-q6` | exercise | 7.2 | FAIL | PASS | FAIL | PARTIAL | major | Intermediate step equality failure: [{'stepIndex': 1, 'line': '\\dfrac{V_1}{V_2}=\\dfrac{\\tfrac{1}{3}\\pi r^2 h_1}{\\tfrac{1}{3}\\pi r^2 h_2}=\\dfrac{h_1}{h_2}=\\dfrac{3600}{5040}', 'lhs': 'V_1/V_2', 'rhs': 'h_1/h_2'}] |
| `c10-7-ex7-2-q7` | exercise | 7.2 | FAIL | PASS | FAIL | PARTIAL | major | Intermediate step equality failure: [{'stepIndex': 1, 'line': '\\dfrac{V_1}{V_2}=\\dfrac{\\tfrac{4}{3}\\pi r_1^3}{\\tfrac{4}{3}\\pi r_2^3}=(\\dfrac{r_1}{r_2})^3', 'lhs': 'V_1/V_2', 'rhs': 'r_1**3/r_2**3'}] |
| `c10-7-ex7-2-q8` | exercise | 7.2 | FAIL | PASS | FAIL | PASS | major | Intermediate step equality failure: [{'stepIndex': 2, 'line': 'V_sphere / V_hemisphere = ((4/3)\\pi R^{3}) / ((2/3)\\pi r^{3}) = 2(R/r)^{3}', 'lhs': 'V_sphere/V_hemisphere', 'rhs': '2*R**3/r**3'}] |
| `c10-7-ex7-2-q9` | exercise | 7.2 | FAIL | PASS | FAIL | PARTIAL | major | Intermediate step equality failure: [{'stepIndex': 0, 'line': '\\begin{aligned}4\\pi R^2=576\\pi => R=12  cm \\end{aligned}', 'lhs': 'R=[-12, 12]', 'rhs': 'R=[12]'}, {'stepIndex': 1, 'line': '\\begin{aligned}4\\pi r^2=324\\pi => r=9  cm \\end{aligned}', 'lhs': 'r=[-9, 9]', 'rhs': 'r=[9]'}] |
| `c10-7-ex7-2-q10` | exercise | 7.2 | FAIL | PASS | FAIL | PASS | major | Intermediate step equality failure: [{'stepIndex': 2, 'line': 'V = 73216/7 = 10459.43 cm^{3} = 10.4594... L = 10.459 L', 'lhs': '1045943/100', 'rhs': '52297/5000'}] |
| `c10-7-ex7-3-q4` | exercise | 7.3 | FAIL | PASS | FAIL | PASS | major | Intermediate step equality failure: [{'stepIndex': 1, 'line': 'V_displaced = V_cone + V_hemisphere = (1/3)\\pi r^{2}h_cone + (2/3)\\pi r^{3}', 'lhs': 'V_cone + V_hemisphere', 'rhs': 'pi*h_cone*r**2/3 + 2*pi*r**3/3'}] |
| `c10-7-ex7-3-q5` | exercise | 7.3 | PARTIAL | PASS | PASS | PARTIAL | minor | Tamil consistency flags: ['en_ta_terminology_mismatch'] |
| `c10-7-ex7-3-q7-iii` | exercise | 7.3 | PARTIAL | PASS | PARTIAL | PASS | minor | Unparsed step indices: [1] |
| `c10-7-ex7-4-q2` | exercise | 7.4 | FAIL | PASS | FAIL | PASS | major | Intermediate step equality failure: [{'stepIndex': 2, 'line': 'Q = \\pi  * 0.07^{2} * 15000 = 231 m^{3}/h', 'lhs': '147*pi/2', 'rhs': '231/h'}, {'stepIndex': 3, 'line': 't = 462/231 = 2 h', 'lhs': '2', 'rhs': '2*h'}] |
| `c10-7-ex7-4-q7` | exercise | 7.4 | FAIL | PASS | FAIL | PASS | major | Intermediate step equality failure: [{'stepIndex': 2, 'line': 'r^2=16 => r=4', 'lhs': 'r=[-4, 4]', 'rhs': 'r=[4]'}] |
| `c10-7-ex7-5-q2` | exercise | 7.5 | PARTIAL | PASS | PASS | PARTIAL | minor | Tamil consistency flags: ['en_ta_terminology_mismatch'] |
| `c10-7-ex7-5-q4` | exercise | 7.5 | PARTIAL | PASS | PARTIAL | PASS | minor | Unparsed step indices: [1] |
| `c10-7-ex7-5-q5` | exercise | 7.5 | FAIL | PASS | UNVERIFIABLE | FAIL | major | English-Tamil consistency failure: ['en_ta_number_mismatch'] |
| `c10-7-ex7-5-q11` | exercise | 7.5 | UNVERIFIABLE | UNVERIFIABLE | PARTIAL | PASS | info | Shuttlecock shape recognition is qualitative/non-numerical and cannot be derived from stated quantities. |
| `c10-7-ex7-5-q12` | exercise | 7.5 | PARTIAL | PASS | PARTIAL | PASS | minor | Unparsed step indices: [1] |
| `c10-7-ex7-5-q13` | exercise | 7.5 | FAIL | PASS | FAIL | PASS | major | Intermediate step equality failure: [{'stepIndex': 1, 'line': 'V=\\dfrac43\\pi(1)^3=\\dfrac{4\\pi}{3}  cm ^3', 'lhs': '43/pi', 'rhs': '4*pi/3'}] |
| `c10-7-ex7-5-q14` | exercise | 7.5 | FAIL | PASS | FAIL | PASS | major | Intermediate step equality failure: [{'stepIndex': 0, 'line': 'h_1-h_2=h_1-\\dfrac{h_1}{2}=\\dfrac{h_1}{2}', 'lhs': 'h_1 - h_2', 'rhs': 'h_1/2'}] |
| `c10-7-ex7-5-q15` | exercise | 7.5 | FAIL | PASS | FAIL | PASS | major | Intermediate step equality failure: [{'stepIndex': 1, 'line': 'V_2=\\dfrac13\\pi r^2(2r)=\\dfrac23\\pi r^3', 'lhs': '26*r**3/pi', 'rhs': '23*r**3/pi'}] |
| `c10-7-unit-q1` | exercise | 7.unit | PARTIAL | PASS | PASS | PARTIAL | minor | Tamil consistency flags: ['en_ta_unit_mismatch'] |
| `c10-7-unit-q2` | exercise | 7.unit | FAIL | PASS | FAIL | PASS | major | Intermediate step equality failure: [{'stepIndex': 2, 'line': 't = 26.74 min = 27 min', 'lhs': '1337/50', 'rhs': '27'}] |
| `c10-7-unit-q3` | exercise | 7.unit | PARTIAL | PASS | UNVERIFIABLE | PARTIAL | minor | Tamil consistency flags: ['en_ta_terminology_mismatch'] |
| `c10-7-unit-q7` | exercise | 7.unit | PARTIAL | PASS | PASS | PARTIAL | minor | Tamil consistency flags: ['en_ta_terminology_mismatch'] |
| `c10-7-unit-q10` | exercise | 7.unit | FAIL | PASS | FAIL | PASS | major | Intermediate step equality failure: [{'stepIndex': 1, 'line': 'r=\\dfrac35(21)=12.6  cm \\end{aligned}', 'lhs': '5/3', 'rhs': '63/5'}] |
| `g10-ch7-volumes-sphere-hemisphere` | concept | 7.3.4–7.3.7 | PARTIAL | PASS | PARTIAL | PARTIAL | minor | Tamil editorial check flags: ['en_ta_terminology_mismatch'] |
| `g10-ch7-conversion-volume-conservation` | concept | 7.5 | FAIL | PASS | FAIL | PASS | major | Step=FAIL, Tamil=[] |

## Full Item-by-Item Ledger

| ID | Section | Method | Derived | Existing | Overall | Answer | Steps | Tamil |
|---|---|---|---|---|---|---|---|---|
| `c10-7-ex7-1-q1` | 7.1 | `sympy_solve_cylinder_csa_ratio` | 25, 35 | Radius = 25 cm; height = 35 cm. | FAIL | PASS | FAIL | MISSING |
| `c10-7-ex7-1-q2` | 7.1 | `sympy_solve_cylinder_tsa_csa` | 7, 35 | Radius = 7 cm; height = 35 cm. | FAIL | PASS | FAIL | MISSING |
| `c10-7-ex7-1-q3` | 7.1 | `hollow_cylinder_tsa` | 952*pi (≈ 2992.0000 with pi=22/7) | Total surface area = 2992 cm². | PARTIAL | PASS | PASS | MISSING |
| `c10-7-ex7-1-q4` | 7.1 | `cone_rotation_csa_ratio` | 240*pi : 320*pi (simplified ratio 3/4) | CSA_QR : CSA_PQ = 3 : 4 (CSA of the cone rotated about PQ is | FAIL | PASS | FAIL | MISSING |
| `c10-7-ex7-1-q5` | 7.1 | `cone_height_from_base_area_slant` | 3*sqrt(37) | Height of the tent ≈ 18.25 m. | PARTIAL | PASS | PASS | MISSING |
| `c10-7-ex7-1-q6` | 7.1 | `cone_csa_count_from_sheet` | 28 | 28 birthday caps. | FAIL | PASS | FAIL | MISSING |
| `c10-7-ex7-1-q7` | 7.1 | `cone_csa_ratio_symbolic` | sqrt(10) : 9*sqrt(2) (simplified ratio sqrt(5)/9) | Curved surface area ratio = √5 : 9. | PARTIAL | PASS | PARTIAL | MISSING |
| `c10-7-ex7-1-q8` | 7.1 | `sphere_sa_scaling_percentage` | 225/4 | The sphere's surface area increases by 56.25%. | FAIL | PASS | FAIL | MISSING |
| `c10-7-ex7-1-q9` | 7.1 | `hollow_hemisphere_tsa_painting_cost` | 2408*pi/25 (≈ 302.7200 with pi=22/7) | Total painting cost = ₹302.72. | PARTIAL | PASS | PASS | MISSING |
| `c10-7-ex7-1-q10` | 7.1 | `frustum_outer_plus_top_cost` | 432*pi (≈ 1357.7143 with pi=22/7) | Total cost = ₹1357.72 (using the textbook's intermediate-are | PARTIAL | PASS | PASS | MISSING |
| `c10-7-ex7-2-q1` | 7.2 | `well_embankment_volume_conservation` | 14/3 | Height of the embankment = 4.67 m. | FAIL | PASS | FAIL | PARTIAL |
| `c10-7-ex7-2-q2` | 7.2 | `water_displacement_cylinder` | 1 | Raise of the water in the glass = 1 cm. | PASS | PASS | PASS | PASS |
| `c10-7-ex7-2-q3` | 7.2 | `cone_volume_from_circumference` | 652190 | Volume of the conical wooden piece = 652190 cm³. | FAIL | PASS | FAIL | PASS |
| `c10-7-ex7-2-q4` | 7.2 | `cone_emptying_time` | 20*pi (≈ 62.8571 with pi=22/7) | 63 minutes (approx). | PASS | PASS | PASS | PASS |
| `c10-7-ex7-2-q5` | 7.2 | `right_triangle_cone_volumes_diff` | 32*pi (≈ 100.5714 with pi=22/7) | Difference in volumes = 100.58 cm³. | PASS | PASS | PASS | PASS |
| `c10-7-ex7-2-q6` | 7.2 | `cone_height_ratio_from_volumes` | 3600 : 5040 (simplified ratio 5/7) | Ratio of heights = 5 : 7. | FAIL | PASS | FAIL | PARTIAL |
| `c10-7-ex7-2-q7` | 7.2 | `sphere_volume_ratio_from_radii` | 64 : 343 (simplified ratio 64/343) | Ratio of their volumes = 64 : 343. | FAIL | PASS | FAIL | PARTIAL |
| `c10-7-ex7-2-q8` | 7.2 | `sphere_hemisphere_equal_tsa_volume_ratio` | 3*sqrt(3) : 4 (simplified ratio 3*sqrt(3)/4) | Ratio of their volumes = 3√3 : 4 (Proved). | FAIL | PASS | FAIL | PASS |
| `c10-7-ex7-2-q9` | 7.2 | `hollow_sphere_volume_from_areas` | 1332*pi (≈ 4186.2857 with pi=22/7) | Volume of the material required = 4186.29 cm³. | FAIL | PASS | FAIL | PARTIAL |
| `c10-7-ex7-2-q10` | 7.2 | `frustum_milk_cost` | 3328*pi/25 (≈ 418.3771 with pi=22/7) | Cost of milk = ₹418.36. | FAIL | PASS | FAIL | PASS |
| `c10-7-ex7-3-q1` | 7.3 | `hemisphere_plus_cylinder_volume` | 1568*pi/3 (≈ 1642.6667 with pi=22/7) | Capacity of the vessel ≈ 1642.67 cm³ (exact 4928/3 cm³). | PASS | PASS | PASS | PASS |
| `c10-7-ex7-3-q2` | 7.3 | `cylinder_plus_two_cones_volume` | 21*pi (≈ 66.0000 with pi=22/7) | Volume of the model = 66 cm³. | PASS | PASS | PASS | PASS |
| `c10-7-ex7-3-q3` | 7.3 | `cylinder_minus_cone_volume` | 98*pi/125 (≈ 2.4640 with pi=22/7) | 2.46 cm³ (2025 textbook key; 2 cm³ if rounded to the nearest | PASS | PASS | PASS | PASS |
| `c10-7-ex7-3-q4` | 7.3 | `cone_on_hemisphere_displacement` | 288*pi (≈ 905.1429 with pi=22/7) | Volume of water displaced ≈ 905.14 cm³ (exact 288π cm³). | FAIL | PASS | FAIL | PASS |
| `c10-7-ex7-3-q5` | 7.3 | `capsule_cylinder_plus_two_hemispheres` | 99*pi/4 (≈ 77.7857 with pi=22/7) | 77.78 mm³ of medicine (exact 1089/14 mm³). | PARTIAL | PASS | PASS | PARTIAL |
| `c10-7-ex7-3-q6` | 7.3 | `cube_surmounted_by_hemisphere_sa` | 49*pi/4 + 294 (≈ 332.5000 with pi=22/7) | Surface area of the solid = 332.5 cm². | PASS | PASS | PASS | PASS |
| `c10-7-ex7-3-q7-i` | 7.3 | `enclosed_sphere_sa` | 4*pi*r**2 | 4πr² sq. units. | PASS | PASS | UNVERIFIABLE | PASS |
| `c10-7-ex7-3-q7-ii` | 7.3 | `enclosing_cylinder_csa` | 4*pi*r**2 | 4πr² sq. units. | PASS | PASS | UNVERIFIABLE | PASS |
| `c10-7-ex7-3-q7-iii` | 7.3 | `sphere_vs_enclosing_cylinder_ratio` | 4*pi*r**2 : 4*pi*r**2 (simplified ratio 1) | 1 : 1. | PARTIAL | PASS | PARTIAL | PASS |
| `c10-7-ex7-4-q1` | 7.4 | `sphere_to_cylinder_volume_conservation` | 36 | 36 cm | PASS | PASS | PASS | PASS |
| `c10-7-ex7-4-q2` | 7.4 | `pipe_flow_tank_fill_time` | 2 | Approximately 2 hours (using π ≈ 22/7). | FAIL | PASS | FAIL | PASS |
| `c10-7-ex7-4-q3` | 7.4 | `cone_to_cylinder_symbolic_height` | h/(3*x**2) | h/(3x²) units | PASS | PASS | PASS | PASS |
| `c10-7-ex7-4-q4` | 7.4 | `cone_to_hollow_sphere_internal_diameter` | 6 | 6 cm | PASS | PASS | PASS | PASS |
| `c10-7-ex7-4-q5` | 7.4 | `sump_minus_overhead_tank_volume` | 3000000 - 378000*pi (≈ 1812000.0000 with pi=22/7) | Approximately 1,812,000 cm³ = 1,812 litres (using π ≈ 22/7). | PASS | PASS | PASS | PASS |
| `c10-7-ex7-4-q6` | 7.4 | `hollow_hemisphere_to_cylinder_height` | 4/3 | 4/3 cm ≈ 1.33 cm | PASS | PASS | PASS | PASS |
| `c10-7-ex7-4-q7` | 7.4 | `sphere_to_hollow_cylinder_thickness` | 1 | 1 cm | FAIL | PASS | FAIL | PASS |
| `c10-7-ex7-4-q8` | 7.4 | `hemisphere_to_cylinder_percentage` | 100 | 100% | PASS | PASS | UNVERIFIABLE | PASS |
| `c10-7-ex7-5-q1` | 7.5 | `mcq_cone_csa` | 136*pi (≈ 427.2566 with pi=exact) | (D) 136π cm² | PASS | PASS | PASS | PASS |
| `c10-7-ex7-5-q2` | 7.5 | `mcq_two_hemispheres_csa` | 4*pi*r**2 | (A) 4πr² sq. units | PARTIAL | PASS | PASS | PARTIAL |
| `c10-7-ex7-5-q3` | 7.5 | `mcq_cone_height` | 12 | (A) 12 cm | PASS | PASS | PASS | PASS |
| `c10-7-ex7-5-q4` | 7.5 | `mcq_cylinder_halved_radius_ratio` | pi*h*r**2/4 : pi*h*r**2 (simplified ratio 1/4) | (B) 1:4 | PARTIAL | PASS | PARTIAL | PASS |
| `c10-7-ex7-5-q5` | 7.5 | `mcq_cylinder_tsa_r_one_third_h` | 8*pi*h**2/9 | (C) 8πh²/9 sq.units | FAIL | PASS | UNVERIFIABLE | FAIL |
| `c10-7-ex7-5-q6` | 7.5 | `mcq_hollow_cylinder_volume` | 1120*pi (≈ 3518.5838 with pi=exact) | (B) 1120π cm³ | PASS | PASS | UNVERIFIABLE | PASS |
| `c10-7-ex7-5-q7` | 7.5 | `mcq_cone_scaling_factor` | 18 | (B) made 18 times | PASS | PASS | PASS | PASS |
| `c10-7-ex7-5-q8` | 7.5 | `mcq_hemisphere_tsa_over_r2` | 3*pi (≈ 9.4248 with pi=exact) | (C) 3π | PASS | PASS | PASS | PASS |
| `c10-7-ex7-5-q9` | 7.5 | `mcq_sphere_to_cone_height` | 4*x | (C) 4x cm | PASS | PASS | UNVERIFIABLE | PASS |
| `c10-7-ex7-5-q10` | 7.5 | `mcq_frustum_volume` | 3328*pi (≈ 10455.2204 with pi=exact) | (A) 3328π cm³ | PASS | PASS | UNVERIFIABLE | PASS |
| `c10-7-ex7-5-q11` | 7.5 | `qualitative_shape_recognition` | UNVERIFIABLE | (D) frustum of a cone and a hemisphere | UNVERIFIABLE | UNVERIFIABLE | PARTIAL | PASS |
| `c10-7-ex7-5-q12` | 7.5 | `mcq_sphere_8_balls_ratio` | 2 : 1 (simplified ratio 2) | (A) 2:1 | PARTIAL | PASS | PARTIAL | PASS |
| `c10-7-ex7-5-q13` | 7.5 | `mcq_greatest_sphere_in_cylinder` | 4*pi/3 (≈ 4.1888 with pi=exact) | (A) (4/3)π | FAIL | PASS | FAIL | PASS |
| `c10-7-ex7-5-q14` | 7.5 | `mcq_similar_cones_ratio` | 1 : 2 (simplified ratio 1/2) | (B) 1:2 | FAIL | PASS | FAIL | PASS |
| `c10-7-ex7-5-q15` | 7.5 | `mcq_cylinder_cone_sphere_volume_ratio` | 2*pi*r**3 : 2*pi*r**3/3 : 4*pi*r**3/3 | (D) 3:1:2 | FAIL | PASS | FAIL | PASS |
| `c10-7-unit-q1` | 7.unit | `fountain_pen_words` | 48000 | Approximately 48,000 words | PARTIAL | PASS | PASS | PARTIAL |
| `c10-7-unit-q2` | 7.unit | `hemisphere_tank_empty_time` | 1925/72 | Approximately 27 minutes | FAIL | PASS | FAIL | PASS |
| `c10-7-unit-q3` | 7.unit | `max_cone_in_hemisphere` | pi*r**3/3 | πr³/3 cubic units | PARTIAL | PASS | UNVERIFIABLE | PARTIAL |
| `c10-7-unit-q4` | 7.unit | `funnel_tin_area` | 249*pi (≈ 782.5714 with pi=22/7) | 249π cm² ≈ 782.57 cm² | PASS | PASS | PASS | PASS |
| `c10-7-unit-q5` | 7.unit | `coins_to_cylinder_count` | 450 | 450 coins | PASS | PASS | PASS | PASS |
| `c10-7-unit-q6` | 7.unit | `hollow_to_solid_cylinder_diameter` | 24/5 | 4.8 cm | PASS | PASS | PASS | PASS |
| `c10-7-unit-q7` | 7.unit | `frustum_csa_from_perimeters_cost` | 6800 | ₹6,800 | PARTIAL | PASS | PASS | PARTIAL |
| `c10-7-unit-q8` | 7.unit | `hollow_hemisphere_thickness` | 2 | 2 cm | PASS | PASS | PASS | PASS |
| `c10-7-unit-q9` | 7.unit | `cone_slant_from_vol_base_area` | 17 | Approximately 17 cm (π ≈ 22/7) | PASS | PASS | PASS | PASS |
| `c10-7-unit-q10` | 7.unit | `sector_to_cone_volume` | 111132*pi/125 (≈ 2794.1760 with pi=22/7) | Approximately 2794.18 cm³ | FAIL | PASS | FAIL | PASS |
| `g10-ch7-solids-and-units` | 7.1 | `concept_m3_to_litres` | 2500 | choice[0]: 2500 litres | PASS | PASS | PARTIAL | PASS |
| `g10-ch7-cylinder-surface-area` | 7.2.1–7.2.2 | `concept_hollow_cylinder_csa` | 160*pi (≈ 502.6548 with pi=exact) | choice[1]: 160π cm² | PASS | PASS | PASS | PASS |
| `g10-ch7-cone-slant-surface` | 7.2.3 | `concept_cone_csa` | 175*pi (≈ 550.0000 with pi=22/7) | choice[2]: 550 m² | PASS | PASS | PARTIAL | PASS |
| `g10-ch7-sphere-hemisphere-surface` | 7.2.4–7.2.6 | `concept_hollow_hemisphere_tsa` | 84*pi (≈ 263.8938 with pi=exact) | choice[0]: 84π m² | PASS | PASS | PARTIAL | PASS |
| `g10-ch7-frustum-surface-volume` | 7.2.7 & 7.3.8 | `concept_frustum_slant` | 5 | choice[1]: 5 cm | PASS | PASS | PARTIAL | PASS |
| `g10-ch7-volumes-cylinder-cone` | 7.3.1–7.3.3 | `concept_cone_double_radius_scaling` | 4 | choice[2]: 4 times | PASS | PASS | PARTIAL | PASS |
| `g10-ch7-volumes-sphere-hemisphere` | 7.3.4–7.3.7 | `concept_sphere_volume_ratio` | 8 : 27 (simplified ratio 8/27) | choice[0]: 8 : 27 | PARTIAL | PASS | PARTIAL | PARTIAL |
| `g10-ch7-combined-solids` | 7.4 | `concept_cube_minus_hemisphere_sa` | 6*a**2 + pi*r**2 | choice[1]: 6a² + πr² | PASS | PASS | PASS | PASS |
| `g10-ch7-conversion-volume-conservation` | 7.5 | `concept_sphere_recast_count` | 27 | choice[2]: 27 small spheres | FAIL | PASS | FAIL | PASS |
