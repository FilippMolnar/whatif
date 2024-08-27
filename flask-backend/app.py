from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'Ranking')))

from Ranking.main import calculate_rankings_wo_export

app = Flask(__name__)
CORS(app)

@app.route('/data', methods=['GET'])
def get_data():
    
    return jsonify({'message': 'Hello from Flask!'})


mixed_games_prep = pd.read_csv('./ranking_2024_final/out/data_preparation/2024-mixed-euf-games.csv')
mixed_games = pd.read_csv('./ranking_2024_final/out/2024-mixed-euf-games-23082024.csv')
mixed_summary = pd.read_csv('./ranking_2024_final/out/2024-mixed-euf-summary-23082024.csv')

@app.route('/ranking', methods=['GET'])
def get_team_data():

    # Path to your CSV file
    # Read the CSV file into a DataFrame
    df = mixed_summary
    data = []
    for index, row in df.iterrows():
        team = {
            "Team": row.Team,
            "Rating_USAU": row.Rating_USAU,
            "Wins": row.Wins,
            "Losses": row.Losses,
         
            "Tournaments": row.Tournaments
        }
        data.append(team)
        print("row: ", row.Team)
        print("row: ", type(row))
    return jsonify(data)

@app.route('/team-games', methods=['GET'])
def get_team_games():
    team_name = request.args.get('team')
    print(team_name)
    df = mixed_games
    data = []
    filtered_df = df[(df['Team_1'] == team_name) | (df['Team_2'] == team_name)]    
    for index, row in filtered_df.iterrows():
        print(f'idx:{index}')
        team = {
            "Id_Game": index,
            "Team_1": row.Team_1,
            "Team_2": row.Team_2,
            "Score_1": row.Score_1,
            "Score_2": row.Score_2,
            "Tournament": row.Tournament,
            "Date": row.Date,
            "Counted": "NO" if row.Is_Ignored_USAU else "YES",
        }
        data.append(team)
    print(data)
    return jsonify(data)

@app.route('/calculate', methods=['POST'])
def get_calculate():
    data = request.get_json()
    # Print the data to the console
    input_games = mixed_games_prep
    for game in data:
        print(game)
        input_games.loc[game['Id_Game']] = [game['Tournament'], game['Date'], game['Team_1'], game['Team_2'], game['Score_1'], game['Score_2']]
    
    print(input_games)
    games, summary = calculate_rankings_wo_export(input_games, 2024, 'mixed', '2024-08-24')
    print(summary)
    return jsonify({'message': 'ahello'})

if __name__ == '__main__':
    app.run(debug=True)
