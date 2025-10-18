document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const squares = board.querySelectorAll("div");
  const status = document.getElementById("status");
  const newGameBtn = document.querySelector(".btn");
  let currentPlayer = "X";

  // Step 1: Add the "square" class to each div
  squares.forEach(square => {
    square.classList.add("square");

    // Step 3: Add hover effects
    square.addEventListener("mouseover", () => {
      square.classList.add("hover");
    });
    square.addEventListener("mouseout", () => {
      square.classList.remove("hover");
    });

    // Step 2: Handle clicks for X and O
    square.addEventListener("click", () => {
      if (!square.textContent && !status.classList.contains("you-won")) {
        square.textContent = currentPlayer;
        square.classList.add(currentPlayer);

        const winner = checkWinner(Array.from(squares));

        if (winner) {
          status.textContent = `Congratulations! ${winner} is the Winner!`;
          status.classList.add("you-won");
        } else if (isDraw(Array.from(squares))) {
          // ✅ NEW: Draw condition
          status.textContent = "It's a draw! No winner this time.";
          status.classList.add("you-won");
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
      }
    });
  });

  // Step 4: Check for a winner
  function checkWinner(squares) {
    const combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let combo of combos) {
      const [a, b, c] = combo;
      if (
        squares[a].textContent &&
        squares[a].textContent === squares[b].textContent &&
        squares[a].textContent === squares[c].textContent
      ) {
        return squares[a].textContent;
      }
    }
    return null;
  }

  // ✅ NEW: Check if all squares are filled and no winner
  function isDraw(squares) {
    return squares.every(square => square.textContent !== "");
  }

  // Step 5: Reset the game
  newGameBtn.addEventListener("click", () => {
    squares.forEach(square => {
      square.textContent = "";
      square.classList.remove("X", "O");
    });
    status.textContent = "Move your mouse over a square and click to play an X or an O.";
    status.classList.remove("you-won");
    currentPlayer = "X";
  });
});
