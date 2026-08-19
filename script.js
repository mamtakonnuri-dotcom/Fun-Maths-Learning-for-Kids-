let level = 1;
let score = 0;
let q = 0;
let type = "";
let current = {};

function show(id) {
  document.querySelectorAll(".screen").forEach(s => {
    s.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}

function setLevel(n) {
  level = n;
  show("menu");
}

function rand(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function range() {
  if (level === 1) return 5;
  if (level === 2) return 10;
  return 12;
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}


/* =========================
   ADDITION / SUBTRACTION /
   MULTIPLICATION / DIVISION
   ========================= */

function startQuiz(t) {
  type = t;
  score = 0;
  q = 0;

  show("game");
  nextQuiz();
}

function nextQuiz() {

  q++;

  let max = range();
  let a;
  let b;
  let answer;
  let symbol;
  let title;

  if (type === "add") {

    a = rand(1, max * 2);
    b = rand(1, max * 2);

    answer = a + b;
    symbol = "+";
    title = "Addition ➕";

  } else if (type === "sub") {

    a = rand(1, max * 2);
    b = rand(1, a);

    answer = a - b;
    symbol = "-";
    title = "Subtraction ➖";

  } else if (type === "mul") {

    a = rand(1, max);
    b = rand(1, 10);

    answer = a * b;
    symbol = "×";
    title = "Multiplication ✖️";

  } else {

    b = rand(1, Math.min(max, 10));
    answer = rand(1, max);

    a = b * answer;

    symbol = "÷";
    title = "Division ➗";
  }

  current.answer = answer;

  let options = new Set();

  options.add(answer);

  while (options.size < 4) {
    options.add(
      Math.max(0, answer + rand(-5, 10))
    );
  }

  let arr = shuffle([...options]);

  document.getElementById("gameContent").innerHTML = `

    <div class="gamebox">

      <div class="score">
        Question ${q} / 10
        &nbsp; | &nbsp;
        Score: ${score}
      </div>

      <div class="progress">
        <div class="bar"
          style="width:${(q - 1) * 10}%">
        </div>
      </div>

      <h2>${title}</h2>

      <div class="question">
        ${a} ${symbol} ${b} = ?
      </div>

      <div class="answers">

        ${arr.map(x => `

          <button
            class="answer"
            onclick="answerQuiz(${x})">

            ${x}

          </button>

        `).join("")}

      </div>

      <div
        id="feedback"
        class="feedback">
      </div>

    </div>
  `;
}


function answerQuiz(x) {

  let feedback =
    document.getElementById("feedback");

  if (x === current.answer) {

    score++;

    feedback.textContent =
      "🎉 Great job!";

    setTimeout(() => {

      if (q >= 10) {
        finish();
      } else {
        nextQuiz();
      }

    }, 650);

  } else {

    feedback.textContent =
      "💡 Try again! Think carefully.";

  }
}


function finish() {

  document.getElementById("gameContent").innerHTML = `

    <div class="gamebox">

      <h1>🏆 Well Done!</h1>

      <div class="question">
        ${score}/10
      </div>

      <p>
        ${
          score >= 8
            ? "Amazing work! 🌟"
            : "Good try! Keep practising! 💪"
        }
      </p>

      <button onclick="show('menu')">
        🎮 Play another game
      </button>

    </div>
  `;
}


/* =========================
       EQUAL GROUPS
   ========================= */

function startGroups() {

  show("game");

  let groups =
    rand(2, level === 1 ? 4 : 6);

  let each = rand(2, 5);

  let total = groups * each;

  document.getElementById("gameContent").innerHTML = `

    <div class="gamebox">

      <h2>🍎 Equal Groups</h2>

      <p>
        There are
        <b>${groups}</b>
        groups with
        <b>${each}</b>
        apples in each group.
      </p>

      <div class="objects">

        ${Array.from(
          { length: groups },
          () =>
            `<span class="group">
              ${"🍎".repeat(each)}
            </span>`
        ).join("")}

      </div>

      <div class="question">
        ${groups} × ${each} = ?
      </div>

      <div class="answers">

        ${shuffle([
          total,
          total + 1,
          Math.max(0, total - 1),
          groups + each
        ]).map(x => `

          <button
            class="answer"
            onclick="groupsCheck(${x}, ${total})">

            ${x}

          </button>

        `).join("")}

      </div>

      <div
        id="feedback"
        class="feedback">
      </div>

    </div>
  `;
}


function groupsCheck(x, answer) {

  let feedback =
    document.getElementById("feedback");

  if (x === answer) {

    feedback.textContent =
      "🎉 Perfect!";

  } else {

    feedback.textContent =
      "💡 Try again!";

  }
}


/* =========================
        FAIR SHARING
   ========================= */

function startShare() {

  show("game");

  let kids =
    rand(2, level === 1 ? 3 : 5);

  let each = rand(2, 5);

  let total = kids * each;

  document.getElementById("gameContent").innerHTML = `

    <div class="gamebox">

      <h2>🐰 Fair Sharing</h2>

      <p>
        Share
        <b>${total}</b>
        carrots equally among
        <b>${kids}</b>
        rabbits.
      </p>

      <div class="objects">
        🐰 &nbsp;
        🥕 × ${total}
        &nbsp; 🐰
      </div>

      <div class="question">
        ${total} ÷ ${kids} = ?
      </div>

      <div class="answers">

        ${shuffle([
          each,
          each + 1,
          Math.max(1, each - 1),
          kids + each
        ]).map(x => `

          <button
            class="answer"
            onclick="groupsCheck(${x}, ${each})">

            ${x}

          </button>

        `).join("")}

      </div>

      <div
        id="feedback"
        class="feedback">
      </div>

    </div>
  `;
}


/* =========================
        MATH RACE
   ========================= */

function startRace() {

  score = 0;
  q = 0;

  show("game");

  raceQuestion();
}


function raceQuestion() {

  q++;

  let a = rand(1, range());

  let b = rand(1, 8);

  let answer = a * b;

  current.answer = answer;

  let options = shuffle([
    answer,
    answer + 1,
    Math.max(1, answer - 1),
    answer + 2
  ]);

  document.getElementById("gameContent").innerHTML = `

    <div class="gamebox">

      <h2>🚗 Multiplication Race</h2>

      <p>
        Answer correctly to move the car!
      </p>

      <div class="car-track">
        🏁
        <span id="car">🚗</span>
        🏁
      </div>

      <div class="score">
        Question ${q}/5
        |
        Score: ${score}
      </div>

      <div class="question">
        ${a} × ${b} = ?
      </div>

      <div class="answers">

        ${options.map(x => `

          <button
            class="answer"
            onclick="raceCheck(${x})">

            ${x}

          </button>

        `).join("")}

      </div>

      <div
        id="feedback"
        class="feedback">
      </div>

    </div>
  `;
}


function raceCheck(x) {

  let feedback =
    document.getElementById("feedback");

  if (x === current.answer) {

    score++;

    let car =
      document.getElementById("car");

    car.style.transform =
      `translateX(${Math.min(score * 70, 350)}px)`;

    feedback.textContent =
      "🚗💨 Correct!";

    setTimeout(() => {

      if (q >= 5) {
        finish();
      } else {
        raceQuestion();
      }

    }, 500);

  } else {

    feedback.textContent =
      "❌ Try again!";

  }
}


/* =========================
        MISSING NUMBER
   ========================= */

function startMissing() {

  show("game");

  let a = rand(2, range());

  let b = rand(2, 8);

  let answer = a * b;

  let blank = rand(0, 1);

  let question;

  if (blank) {

    question =
      `__ × ${b} = ${answer}`;

    current.answer = a;

  } else {

    question =
      `${a} × __ = ${answer}`;

    current.answer = b;
  }

  let options = shuffle([
    current.answer,
    current.answer + 1,
    Math.max(1, current.answer - 1),
    current.answer + 2
  ]);

  document.getElementById("gameContent").innerHTML = `

    <div class="gamebox">

      <h2>🧩 Missing Number</h2>

      <p>
        Find the number that is missing.
      </p>

      <div class="question">
        ${question}
      </div>

      <div class="answers">

        ${options.map(x => `

          <button
            class="answer"
            onclick="groupsCheck(${x}, ${current.answer})">

            ${x}

          </button>

        `).join("")}

      </div>

      <div
        id="feedback"
        class="feedback">
      </div>

      <button onclick="startMissing()">
        🔄 New Question
      </button>

    </div>
  `;
}
