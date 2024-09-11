// Import the Vuex store

export async function calculate(games, division) {
    try {
        // Access modifiedGames from the Vuex store
        // Perform any necessary operations on the games array (similar to what you did with localStorage)
        if (games.length === 0) {
          console.log('No modified games data found.');
        //   return;
        }
        const processedGames = games.map(game => {
            return {
                "Team_1": game.Team_1,
                "Team_2": game.Team_2,
                "Score_1": game.Score_1,
                "Score_2": game.Score_2,
                "Date": game.Date,
                "Tournament": game.Tournament,
                "Id_Game": game.Id_Game
            };
        });
        const body = {
          'division': division,
          'modifiedGames': processedGames
        }
        const response = await fetch('/api/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        console.log('response:', data);
        return data;
    } catch (error) {
        console.error('Error fetching team data:', error);
    }
}
