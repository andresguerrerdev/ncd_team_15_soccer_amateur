import 'regenerator-runtime/runtime';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './assets/global.css';
import { SignInPrompt, SignOutButton, Players } from './ui-components';
import { HelloNEAR } from './near-interface';


export default function App({ isSignedIn, helloNEAR, wallet }) {
  const [greetingVar, setGreetingVar] = React.useState();
  const [listTeam, setListTeam] = React.useState([]);  
  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);
  const [showPlayers,setTeam] = React.useState();
  const [selectedTeam,selectTeam] = React.useState();

  console.log(showPlayers);  
  // Get blockchian state once on component load
  React.useEffect(() => {

    helloNEAR.getAllTeams()
        .then(result => {
          setListTeam(result);
          console.log(listTeam);
       }, function(error) {
          alert('error')
       }).catch(alert)
        .finally(() => {
          setUiPleaseWait(false);
        });


  }, []);


  /// If user not signed-in with wallet - show prompt
  if (!isSignedIn) {
    // Sign-in flow will reload the page later
    return <SignInPrompt greeting={greetingVar} onClick={() => wallet.signIn()}/>;
  }

  if (showPlayers != undefined){
    return <Players helloNEAR={helloNEAR} team_uid={showPlayers} team_name={selectedTeam} setTeam={setTeam}/>;
  }


  function addTeam(e) {
    e.preventDefault();
    setUiPleaseWait(true);
    
    const team_input  = e.target.elements;
    let isExist = false;
    listTeam.forEach(async (team) => {
      if(team['uid'] == parseInt(team_input.team_index.value)){
        isExist= true;
      }
    });
    if(isExist === false){
      setUiPleaseWait(false);
      helloNEAR.addTeam(parseInt(team_input.team_index.value),team_input.team_name.value,team_input.team_address.value,parseInt(team_input.team_category.value), team_input.url_avatar.value)
       .then(async () => {return helloNEAR.getAllTeams();})
       .then(result => {
         setListTeam(result);
         console.log(listTeam);
      })
       .finally(() => {
         setUiPleaseWait(false);
       }); 
    }else{
      alert('Error, Equipo ya existe.');
      setUiPleaseWait(false);
    }

  }

  return (
    <>
      <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()}/>
      <main className={uiPleaseWait ? 'please-wait' : ''}>
        <h1>Liga Latino de Futbol</h1>
        <div className='row'>
        <div className='col-md-3'>&nbsp;</div>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-header'>
              <h4>Agrega un equipo:</h4>
            </div>
           <div className='card-body'>
           <form onSubmit={addTeam} className="add">
             <div className='col-md-12 mb-2'>
                <div className='row'>
                  <div className='col-md-6'>
                    Identificador Equipo
                  </div>
                <div className='col-md-6'>
                  <input 
                    className='form-control'
                      autoComplete="off"
                      id="team_index"
                      type="number"
                      min={1}
                      required
                    />
                </div>
              </div>
            </div>
            <div className='col-md-12 mb-2'>
                <div className='row'>
                  <div className='col-md-6'>
                    Nombre Equipo
                  </div>
                <div className='col-md-6'>
                  <input 
                    className='form-control'
                      autoComplete="off"     
                      id="team_name"
                      required
                    />
                </div>
              </div>
            </div>
            <div className='col-md-12 mb-2'>
                <div className='row'>
                  <div className='col-md-6'>
                    Ubicacion Equipo
                  </div>
                <div className='col-md-6'>
                  <input 
                    className='form-control'
                      autoComplete="off"     
                      id="team_address"
                      required
                    />
                </div>
              </div>
            </div>
            <div className='col-md-12 mb-2'>
            <div className='row'>
                  <div className='col-md-6'>
                    Url Icono
                  </div>
                  <div className='col-md-6'>
                <input 
                  className='form-control'
                    autoComplete="off"   
                    placeholder='Url de Ícono'  
                    id="url_avatar"
                    required
                  />
              </div>
              </div>
            </div>            
            <div className='col-md-12 mb-2'>
                <div className='row'>
                  <div className='col-md-6'>
                    Categoria
                  </div>
                <div className='col-md-6'>
                  <input 
                    className='form-control'
                      autoComplete="off"
                      id="team_category"
                      type="number"
                      min={1}
                      required
                    />
                </div>
              </div>
            </div>
            <div className='col-md-12'>
            <div className="d-grid gap-2">
              <button className='btn btn-lg btn-primary'>
              <div className="loader"></div>
                <span>Guardar</span>
                
              </button>
            </div>
            </div>
            </form>
            </div>
            </div>
            </div>
            </div>
        <div className='section'>
          <div className='container'>
            
        {
        <ol>
          <div className='row'>
          {listTeam.map((team,index) => (
              <>
              <div className='col-md-3'>
              
              <div className='card border-dark bg-light mb-3 team' >

                <div className='card-header' >
                    {team.uid} : {team.name}
                </div>
                <div className='card-body'>
                  <ul>
                  <li> <img src= {team.icon} className='avatar' w/> </li>
                    <li>De: {team.address}</li>
                    <li>Categoria: {team.category}</li>
                     
                  </ul>
                  <button className='btn btn-lg btn-success' 
                    onClick={() => {setTeam(index); selectTeam(team.name);}} >
                    Ver Equipo</button>
                </div>
              </div>
              </div>
              </>

          )) }
          </div>
        </ol>
        
        }
        
        </div>
        </div>
          
      </main>
      </>
  );
}