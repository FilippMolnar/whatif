export async function calculate() {
    try {
        const keys = Object.keys(localStorage).filter(key => key.startsWith('game:'));
        const games = []
        for(const k of keys){
            const game = JSON.parse(localStorage.getItem(k));
            if(game.SwithTeams){
                game.SwithTeams = !game.SwithTeams;
                const t1 = game.Team_1;
                const s1 = game.Score_1;
                game.Team_1 = game.Team_2; 
                game.Team_2 = t1; 
                game.Score_1 = game.Score_2; 
                game.Score_2 = s1; 
            }
            const entry = {
                "Team_1": game.Team_1,
                "Team_2": game.Team_2,
                "Score_1": game.Score_1,
                "Score_2": game.Score_2,
                "Date": game.Date,
                "Tournament": game.Tournament,
                "Id_Game": game.Id_Game
            };
            games.push(entry);
        }

        if (games.length === 0) {
          console.log('No games data found in local storage');
          return;
        }
        const response = await fetch('/api/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(games)
        });
        
        const data = await response.json();
        console.log(data)
        return data;
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
}
