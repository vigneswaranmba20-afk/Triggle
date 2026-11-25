# TRACE MathGuard V1.0 — Grade 10 Chapter 7 (Mensuration) Audit Report

- **Total audited items**: 71 (62 exercises + 9 concepts)
- **Overall status**: PASS=22, PARTIAL=40, FAIL=8, UNVERIFIABLE=1
- **Answer verification (independent SymPy)**: PASS=70, FAIL=0, UNVERIFIABLE=1
- **Intermediate-step verification**: PASS=27, PARTIAL=18, FAIL=7, UNVERIFIABLE=19
- **Tamil consistency validation**: PASS=50, PARTIAL=10, FAIL=1, MISSING=10

## Items Requiring Attention (Non-PASS Overall Status)

| ID | Type | Section | Overall | Answer | Steps | Tamil | Severity | Discrepancy |
|---|---|---|---|---|---|---|---|---|
| `c10-7-ex7-1-q1` | exercise | 7.1 | PARTIAL | PASS | PARTIAL | MISSING | minor | Tamil prompt missing in student data module (TRACE Tamil Validator); Unparsed step indices: [0] |
| `c10-7-ex7-1-q2` | exercise | 7.1 | PARTIAL | PASS | PARTIAL | MISSING | minor | Tamil prompt missing in student data module (TRACE Tamil Validator); Unparsed step indices: [1, 2] |
| `c10-7-ex7-1-q3` | exercise | 7.1 | PARTIAL | PASS | PARTIAL | MISSING | minor | Tamil prompt missing in student data module (TRACE Tamil Validator); Unparsed step indices: [0] |
| `c10-7-ex7-1-q4` | exercise | 7.1 | PARTIAL | PASS | PARTIAL | MISSING | minor | Tamil prompt missing in student data module (TRACE Tamil Validator); Unparsed step indices: [0, 1, 2, 3, 4] |
| `c10-7-ex7-1-q5` | exercise | 7.1 | PARTIAL | PASS | PARTIAL | MISSING | minor | Tamil prompt missing in student data module (TRACE Tamil Validator); Unparsed step indices: [1, 2] |
| `c10-7-ex7-1-q6` | exercise | 7.1 | PARTIAL | PASS | PARTIAL | MISSING | minor | Tamil prompt missing in student data module (TRACE Tamil Validator); Unparsed step indices: [1] |
| `c10-7-ex7-1-q7` | exercise | 7.1 | PARTIAL | PASS | UNVERIFIABLE | MISSING | minor | Tamil prompt missing in student data module (TRACE Tamil Validator); Intermediate steps have no verifiable equality chains |
| `c10-7-ex7-1-q8` | exercise | 7.1 | PARTIAL | PASS | PARTIAL | MISSING | minor | Tamil prompt missing in student data module (TRACE Tamil Validator); Unparsed step indices: [3] |
| `c10-7-ex7-1-q9` | exercise | 7.1 | PARTIAL | PASS | PASS | MISSING | minor | Tamil prompt missing in student data module (TRACE Tamil Validator) |
| `c10-7-ex7-1-q10` | exercise | 7.1 | PARTIAL | PASS | PARTIAL | MISSING | minor | Tamil prompt missing in student data module (TRACE Tamil Validator); Unparsed step indices: [0] |
| `c10-7-ex7-2-q1` | exercise | 7.2 | PARTIAL | PASS | PASS | PARTIAL | minor | Tamil consistency flags (TRACE Tamil Validator): ['en_ta_terminology_mismatch'] |
| `c10-7-ex7-2-q2` | exercise | 7.2 | PARTIAL | PASS | PARTIAL | PASS | minor | Unparsed step indices: [0] |
| `c10-7-ex7-2-q5` | exercise | 7.2 | PARTIAL | PASS | PARTIAL | PASS | minor | Unparsed step indices: [3] |
| `c10-7-ex7-2-q6` | exercise | 7.2 | FAIL | PASS | FAIL | PARTIAL | major | Intermediate step equality failure: [{'stepIndex': 1, 'line': '\\dfrac{V_1}{V_2}=\\dfrac{\\tfrac{1}{3}\\pi r^2 h_1}{\\tfrac{1}{3}\\pi r^2 h_2}=\\dfrac{h_1}{h_2}=\\dfrac{3600}{5040}', 'lhs': 'V_1/V_2', 'rhs': 'h_1/h_2'}] |
| `c10-7-ex7-2-q7` | exercise | 7.2 | FAIL | PASS | FAIL | PARTIAL | major | Intermediate step equality failure: [{'stepIndex': 1, 'line': '\\dfrac{V_1}{V_2}=\\dfrac{\\tfrac{4}{3}\\pi r_1^3}{\\tfrac{4}{3}\\pi r_2^3}=(\\dfrac{r_1}{r_2})^3', 'lhs': 'V_1/V_2', 'rhs': 'r_1**3/r_2**3'}] |
| `c10-7-ex7-2-q8` | exercise | 7.2 | FAIL | PASS | FAIL | PASS | major | Intermediate step equality failure: [{'stepIndex': 2, 'line': 'V_sphere / V_hemisphere = ((4/3)\\pi R^{3}) / ((2/3)\\pi r^{3}) = 2(R/r)^{3}', 'lhs': 'V_sphere/V_hemisphere', 'rhs': '2*R**3/r**3'}] |
| `c10-7-ex7-2-q9` | exercise | 7.2 | PARTIAL | PASS | PARTIAL | PARTIAL | minor | Tamil consistency flags (TRACE Tamil Validator): ['en_ta_terminology_mismatch']; Unparsed step indices: [0, 1] |
| `c10-7-ex7-2-q10` | exercise | 7.2 | PARTIAL | PASS | PARTIAL | PASS | minor | Unparsed step indices: [0, 3] |
| `c10-7-ex7-3-q2` | exercise | 7.3 | PARTIAL | PASS | PARTIAL | PASS | minor | Unparsed step indices: [0] |
| `c10-7-ex7-3-q4` | exercise | 7.3 | FAIL | PASS | FAIL | PASS | major | Intermediate step equality failure: [{'stepIndex': 1, 'line': 'V_displaced = V_cone + V_hemisphere = (1/3)\\pi r^{2}h_cone + (2/3)\\pi r^{3}', 'lhs': 'V_cone + V_hemisphere', 'rhs': 'pi*h_cone*r**2/3 + 2*pi*r**3/3'}] |
| `c10-7-ex7-3-q5` | exercise | 7.3 | PARTIAL | PASS | PASS | PARTIAL | minor | Tamil consistency flags (TRACE Tamil Validator): ['en_ta_terminology_mismatch'] |
| `c10-7-ex7-3-q7-i` | exercise | 7.3 | PARTIAL | PASS | UNVERIFIABLE | PASS | minor | Intermediate steps have no verifiable equality chains |
| `c10-7-ex7-3-q7-ii` | exercise | 7.3 | PARTIAL | PASS | UNVERIFIABLE | PASS | minor | Intermediate steps have no verifiable equality chains |
| `c10-7-ex7-3-q7-iii` | exercise | 7.3 | PARTIAL | PASS | UNVERIFIABLE | PASS | minor | Intermediate steps have no verifiable equality chains |
| `c10-7-ex7-4-q8` | exercise | 7.4 | PARTIAL | PASS | UNVERIFIABLE | PASS | minor | Intermediate steps have no verifiable equality chains |
| `c10-7-ex7-5-q2` | exercise | 7.5 | PARTIAL | PASS | PASS | PARTIAL | minor | Tamil consistency flags (TRACE Tamil Validator): ['en_ta_terminology_mismatch'] |
| `c10-7-ex7-5-q4` | exercise | 7.5 | PARTIAL | PASS | UNVERIFIABLE | PASS | minor | Intermediate steps have no verifiable equality chains |
| `c10-7-ex7-5-q5` | exercise | 7.5 | FAIL | PASS | UNVERIFIABLE | FAIL | major | English-Tamil consistency failure (recorded for TRACE Tamil Validator): ['en_ta_number_mismatch'] |
| `c10-7-ex7-5-q6` | exercise | 7.5 | PARTIAL | PASS | UNVERIFIABLE | PASS | minor | Intermediate steps have no verifiable equality chains |
| `c10-7-ex7-5-q9` | exercise | 7.5 | PARTIAL | PASS | UNVERIFIABLE | PASS | minor | Intermediate steps have no verifiable equality chains |
| `c10-7-ex7-5-q10` | exercise | 7.5 | PARTIAL | PASS | UNVERIFIABLE | PASS | minor | Intermediate steps have no verifiable equality chains |
| `c10-7-ex7-5-q11` | exercise | 7.5 | UNVERIFIABLE | UNVERIFIABLE | UNVERIFIABLE | PASS | info | Shuttlecock shape recognition is qualitative/non-numerical and cannot be derived from stated quantities. |
| `c10-7-ex7-5-q12` | exercise | 7.5 | PARTIAL | PASS | UNVERIFIABLE | PASS | minor | Intermediate steps have no verifiable equality chains |
| `c10-7-ex7-5-q14` | exercise | 7.5 | FAIL | PASS | FAIL | PASS | major | Intermediate step equality failure: [{'stepIndex': 0, 'line': 'h_1-h_2=h_1-\\dfrac{h_1}{2}=\\dfrac{h_1}{2}', 'lhs': 'h_1 - h_2', 'rhs': 'h_1/2'}, {'stepIndex': 1, 'line': '\\dfrac{r_2}{r_1}=\\dfrac{h_1-h_2}{h_1}=\\dfrac{1}{2}', 'lhs': 'r_2/r_1', 'rhs': '(h_1 - h_2)/h_1'}] |
| `c10-7-ex7-5-q15` | exercise | 7.5 | PARTIAL | PASS | PARTIAL | PASS | minor | Unparsed step indices: [2] |
| `c10-7-unit-q1` | exercise | 7.unit | PARTIAL | PASS | PASS | PARTIAL | minor | Tamil consistency flags (TRACE Tamil Validator): ['en_ta_unit_mismatch'] |
| `c10-7-unit-q3` | exercise | 7.unit | PARTIAL | PASS | UNVERIFIABLE | PARTIAL | minor | Tamil consistency flags (TRACE Tamil Validator): ['en_ta_terminology_mismatch']; Intermediate steps have no verifiable equality chains |
| `c10-7-unit-q6` | exercise | 7.unit | PARTIAL | PASS | PARTIAL | PASS | minor | Unparsed step indices: [1] |
| `c10-7-unit-q7` | exercise | 7.unit | PARTIAL | PASS | PARTIAL | PARTIAL | minor | Tamil consistency flags (TRACE Tamil Validator): ['en_ta_terminology_mismatch']; Unparsed step indices: [0] |
| `c10-7-unit-q9` | exercise | 7.unit | PARTIAL | PASS | PARTIAL | PASS | minor | Unparsed step indices: [3] |
| `c10-7-unit-q10` | exercise | 7.unit | PARTIAL | PASS | PARTIAL | PASS | minor | Unparsed step indices: [0] |
| `g10-ch7-solids-and-units` | concept | 7.1 | PARTIAL | PASS | UNVERIFIABLE | PASS | minor | Proof step status=UNVERIFIABLE (unverified=[0, 1]) |
| `g10-ch7-cone-slant-surface` | concept | 7.2.3 | PARTIAL | PASS | UNVERIFIABLE | PASS | minor | Proof step status=UNVERIFIABLE (unverified=[0, 1]) |
| `g10-ch7-sphere-hemisphere-surface` | concept | 7.2.4–7.2.6 | PARTIAL | PASS | UNVERIFIABLE | PASS | minor | Proof step status=UNVERIFIABLE (unverified=[0]) |
| `g10-ch7-frustum-surface-volume` | concept | 7.2.7 & 7.3.8 | PARTIAL | PASS | UNVERIFIABLE | PASS | minor | Proof step status=UNVERIFIABLE (unverified=[0]) |
| `g10-ch7-volumes-cylinder-cone` | concept | 7.3.1–7.3.3 | PARTIAL | PASS | UNVERIFIABLE | PASS | minor | Proof step status=UNVERIFIABLE (unverified=[0, 1]) |
| `g10-ch7-volumes-sphere-hemisphere` | concept | 7.3.4–7.3.7 | PARTIAL | PASS | UNVERIFIABLE | PARTIAL | minor | Tamil editorial check flags (TRACE Tamil Validator): ['en_ta_terminology_mismatch']; Proof step status=UNVERIFIABLE (unverified=[0, 1]) |
| `g10-ch7-combined-solids` | concept | 7.4 | FAIL | PASS | FAIL | PASS | major | Step=FAIL ([{'stepIndex': 1, 'line': 'V=\\pi r^2 h-\\dfrac{1}{3}\\pi r^2 =\\dfrac{2}{3}\\pi r^2 h\\end{aligned}', 'lhs': 'pi*h*r**2 - pi*r**2/3', 'rhs': '2*pi*h*r**2/3'}]), Tamil=[] |
| `g10-ch7-conversion-volume-conservation` | concept | 7.5 | FAIL | PASS | FAIL | PASS | major | Step=FAIL ([{'stepIndex': 0, 'line': '\\begin{aligned}\\dfrac{4}{3}\\pi R^3=\\pi r^2 H\\  H=\\dfrac{4R^3}{3r^2}\\end{aligned}', 'lhs': '4*pi*R**3/3', 'rhs': 'pi*H**2*r**2'}, {'stepIndex': 0, 'line': '\\begin{aligned}\\dfrac{4}{3}\\pi R^3=\\pi r^2 H\\  H=\\dfrac{4R^3}{3r^2}\\end{aligned}', 'lhs': 'pi*H**2*r**2', 'rhs': '4*R**3/(3*r**2)'}]), Tamil=[] |

