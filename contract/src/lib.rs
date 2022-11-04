use std::vec;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{log, near_bindgen};
use serde::{Serialize, Deserialize};
use near_sdk::{json_types::U128, AccountId, Promise};



#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize,Clone,Serialize, Deserialize)]

pub struct Player {
    first_name: String,
    last_name: String,
    year: u64,
    price: u128, 
    number :u64,
    position: String
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize,Clone,Serialize, Deserialize)]

pub struct TeamClub {
    uid: u64,
    name: String,
    address: String,
    category: u64,
    icon : String,
    list_players: Vec<Player>
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize,Clone,Serialize, Deserialize)]
pub struct Contract {
    team_list: Vec<TeamClub>,
    // storage_deposits: u64
}


// Define the default, which automatically initializes the contract
impl Default for Contract{
    fn default() -> Self{
        Self{         
        team_list: vec![
            
        TeamClub{ uid:1, name: "Tigres FC".to_string(), address: "Monterrey".to_string(), category:1,icon: "https://1.bp.blogspot.com/--OwYCGTphYA/XtaPmBYbnJI/AAAAAAABcHw/OMmcERRLQcAFue_F0UaUL2S7rkmddWyzACK4BGAsYHg/Tigres%2BUANL256x.png".to_string(), list_players:vec![] }.to_owned(),
        TeamClub{ uid:2, name: "America".to_string(), address: "CDMX".to_string(), category:1, icon: "http://cdn.shopify.com/s/files/1/0453/2083/1126/collections/Club-America-icon_1200x1200.png?v=1599717847".to_string(),list_players:vec![] }.to_owned(),
        TeamClub{ uid:3, name: "Toluca".to_string(), address: "Toluca".to_string(), category:1,icon:"https://futhead.cursecdn.com/static/img/14/clubs/1882.png".to_string(), list_players:vec![] }.to_owned(),
        TeamClub{ uid:4, name: "Chivas".to_string(), address: "Guadalajara".to_string(), category:1, icon: "https://futhead.cursecdn.com/static/img/14/clubs/1880.png".to_string(),list_players:vec![]}.to_owned(),
        TeamClub{ uid:5, name: "Cruz Azul".to_string(), address: "CDMX".to_string(), category:1, icon: "https://seeklogo.com/images/C/cruz-azul-nuevo-logo-EEF889CA67-seeklogo.com.png".to_string(),list_players:vec![] }.to_owned(),
        ] 
    }
    }
}



#[near_bindgen]
impl Contract {

    pub fn get_all_teams(&self) -> Vec<TeamClub> {
        return self.team_list.clone()
    }
    pub fn add_team(&mut self, uid: u64,name: String,address: String, category: u64, icon:String) {
        let mut is_exist = false;
        if self.team_list.iter().any(|team| team.uid == uid) {
            is_exist = true;
        }
        assert!( is_exist == false,"Ya existe");
        let aux =  TeamClub{uid: uid,name: name.to_string(), address: address.to_string(), category : category, list_players:vec![],icon: icon.to_string()};
        self.team_list.push(aux);
    }
    pub fn get_team_players(&self, index: usize ) -> Vec<Player> {
        return self.team_list[index].list_players.clone();
    }
    
    pub fn add_player(&mut self, first_name: String, last_name: String, year: u64, price: u128, number:u64, position: String, index:usize) {
        
        pay_register_player();
        let aux =  Player{first_name: first_name.to_string(), last_name: last_name.to_string(),year:year,price : price, number:number,position:position.to_string()};
        // self.list_players.push(aux);
        self.team_list[index].list_players.push(aux);
    }    
    pub fn pay_register_player(&mut self) -> Promise {
        // let recipient: AccountId =  "devandres.testnet".parse().unwrap();
        let recipient: AccountId =  "jontiveros.testnet".parse().unwrap();
        // let amountInYocto = utils.format.parseNearAmount("1");
        let amount:u128 = 1_000_000_000_000_000_000_000_000;
        return Promise::new(recipient).transfer(amount);
    }

}


#[cfg(test)]
mod tests {
    use super::*;

}