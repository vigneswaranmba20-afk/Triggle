/* Original examples aligned with the 2025 English and Tamil Statistics chapters. */
(() => {
  'use strict';
  const tex = String.raw;
  const math = (latex, fallback) => ({latex, fallback, display: true});
  const check = (question, choices, correct, feedback) => ({question, choices, correct, feedback});

  window.TRIGGLE_STATISTICS_LESSONS = [
    {
      id: 'g9-stats-introduction',
      section: '8.1', title: {en: 'What data can tell us', ta: 'அறிமுகம்'},
      intro: 'Four pupils log how many books they borrowed and name one genre (kind of book) each. Compare the two columns.',
      exercise: 'g9-ch8-ex8.3-q4',
      views: [{
        notes: [
          'Data are recorded observations. A numerical (quantitative) observation counts or measures something. A categorical (qualitative) observation names a group or quality.',
          'Statistics means collecting, organising, analysing and interpreting data to answer a question. Choose a question first so you know what to record.'
        ],
        why: 'Adding book counts gives the number of books borrowed. Counting genre labels tells you how many pupils chose each genre. These totals describe the four pupils in the log.'
      }],
      practice: check('A gardener records each plant’s height and flower colour. Which question needs the numerical data?',
        ['Which colour appears most often?', 'How much taller is the tallest plant than the shortest?', 'Which plant has a red flower?'], 1,
        ['Colour names are categories. Heights can be measured and compared.', 'Heights are numerical measurements. Subtract the shortest height from the tallest.', 'A flower colour tells you its category.'])
    },
    {
      id: 'g9-stats-collection',
      section: '8.2', title: {en: 'Collecting and organising data', ta: 'தரவுகளைத் திரட்டுதல்'},
      intro: 'Seven cyclists record their journey times in minutes. Sort the readings, count repeats, then put them into ranges.',
      exercise: 'g9-ch8-ex8.4-q1',
      views: [{
        notes: [
          'Primary data come from your own observations, interviews or experiments. Secondary data were collected by someone else, such as times you read from a published travel report.',
          'The original readings are raw data. A frequency is how many times a value or class occurs. Each tally mark records one observation. Group tally marks in fives by crossing the first four.',
          'A class interval collects a range of values. Its lower and upper limits describe its ends. Here each class includes its lower limit and stops just before its upper limit.'
        ],
        why: 'Give every reading one place in the table and count it once. The frequencies add to the size of the original list. Grouping helps compare ranges, but a table with only class totals cannot recover every original value.'
      }],
      practice: check('A record shows trips of 8, 10, 10 and 19 minutes. How many belong to the class “10 to under 20”?',
        ['Two', 'Three', 'Four'], 1,
        ['Count both readings of 10 and the reading of 19.', 'The two 10s and the 19 each belong to the class. The 8 is below it.', 'Check the lower limit. The 8 belongs in an earlier class.'])
    },
    {
      id: 'g9-stats-centre',
      section: '8.3', title: {en: 'Mean, median and mode', ta: 'மையப்போக்கு அளவைகள்'},
      intro: 'Compare three summaries of the same five waiting times. Change the longest wait and see which summaries move.',
      exercise: 'g9-ch8-ex8.4-q4',
      views: [{
        notes: [
          'A measure of central tendency describes a typical value with one number. The mean is the total shared equally. The median is the middle of the ordered readings. The mode is the most frequent reading.',
          'An extreme value is far from most of the others. For a typical wait when one wait is unusually long, the median can be a good choice. Use the mode to find the most common wait and the mean to share the total.'
        ],
        why: 'Changing the largest reading changes the sum. The mean changes because the number of readings stays the same. In these two lists the middle position and the most frequent value stay the same.'
      }],
      practice: check('Five parcel weights in kg are 1, 2, 2, 3 and 17. A label should describe a typical weight despite the very heavy parcel. Which summary best uses the middle rank?',
        ['Mean', 'Median', 'Largest weight'], 1,
        ['The mean includes the 17 kg reading and is pulled upward.', 'The middle of the sorted list is 2 kg. The unusually large value stays at the end.', 'The largest weight describes the single heaviest parcel.'])
    },
    {
      id: 'g9-stats-mean',
      section: '8.4', title: {en: 'Arithmetic mean', ta: 'கூட்டுச் சராசரி'},
      intro: 'Share a total equally. Change one reading or switch to a frequency table to see what gets added and counted.',
      exercise: 'g9-ch8-ex8.1-q1',
      views: [{
        notes: [
          'Read x̄ as “x bar”. It names the arithmetic mean. The symbol ∑ means add the terms that follow. Each xᵢ is a reading, with i marking its position. The number n counts the readings.',
          'A deviation is the signed difference from a reference value. For the assumed-mean method, choose a convenient reference A. Each deviation dᵢ is xᵢ minus A. Average the deviations, then add A back.'
        ],
        formula: math(tex`\begin{aligned}\bar{x}&=\dfrac{\sum x_i}{n}\\
\bar{x}&=A+\dfrac{\sum d_i}{n}\end{aligned}`, 'Divide the total by the number of readings, or add the average deviation to the assumed mean.'),
        why: 'Sharing the total gives n equal parts of size x̄. So the signed differences from x̄ add to zero. Adding the same amount to every reading adds that amount to the mean. Multiplying or dividing every reading by the same number scales the mean in the same way. A divisor must be nonzero.',
        practice: check('Four daily scores have a mean of 12. One score is corrected upward by 6. What is the new mean?',
          ['13.5', '18', '12.6'], 0,
          ['The same four scores share six extra points. The mean rises by 1.5 points to 13.5.', 'Only one score gained six points. Share the increase across all four scores.', 'The increase is six divided by four, which is 1.5.'])
      }, {
        exercise: 'g9-ch8-ex8.1-q5',
        notes: ['Here xᵢ names a distinct value, fᵢ counts its occurrences, and i is its table row. The symbol ∑ means add. The product fᵢxᵢ adds all copies of that value. When A is the assumed mean, dᵢ is the signed difference xᵢ minus A.'],
        formula: math(tex`\begin{aligned}\bar{x}&=\dfrac{\sum f_i x_i}{\sum f_i}\\
\bar{x}&=A+\dfrac{\sum f_i d_i}{\sum f_i}\end{aligned}`, 'Divide the frequency-weighted total by total frequency, or add the frequency-weighted average deviation to the assumed mean.'),
        why: 'Multiplying each value by its frequency replaces repeated addition. Divide by the total frequency because every observation contributes. For the assumed-mean method, average the signed differences with the same frequency weights, then add the reference value back.',
        practice: check('Two pupils score 3 and three pupils score 8. What is the mean score?',
          ['5.5', '6', '10'], 1,
          ['The scores have different frequencies. Count each copy in the total.', 'Two threes and three eights total 30 points. Five pupils share those points, giving 6.', 'Add the five scores, then divide by five pupils.'])
      }, {
        exercise: 'g9-ch8-ex8.1-q6',
        notes: [
          'For grouped data xᵢ is the midpoint of class i, halfway between its boundaries. Each fᵢ counts the readings in that class. The sum signs ∑ add all the rows. Replacing readings with their class midpoints makes the mean an estimate. The symbol ≈ means “approximately equal to”.',
          'For the assumed-mean method use A as a convenient reference and dᵢ as xᵢ minus A. For step deviation divide dᵢ by a common nonzero step c to get uᵢ. Equal-width classes make their width a convenient step.'
        ],
        formula: math(tex`\begin{aligned}\bar{x}&\approx\dfrac{\sum f_i x_i}{\sum f_i}\\
\bar{x}&\approx A+\dfrac{\sum f_i d_i}{\sum f_i}\\
\bar{x}&\approx A+c\dfrac{\sum f_i u_i}{\sum f_i}\end{aligned}`, 'Direct, assumed mean and step deviation give the same midpoint-based estimate.'),
        why: 'The reference and step change how we write the midpoint. Adding A back restores the reference. Multiplying by c converts steps back into the original units before adding A.',
        practice: check('A table puts four trips in 0 to under 10 minutes and two in 10 to under 20. What is the estimated mean?',
          ['Eight and one third minutes', '10 minutes', 'Twelve and a half minutes'], 0,
          ['Four copies of 5 and two copies of 15 total 50 minutes. Divide by six to get eight and one third.', 'The two midpoints have different frequencies. Weight each by the number of trips.', 'The first class has the larger frequency, so the estimate is closer to 5 than to 15.'])
      }]
    },
    {
      id: 'g9-stats-median',
      section: '8.5', title: {en: 'Median', ta: 'இடைநிலை அளவு'},
      intro: 'Order the readings, then find the centre by position. Compare a list, a frequency table and grouped intervals.',
      exercise: 'g9-ch8-ex8.2-q1',
      views: [{
        notes: ['Sort the observations in increasing order. Keep duplicates because each observation takes one position. In the formulas n is the number of observations.'],
        formula: math(tex`\begin{aligned}\text{Odd position}&=\dfrac{n+1}{2}\\
\text{Even positions}&=\dfrac n2,\ \dfrac n2+1\end{aligned}`, 'Odd lists have one middle position. Even lists have two.'),
        why: 'Pair the smallest with the largest, then work inward. An odd list leaves one central value. An even list leaves two, so take their mean. The median may be absent from the original list.',
        practice: check('Find the median of 11, 3, 7 and 2.', ['5', '7', '5.75'], 0,
          ['Sorted order is 2, 3, 7, 11. The two middle values are 3 and 7, whose mean is 5.', 'There are two middle positions. Use both 3 and 7.', 'The median uses the middle two values after sorting.'])
      }, {
        notes: ['The frequency f counts copies of a value. Cumulative frequency, abbreviated CF, is the running count through the current row. The last CF is N, the total number of observations.'],
        why: 'Use N to find the one or two middle positions just as for a sorted list. Find the first row whose running count reaches each position. That row’s value occupies the position.',
        practice: check('The values 2, 7 and 9 have frequencies 2, 1 and 3. What is the median?', ['7', '8', '9'], 1,
          ['The third reading is 7. The fourth is 9. Use both.', 'There are six readings. Positions 3 and 4 contain 7 and 9, giving a median of 8.', 'Nine occupies the fourth position. The third is still 7.'])
      }, {
        exercise: 'g9-ch8-ex8.2-q5',
        notes: [
          'Use half the total frequency N to locate the middle of the grouped data. Find the first class whose running count reaches or passes that target.',
          'L is the lower boundary of that class, CF is the cumulative count before it, f is its frequency, and h is its width. A width is upper boundary minus lower boundary. The symbol ≈ means “approximately equal to”. For whole-number classes 1–5 and 6–10, the shared boundary is 5.5, halfway between 5 and 6.'
        ],
        formula: math(tex`\text{Median}\approx L+\dfrac{N/2-\mathrm{CF}}{f}h`, 'Estimated median is the lower boundary plus the fraction of the median class needed to reach the halfway count, times the class width.'),
        why: 'Subtract the previous running count from the halfway count to see how many readings you still need. Estimate the same fraction of the class width by treating the readings as evenly spread within it. When the halfway count falls exactly at a class boundary, that boundary is the estimate.',
        practice: check('Three consecutive 10-minute classes start at 0, 10 and 20. Their frequencies are 4, 8 and 4. What is the estimated median?',
          ['10 minutes', '15 minutes', '20 minutes'], 1,
          ['Four readings are below 10 minutes. The halfway count is eight, so go into the second class.', 'Four more readings are needed inside a class of eight. Halfway through 10 to 20 is 15.', 'The halfway count is reached before the second class ends.'])
      }]
    },
    {
      id: 'g9-stats-mode',
      section: '8.6', title: {en: 'Mode', ta: 'முகடு'},
      intro: 'Find the most frequent value. Compare a clear winner, a tie and a grouped modal class.',
      exercise: 'g9-ch8-ex8.3-q1',
      views: [{
        notes: ['Frequency means the number of times a value occurs. A mode is the value that occurs most often. It can describe numerical readings or categories, such as a popular library genre.'],
        why: 'Count each copy and compare the counts. Tied most-frequent repeated values are modes. When every value occurs only once, there is no mode under the school convention.',
        practice: check('In a survey, five pupils choose dance, five choose art and two choose chess. What is the mode?',
          ['Dance only', 'Dance and art', 'Five'], 1,
          ['Art has the same frequency as dance.', 'Dance and art tie for the highest frequency. Both are modes.', 'Five is the frequency. The modes are the categories with that frequency.'])
      }, {
        exercise: 'g9-ch8-ex8.3-q4',
        notes: ['An ungrouped table lists exact values and their frequencies. The row label gives the mode. The frequency tells how often that value occurs.'],
        why: 'Look down the frequency column for the largest count, then read its value. A large observation can have a small frequency.',
        practice: check('The values 3, 5 and 12 have frequencies 2, 6 and 1. What is the mode?', ['6', '5', '12'], 1,
          ['Six is how often the mode occurs.', 'The highest frequency is six, and it belongs to the value 5.', 'Twelve is the largest value, and it occurs only once.'])
      }, {
        exercise: 'g9-ch8-ex8.3-q5',
        notes: [
          'With equal-width classes, the class with a unique highest frequency is the modal class. For the worked method, it has a neighbouring class on each side.',
          'L is its lower boundary, h its width, f its frequency, f₁ the preceding frequency and f₂ the following frequency. For whole-number classes 1–5 and 6–10, use the shared boundary 5.5. Unequal widths require comparing frequency per unit width. The symbol ≈ means “approximately equal to”.'
        ],
        formula: math(tex`\text{Mode}\approx L+\dfrac{f-f_1}{(f-f_1)+(f-f_2)}h`, 'Estimated mode is the lower boundary plus the share of the total neighbour differences on the left, times the class width.'),
        why: 'First identify the modal class by frequency. Measure the two drops from its frequency to those of the neighbours. The fraction compares the left drop with the sum of both drops and places the estimate inside the modal class. A tied peak needs more care than this single-peak estimate.',
        practice: check('The classes 10–20, 20–30 and 30–40 have frequencies 4, 8 and 4. What is the estimated mode?',
          ['8', '20', '25'], 2,
          ['Eight is the highest frequency. The estimate lies inside the class 20–30.', 'That is the lower boundary. The drops to the neighbours are equal, so go halfway across.', 'The equal drops put the estimated mode halfway across the modal class 20–30.'])
      }, {
        notes: ['Empirical means based on a pattern seen in data. For some single-peaked distributions whose shapes are close to symmetric, the three measures have an approximate relationship. The symbol ≈ means “approximately equal to”.'],
        formula: math(tex`\text{Mode}\approx 3\times\text{Median}-2\times\text{Mean}`, 'Estimate the mode by taking three times the median and subtracting twice the mean.'),
        why: 'Use this relationship as a rough estimate when two averages are given and the distribution is suitable. Actual frequencies give more direct evidence about the mode.',
        practice: check('A suitable distribution has mean 25 and median 24. What mode would this relationship estimate?',
          ['22', '24', '26'], 0,
          ['Three times 24 is 72 and twice 25 is 50. The estimate is 22.', 'Subtract twice the mean from three times the median.', 'The order matters. Start with three medians and subtract two means.'])
      }]
    }
  ];
})();
