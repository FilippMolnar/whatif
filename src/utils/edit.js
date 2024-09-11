export function editScore(game) {
    game.isEditing = true;
}
export function saveScore(game){
    game.isEditing = false;
    this.saveGame(game);
}
export function flipResult(game) {
    game.Counted = !game.Counted;
    this.saveGame(game);
}
export function saveGame(game){
    this.storeUpdateGame(game)
}

export function handleClickOutside(event) {
    this.games.forEach(game => {
      if (game.isEditing) {
        const scoreTeam1Input = this.$refs.Score_1;
        const scoreTeam2Input = this.$refs.Score_2;

        if (
          scoreTeam1Input && 
          !scoreTeam1Input.contains(event.target) &&
          scoreTeam2Input &&
          !scoreTeam2Input.contains(event.target)
        ) {
          this.saveGame(game);
        }
      }
    });
}