## Full Item-by-Item Ledger

| ID | Section | Method | Derived | Existing | Overall | Answer | Steps | Tamil |
|---|---|---|---|---|---|---|---|---|
| `c10-7-ex7-1-q1` | 7.1 | `sympy_solve_cylinder_csa_ratio` | 25, 35 | Radius = 25 cm; height = 35 cm. | PARTIAL | PASS | PARTIAL | MISSING |
| `c10-7-ex7-1-q2` | 7.1 | `sympy_solve_cylinder_tsa_csa` | 7, 35 | Radius = 7 cm; height = 35 cm. | PARTIAL | PASS | PARTIAL | MISSING |
| `c10-7-ex7-1-q3` | 7.1 | `hollow_cylinder_tsa` | 952*pi (≈ 2992.0000 with pi=22/7) | Total surface area = 2992 cm². | PARTIAL | PASS | PARTIAL | MISSING |
| `c10-7-ex7-1-q4` | 7.1 | `cone_rotation_csa_ratio` | 240*pi : 320*pi (simplified ratio 3/4) | CSA_QR : CSA_PQ = 3 : 4 (CSA of the cone rotated about PQ is | PARTIAL | PASS | PARTIAL | MISSING |
| `c10-7-ex7-1-q5` | 7.1 | `cone_height_from_base_area_slant` | 3*sqrt(37) | Height of the tent ≈ 18.25 m. | PARTIAL | PASS | PARTIAL | MISSING |
| `c10-7-ex7-1-q6` | 7.1 | `cone_csa_count_from_sheet` | 28 | 28 birthday caps. | PARTIAL | PASS | PARTIAL | MISSING |
| `c10-7-ex7-1-q7` | 7.1 | `cone_csa_ratio_symbolic` | sqrt(10) : 9*sqrt(2) (simplified ratio sqrt(5)/9) | Curved surface area ratio = √5 : 9. | PARTIAL | PASS | UNVERIFIABLE | MISSING |
| `c10-7-ex7-1-q8` | 7.1 | `sphere_sa_scaling_percentage` | 225/4 | The sphere's surface area increases by 56.25%. | PARTIAL | PASS | PARTIAL | MISSING |
| `c10-7-ex7-1-q9` | 7.1 | `hollow_hemisphere_tsa_painting_cost` | 2408*pi/25 (≈ 302.7200 with pi=22/7) | Total painting cost = ₹302.72. | PARTIAL | PASS | PASS | MISSING |
| `c10-7-ex7-1-q10` | 7.1 | `frustum_outer_plus_top_cost` | 432*pi (≈ 1357.7143 with pi=22/7) | Total cost = ₹1357.72 (using the textbook's intermediate-are | PARTIAL | PASS | PARTIAL | MISSING |
| `c10-7-ex7-2-q1` | 7.2 | `well_embankment_volume_conservation` | 14/3 | Height of the embankment = 4.67 m. | PARTIAL | PASS | PASS | PARTIAL |
| `c10-7-ex7-2-q2` | 7.2 | `water_displacement_cylinder` | 1 | Raise of the water in the glass = 1 cm. | PARTIAL | PASS | PARTIAL | PASS |
| `c10-7-ex7-2-q3` | 7.2 | `cone_volume_from_circumference` | 652190 | Volume of the conical wooden piece = 652190 cm³. | PASS | PASS | PASS | PASS |
| `c10-7-ex7-2-q4` | 7.2 | `cone_emptying_time` | 20*pi (≈ 62.8571 with pi=22/7) | 63 minutes (approx). | PASS | PASS | PASS | PASS |
| `c10-7-ex7-2-q5` | 7.2 | `right_triangle_cone_volumes_diff` | 32*pi (≈ 100.5714 with pi=22/7) | Difference in volumes = 100.58 cm³. | PARTIAL | PASS | PARTIAL | PASS |
| `c10-7-ex7-2-q6` | 7.2 | `cone_height_ratio_from_volumes` | 3600 : 5040 (simplified ratio 5/7) | Ratio of heights = 5 : 7. | FAIL | PASS | FAIL | PARTIAL |
| `c10-7-ex7-2-q7` | 7.2 | `sphere_volume_ratio_from_radii` | 64 : 343 (simplified ratio 64/343) | Ratio of their volumes = 64 : 343. | FAIL | PASS | FAIL | PARTIAL |
| `c10-7-ex7-2-q8` | 7.2 | `sphere_hemisphere_equal_tsa_volume_ratio` | 3*sqrt(3) : 4 (simplified ratio 3*sqrt(3)/4) | Ratio of their volumes = 3√3 : 4 (Proved). | FAIL | PASS | FAIL | PASS |
| `c10-7-ex7-2-q9` | 7.2 | `hollow_sphere_volume_from_areas` | 1332*pi (≈ 4186.2857 with pi=22/7) | Volume of the material required = 4186.29 cm³. | PARTIAL | PASS | PARTIAL | PARTIAL |
| `c10-7-ex7-2-q10` | 7.2 | `frustum_milk_cost` | 3328*pi/25 (≈ 418.3771 with pi=22/7) | Cost of milk = ₹418.36. | PARTIAL | PASS | PARTIAL | PASS |
| `c10-7-ex7-3-q1` | 7.3 | `hemisphere_plus_cylinder_volume` | 1568*pi/3 (≈ 1642.6667 with pi=22/7) | Capacity of the vessel ≈ 1642.67 cm³ (exact 4928/3 cm³). | PASS | PASS | PASS | PASS |
| `c10-7-ex7-3-q2` | 7.3 | `cylinder_plus_two_cones_volume` | 21*pi (≈ 66.0000 with pi=22/7) | Volume of the model = 66 cm³. | PARTIAL | PASS | PARTIAL | PASS |
| `c10-7-ex7-3-q3` | 7.3 | `cylinder_minus_cone_volume` | 98*pi/125 (≈ 2.4640 with pi=22/7) | 2.46 cm³ (2025 textbook key; 2 cm³ if rounded to the nearest | PASS | PASS | PASS | PASS |
| `c10-7-ex7-3-q4` | 7.3 | `cone_on_hemisphere_displacement` | 288*pi (≈ 905.1429 with pi=22/7) | Volume of water displaced ≈ 905.14 cm³ (exact 288π cm³). | FAIL | PASS | FAIL | PASS |
| `c10-7-ex7-3-q5` | 7.3 | `capsule_cylinder_plus_two_hemispheres` | 99*pi/4 (≈ 77.7857 with pi=22/7) | 77.78 mm³ of medicine (exact 1089/14 mm³). | PARTIAL | PASS | PASS | PARTIAL |
| `c10-7-ex7-3-q6` | 7.3 | `cube_surmounted_by_hemisphere_sa` | 49*pi/4 + 294 (≈ 332.5000 with pi=22/7) | Surface area of the solid = 332.5 cm². | PASS | PASS | PASS | PASS |
| `c10-7-ex7-3-q7-i` | 7.3 | `enclosed_sphere_sa` | 4*pi*r**2 | 4πr² sq. units. | PARTIAL | PASS | UNVERIFIABLE | PASS |
| `c10-7-ex7-3-q7-ii` | 7.3 | `enclosing_cylinder_csa` | 4*pi*r**2 | 4πr² sq. units. | PARTIAL | PASS | UNVERIFIABLE | PASS |
| `c10-7-ex7-3-q7-iii` | 7.3 | `sphere_vs_enclosing_cylinder_ratio` | 4*pi*r**2 : 4*pi*r**2 (simplified ratio 1) | 1 : 1. | PARTIAL | PASS | UNVERIFIABLE | PASS |
| `c10-7-ex7-4-q1` | 7.4 | `sphere_to_cylinder_volume_conservation` | 36 | 36 cm | PASS | PASS | PASS | PASS |
| `c10-7-ex7-4-q2` | 7.4 | `pipe_flow_tank_fill_time` | 2 | Approximately 2 hours (using π ≈ 22/7). | PASS | PASS | PASS | PASS |
| `c10-7-ex7-4-q3` | 7.4 | `cone_to_cylinder_symbolic_height` | h/(3*x**2) | h/(3x²) units | PASS | PASS | PASS | PASS |
| `c10-7-ex7-4-q4` | 7.4 | `cone_to_hollow_sphere_internal_diameter` | 6 | 6 cm | PASS | PASS | PASS | PASS |
| `c10-7-ex7-4-q5` | 7.4 | `sump_minus_overhead_tank_volume` | 3000000 - 378000*pi (≈ 1812000.0000 with pi=22/7) | Approximately 1,812,000 cm³ = 1,812 litres (using π ≈ 22/7). | PASS | PASS | PASS | PASS |
| `c10-7-ex7-4-q6` | 7.4 | `hollow_hemisphere_to_cylinder_height` | 4/3 | 4/3 cm ≈ 1.33 cm | PASS | PASS | PASS | PASS |
| `c10-7-ex7-4-q7` | 7.4 | `sphere_to_hollow_cylinder_thickness` | 1 | 1 cm | PASS | PASS | PASS | PASS |
| `c10-7-ex7-4-q8` | 7.4 | `hemisphere_to_cylinder_percentage` | 100 | 100% | PARTIAL | PASS | UNVERIFIABLE | PASS |
| `c10-7-ex7-5-q1` | 7.5 | `mcq_cone_csa` | 136*pi (≈ 427.2566 with pi=exact) | (D) 136π cm² | PASS | PASS | PASS | PASS |
| `c10-7-ex7-5-q2` | 7.5 | `mcq_two_hemispheres_csa` | 4*pi*r**2 | (A) 4πr² sq. units | PARTIAL | PASS | PASS | PARTIAL |
| `c10-7-ex7-5-q3` | 7.5 | `mcq_cone_height` | 12 | (A) 12 cm | PASS | PASS | PASS | PASS |
| `c10-7-ex7-5-q4` | 7.5 | `mcq_cylinder_halved_radius_ratio` | pi*h*r**2/4 : pi*h*r**2 (simplified ratio 1/4) | (B) 1:4 | PARTIAL | PASS | UNVERIFIABLE | PASS |
| `c10-7-ex7-5-q5` | 7.5 | `mcq_cylinder_tsa_r_one_third_h` | 8*pi*h**2/9 | (C) 8πh²/9 sq.units | FAIL | PASS | UNVERIFIABLE | FAIL |
| `c10-7-ex7-5-q6` | 7.5 | `mcq_hollow_cylinder_volume` | 1120*pi (≈ 3518.5838 with pi=exact) | (B) 1120π cm³ | PARTIAL | PASS | UNVERIFIABLE | PASS |
| `c10-7-ex7-5-q7` | 7.5 | `mcq_cone_scaling_factor` | 18 | (B) made 18 times | PASS | PASS | PASS | PASS |
| `c10-7-ex7-5-q8` | 7.5 | `mcq_hemisphere_tsa_over_r2` | 3*pi (≈ 9.4248 with pi=exact) | (C) 3π | PASS | PASS | PASS | PASS |
| `c10-7-ex7-5-q9` | 7.5 | `mcq_sphere_to_cone_height` | 4*x | (C) 4x cm | PARTIAL | PASS | UNVERIFIABLE | PASS |
| `c10-7-ex7-5-q10` | 7.5 | `mcq_frustum_volume` | 3328*pi (≈ 10455.2204 with pi=exact) | (A) 3328π cm³ | PARTIAL | PASS | UNVERIFIABLE | PASS |
| `c10-7-ex7-5-q11` | 7.5 | `qualitative_shape_recognition` | UNVERIFIABLE | (D) frustum of a cone and a hemisphere | UNVERIFIABLE | UNVERIFIABLE | UNVERIFIABLE | PASS |
| `c10-7-ex7-5-q12` | 7.5 | `mcq_sphere_8_balls_ratio` | 2 : 1 (simplified ratio 2) | (A) 2:1 | PARTIAL | PASS | UNVERIFIABLE | PASS |
| `c10-7-ex7-5-q13` | 7.5 | `mcq_greatest_sphere_in_cylinder` | 4*pi/3 (≈ 4.1888 with pi=exact) | (A) (4/3)π | PASS | PASS | PASS | PASS |
| `c10-7-ex7-5-q14` | 7.5 | `mcq_similar_cones_ratio` | 1 : 2 (simplified ratio 1/2) | (B) 1:2 | FAIL | PASS | FAIL | PASS |
| `c10-7-ex7-5-q15` | 7.5 | `mcq_cylinder_cone_sphere_volume_ratio` | 2*pi*r**3 : 2*pi*r**3/3 : 4*pi*r**3/3 | (D) 3:1:2 | PARTIAL | PASS | PARTIAL | PASS |
| `c10-7-unit-q1` | 7.unit | `fountain_pen_words` | 48000 | Approximately 48,000 words | PARTIAL | PASS | PASS | PARTIAL |
| `c10-7-unit-q2` | 7.unit | `hemisphere_tank_empty_time` | 1925/72 | Approximately 27 minutes | PASS | PASS | PASS | PASS |
| `c10-7-unit-q3` | 7.unit | `max_cone_in_hemisphere` | pi*r**3/3 | πr³/3 cubic units | PARTIAL | PASS | UNVERIFIABLE | PARTIAL |
| `c10-7-unit-q4` | 7.unit | `funnel_tin_area` | 249*pi (≈ 782.5714 with pi=22/7) | 249π cm² ≈ 782.57 cm² | PASS | PASS | PASS | PASS |
| `c10-7-unit-q5` | 7.unit | `coins_to_cylinder_count` | 450 | 450 coins | PASS | PASS | PASS | PASS |
| `c10-7-unit-q6` | 7.unit | `hollow_to_solid_cylinder_diameter` | 24/5 | 4.8 cm | PARTIAL | PASS | PARTIAL | PASS |
| `c10-7-unit-q7` | 7.unit | `frustum_csa_from_perimeters_cost` | 6800 | ₹6,800 | PARTIAL | PASS | PARTIAL | PARTIAL |
| `c10-7-unit-q8` | 7.unit | `hollow_hemisphere_thickness` | 2 | 2 cm | PASS | PASS | PASS | PASS |
| `c10-7-unit-q9` | 7.unit | `cone_slant_from_vol_base_area` | 17 | Approximately 17 cm (π ≈ 22/7) | PARTIAL | PASS | PARTIAL | PASS |
| `c10-7-unit-q10` | 7.unit | `sector_to_cone_volume` | 111132*pi/125 (≈ 2794.1760 with pi=22/7) | Approximately 2794.18 cm³ | PARTIAL | PASS | PARTIAL | PASS |
| `g10-ch7-solids-and-units` | 7.1 | `concept_m3_to_litres` | 2500 | choice[0]: 2500 litres | PARTIAL | PASS | UNVERIFIABLE | PASS |
| `g10-ch7-cylinder-surface-area` | 7.2.1–7.2.2 | `concept_hollow_cylinder_csa` | 160*pi (≈ 502.6548 with pi=exact) | choice[1]: 160π cm² | PASS | PASS | PASS | PASS |
| `g10-ch7-cone-slant-surface` | 7.2.3 | `concept_cone_csa` | 175*pi (≈ 550.0000 with pi=22/7) | choice[2]: 550 m² | PARTIAL | PASS | UNVERIFIABLE | PASS |
| `g10-ch7-sphere-hemisphere-surface` | 7.2.4–7.2.6 | `concept_hollow_hemisphere_tsa` | 84*pi (≈ 263.8938 with pi=exact) | choice[0]: 84π m² | PARTIAL | PASS | UNVERIFIABLE | PASS |
| `g10-ch7-frustum-surface-volume` | 7.2.7 & 7.3.8 | `concept_frustum_slant` | 5 | choice[1]: 5 cm | PARTIAL | PASS | UNVERIFIABLE | PASS |
| `g10-ch7-volumes-cylinder-cone` | 7.3.1–7.3.3 | `concept_cone_double_radius_scaling` | 4 | choice[2]: 4 times | PARTIAL | PASS | UNVERIFIABLE | PASS |
| `g10-ch7-volumes-sphere-hemisphere` | 7.3.4–7.3.7 | `concept_sphere_volume_ratio` | 8 : 27 (simplified ratio 8/27) | choice[0]: 8 : 27 | PARTIAL | PASS | UNVERIFIABLE | PARTIAL |
| `g10-ch7-combined-solids` | 7.4 | `concept_cube_minus_hemisphere_sa` | 6*a**2 + pi*r**2 | choice[1]: 6a² + πr² | FAIL | PASS | FAIL | PASS |
| `g10-ch7-conversion-volume-conservation` | 7.5 | `concept_sphere_recast_count` | 27 | choice[2]: 27 small spheres | FAIL | PASS | FAIL | PASS |
