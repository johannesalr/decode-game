// Import Firebase-related methods and the generateCode function
import { db, doc, setDoc, getDoc, onSnapshot, updateDoc } from "./firebase.js";
import { generateCode } from "./utils.js"; // A separate file for utility functions if necessary

// Function to create a public match
export async function createPublicMatch() {
  try {
    // Generate a unique matchId
    const matchId = `match-${Math.random().toString(36).substr(2, 9)}`;

    // Generate unique codes for both players
    const player1Code = generateCode(4);
    const player2Code = generateCode(4);

    // Set up Firestore references
    const matchRef = doc(db, "matches", "public", matchId);

    // Store match data in Firestore
    await setDoc(matchRef, {
      hostCode: player1Code,
      player1: { code: player1Code, turn: true },
      player2: { code: player2Code, turn: false },
      gameState: "waiting", // Game state is waiting for player 2
    });

    return { matchId, player1Code, player2Code };
  } catch (error) {
    console.error("Error creating public match: ", error);
  }
}

// Function to join a public match
export async function joinPublicMatch(matchId) {
  try {
    const matchRef = doc(db, "matches", "public", matchId);
    const matchSnapshot = await getDoc(matchRef);

    // If the match exists, we update it with the second player (player2)
    if (matchSnapshot.exists()) {
      const matchData = matchSnapshot.data();

      // Update the match to show the second player and change the game state to "playing"
      const updatedMatchData = {
        ...matchData,
        player2: { ...matchData.player2, turn: true }, // Player 2 now gets the first turn
        gameState: "playing", // Change game state to playing
      };

      await updateDoc(matchRef, updatedMatchData);
      console.log("Joined match successfully:", matchData);
    } else {
      console.error("Match not found!");
    }
  } catch (error) {
    console.error("Error joining public match: ", error);
  }
}

// Function to create a private match (similar to public but with private match logic)
export async function createPrivateMatch() {
  try {
    const matchId = `match-${Math.random().toString(36).substr(2, 9)}`;
    const player1Code = generateCode(4);
    const player2Code = generateCode(4);

    // Private matches are stored in the private collection
    const matchRef = doc(db, "matches", "private", matchId);
    await setDoc(matchRef, {
      hostCode: player1Code,
      player1: { code: player1Code, turn: true },
      player2: { code: player2Code, turn: false },
      gameState: "waiting", // Game state is waiting for player 2
    });

    return { matchId, player1Code, player2Code };
  } catch (error) {
    console.error("Error creating private match: ", error);
  }
}

// Function to join a private match
export async function joinPrivateMatch(matchId, player2Code) {
  try {
    const matchRef = doc(db, "matches", "private", matchId);
    const matchSnapshot = await getDoc(matchRef);

    // If the match exists, we update it with player2 details
    if (matchSnapshot.exists()) {
      const matchData = matchSnapshot.data();

      // Only update if the player2Code matches
      if (matchData.player2.code === player2Code) {
        const updatedMatchData = {
          ...matchData,
          player2: { ...matchData.player2, turn: true }, // Player 2 starts the game
          gameState: "playing", // Game state changes to playing
        };

        await updateDoc(matchRef, updatedMatchData);
        console.log("Joined private match successfully:", matchData);
      } else {
        console.error("Invalid player2 code!");
      }
    } else {
      console.error("Private match not found!");
    }
  } catch (error) {
    console.error("Error joining private match: ", error);
  }
}

// Function to handle game turns (this handles both public and private matches)
export async function handleTurn(matchId, player) {
  try {
    // Get the match reference
    const matchRef = doc(db, "matches", "public", matchId); // For public match
    // For private match, use:
    // const matchRef = doc(db, "matches", "private", matchId);

    // Retrieve the current match data
    const matchSnapshot = await getDoc(matchRef);
    const matchData = matchSnapshot.data();

    if (matchData.gameState === "playing") {
      // Determine the current player's position (player1 or player2)
      const currentPlayer = player.turn ? "player1" : "player2";
      const nextPlayer = currentPlayer === "player1" ? "player2" : "player1";

      // Update the match data to toggle the turns
      await updateDoc(matchRef, {
        ...matchData,
        [currentPlayer]: { ...matchData[currentPlayer], turn: false },
        [nextPlayer]: { ...matchData[nextPlayer], turn: true },
      });

      console.log("Turn updated:", currentPlayer);
    }
  } catch (error) {
    console.error("Error updating turn:", error);
  }
}

export {
  createPublicMatch,
  joinPublicMatch,
  createPrivateMatch,
  joinPrivateMatch,
  handleTurn,
};
