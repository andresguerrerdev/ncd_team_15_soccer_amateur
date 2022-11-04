export class HelloNEAR {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }


  async getAllTeams() {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: 'get_all_teams' });
  }

  async addTeam(uid, name, address, category, icon) {
    return await this.wallet.callMethod({ contractId: this.contractId, method: 'add_team', args: { uid:uid, name: name, address: address, category: category,icon:icon} });
  }

  async getAllPlayersFromTeam(uid) {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: 'get_team_players', args: {index:uid} });
  }

  async addPlayerToTeam(first_name, last_name, year, price, number, position, index) {
    return await this.wallet.callMethod(
    { contractId: this.contractId, method: 'add_player', 
      args: { first_name: first_name, last_name: last_name, year: year, price: price, number: number, position: position, index: index} 
    });
  }

}