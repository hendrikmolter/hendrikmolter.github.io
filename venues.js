// Proceedings details used to generate BibTeX entries for conference papers.
// Key = the venue as written in publications.js before the colon (e.g. "ICALP 2025").
// name: full name as in the CV, used as "Proceedings of the <name> (<key>)".
// series / volume / publisher: from the proceedings themselves.
// Journal papers need no entry here.
const LIPICS = ["LIPIcs", "Schloss Dagstuhl -- Leibniz-Zentrum f{\\\"u}r Informatik"];
const LNCS = ["Lecture Notes in Computer Science", "Springer"];
const VENUES = {
  "WG 2025":     { name: "51st International Workshop on Graph-Theoretic Concepts in Computer Science", series: LNCS[0], volume: "16124", publisher: LNCS[1] },
  "AAAI 2025":   { name: "39th AAAI Conference on Artificial Intelligence", publisher: "AAAI Press" },
  "ICALP 2025":  { name: "52nd International Colloquium on Automata, Languages, and Programming", series: LIPICS[0], volume: "334", publisher: LIPICS[1] },
  "MFCS 2025":   { name: "50th International Symposium on Mathematical Foundations of Computer Science", series: LIPICS[0], volume: "345", publisher: LIPICS[1] },
  "EC 2025":     { name: "26th ACM Conference on Economics and Computation", publisher: "ACM" },
  "STACS 2025":  { name: "42nd International Symposium on Theoretical Aspects of Computer Science", series: LIPICS[0], volume: "327", publisher: LIPICS[1] },
  "AAAI 2024":   { name: "38th AAAI Conference on Artificial Intelligence", publisher: "AAAI Press" },
  "IJCAI 2024":  { name: "33rd International Joint Conference on Artificial Intelligence", publisher: "ijcai.org" },
  "IPEC 2024":   { name: "19th International Symposium on Parameterized and Exact Computation", series: LIPICS[0], volume: "321", publisher: LIPICS[1] },
  "SAND 2024":   { name: "3rd Symposium on Algorithmic Foundations of Dynamic Networks", series: LIPICS[0], volume: "292", publisher: LIPICS[1] },
  "IJCAI 2023":  { name: "32nd International Joint Conference on Artificial Intelligence", publisher: "ijcai.org" },
  "STACS 2023":  { name: "40th International Symposium on Theoretical Aspects of Computer Science", series: LIPICS[0], volume: "254", publisher: LIPICS[1] },
  "IPEC 2022":   { name: "17th International Symposium on Parameterized and Exact Computation", series: LIPICS[0], volume: "249", publisher: LIPICS[1] },
  "MFCS 2022":   { name: "47th International Symposium on Mathematical Foundations of Computer Science", series: LIPICS[0], volume: "241", publisher: LIPICS[1] },
  "SAND 2022":   { name: "1st Symposium on Algorithmic Foundations of Dynamic Networks", series: LIPICS[0], volume: "221", publisher: LIPICS[1] },
  "STACS 2022":  { name: "39th International Symposium on Theoretical Aspects of Computer Science", series: LIPICS[0], volume: "219", publisher: LIPICS[1] },
  "AAAI 2021":   { name: "35th AAAI Conference on Artificial Intelligence", publisher: "AAAI Press" },
  "FCT 2021":    { name: "23rd International Symposium on Fundamentals of Computation Theory", series: LNCS[0], volume: "12867", publisher: LNCS[1] },
  "IJCAI 2021":  { name: "30th International Joint Conference on Artificial Intelligence", publisher: "ijcai.org" },
  "MFCS 2021":   { name: "46th International Symposium on Mathematical Foundations of Computer Science", series: LIPICS[0], volume: "202", publisher: LIPICS[1] },
  "WG 2021":     { name: "47th International Workshop on Graph-Theoretic Concepts in Computer Science", series: LNCS[0], volume: "12911", publisher: LNCS[1] },
  "ISAAC 2020":  { name: "31st International Symposium on Algorithms and Computation", series: LIPICS[0], volume: "181", publisher: LIPICS[1] },
  "KDD 2020":    { name: "26th ACM SIGKDD International Conference on Knowledge Discovery \\& Data Mining", publisher: "ACM" },
  "STACS 2020":  { name: "37th International Symposium on Theoretical Aspects of Computer Science", series: LIPICS[0], volume: "154", publisher: LIPICS[1] },
  "WG 2020":     { name: "46th International Workshop on Graph-Theoretic Concepts in Computer Science", series: LNCS[0], volume: "12301", publisher: LNCS[1] },
  "AAAI 2019":   { name: "33rd AAAI Conference on Artificial Intelligence", publisher: "AAAI Press" },
  "COMPLEX NETWORKS 2019": { name: "8th International Conference on Complex Networks and Their Applications", series: "Studies in Computational Intelligence", volume: "882", publisher: "Springer" },
  "ASONAM 2018": { name: "10th IEEE/ACM International Conference on Advances in Social Networks Analysis and Mining", publisher: "IEEE Computer Society" },
  "CiE 2018":    { name: "14th Conference on Computability in Europe", series: LNCS[0], volume: "10936", publisher: LNCS[1] },
  "FSTTCS 2018": { name: "38th IARCS Annual Conference on Foundations of Software Technology and Theoretical Computer Science", series: LIPICS[0], volume: "122", publisher: LIPICS[1] },
  "ISAAC 2018":  { name: "29th International Symposium on Algorithms and Computation", series: LIPICS[0], volume: "123", publisher: LIPICS[1] },
  "ISCO 2018":   { name: "5th International Symposium on Combinatorial Optimization", series: LNCS[0], volume: "10856", publisher: LNCS[1] },
  "IPEC 2018":   { name: "13th International Symposium on Parameterized and Exact Computation", series: LIPICS[0], volume: "115", publisher: LIPICS[1] },
  "MFCS 2018":   { name: "43rd International Symposium on Mathematical Foundations of Computer Science", series: LIPICS[0], volume: "117", publisher: LIPICS[1] },
  "SOFSEM 2018": { name: "44th International Conference on Current Trends in Theory and Practice of Computer Science", series: LNCS[0], volume: "10706", publisher: LNCS[1] },
  "WG 2018":     { name: "44th International Workshop on Graph-Theoretic Concepts in Computer Science", series: LNCS[0], volume: "11159", publisher: LNCS[1] },
  "CIAC 2017":   { name: "10th International Conference on Algorithms and Complexity", series: LNCS[0], volume: "10236", publisher: LNCS[1] },
  "WG 2017":     { name: "43rd International Workshop on Graph-Theoretic Concepts in Computer Science", series: LNCS[0], volume: "10520", publisher: LNCS[1] },
  "ASONAM 2016": { name: "8th IEEE/ACM International Conference on Advances in Social Networks Analysis and Mining", publisher: "IEEE Computer Society" },
  "ECAI 2016":   { name: "22nd European Conference on Artificial Intelligence", series: "Frontiers in Artificial Intelligence and Applications", volume: "285", publisher: "IOS Press" },
  "IPEC 2016":   { name: "11th International Symposium on Parameterized and Exact Computation", series: LIPICS[0], volume: "63", publisher: LIPICS[1] },
  "WAW 2014":    { name: "11th International Workshop on Algorithms and Models for the Web Graph", series: LNCS[0], volume: "8882", publisher: LNCS[1] },
  "PPSN 2012":   { name: "12th International Conference on Parallel Problem Solving from Nature", series: LNCS[0], volume: "7491", publisher: LNCS[1] },
  // book chapter (entry type "o" in publications.js)
  "Treewidth, Kernels, and Algorithms (Festschrift for Hans L. Bodlaender) 2020": {
    type: "incollection",
    booktitle: "Treewidth, Kernels, and Algorithms: Essays Dedicated to Hans L. Bodlaender on the Occasion of His 60th Birthday",
    series: LNCS[0], volume: "12160", publisher: LNCS[1] },
};
