import React from 'react';

export function SignInPrompt({greeting, onClick}) {
  return (
    <main>
      <h1>Liga Latino Futbol</h1>
      <p style={{ textAlign: 'center' }}>
        <button onClick={onClick} className='btn btn-primary'>Inicia Sesion con NEAR</button>
      </p>
    </main>
  );
}

export function SignOutButton({accountId, onClick}) {
  return (
    <button style={{float: 'right'},{ position: 'fixed' }} className='btn btn-secondary' onClick={onClick}>
      Cerrar Sesion {accountId}
    </button>
  );
}

export function Players({helloNEAR, team_uid, team_name, setTeam}) {
  // const [listTeam, setListTeam] = React.useState([]);
  const [listPlayers, setPlayersTeam] = React.useState([]); 
  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

 console.log(team_uid);
  // Get blockchian state once on component load
  React.useEffect(() => {

    helloNEAR.getAllPlayersFromTeam(parseInt(team_uid))
        .then(result => {
          setPlayersTeam(result);
          console.log(result);
       }, function(error) {
         console.log(error);
          alert('error team not found');
       }).catch(alert)
        .finally(() => {
          setUiPleaseWait(false);
        });

  }, []);


    function addPlayer(e) {
    e.preventDefault();
    setUiPleaseWait(true);
    const player_input  = e.target.elements;

    helloNEAR.addPlayerToTeam(player_input.player_firstname.value,player_input.player_lastname.value,parseInt(player_input.player_year.value),parseInt(player_input.player_price.value),parseInt(player_input.player_number.value),player_input.player_position.value,parseInt(team_uid))
      .then(async () => {return helloNEAR.getAllPlayersFromTeam(parseInt(team_uid));})
      .then(result => {
        setPlayersTeam(result);
        console.log(listPlayers);
     })
      .finally(() => {
        setUiPleaseWait(false);
      }); 
  }

  return (
    <>
      <main className={uiPleaseWait ? 'please-wait' : ''}>
        <h1>Jugadores </h1>
        <div className='row'>
        <div className='col-md-3'>&nbsp;</div>
        <div className='col-md-6'>
          <button className='btn btn-secondary' onClick={() => setTeam()}>Regresar a Equipos</button>
          <div className='card'>
            <div className='card-header'>
              <h1>{team_name}</h1>
              <h4>Agrega un jugador:</h4>
            </div>
           <div className='card-body'>
           <form onSubmit={addPlayer} className="add">
             <div className='col-md-12 mb-2'>
                <div className='row'>
                  <div className='col-md-6'>
                    Primer Nombre
                  </div>
                <div className='col-md-6'>
                  <input 
                    className='form-control'
                      autoComplete="off"
                      id="player_firstname"
                      required
                    />
                </div>
              </div>
            </div>
            <div className='col-md-12 mb-2'>
                <div className='row'>
                  <div className='col-md-6'>
                    Apellido
                  </div>
                <div className='col-md-6'>
                  <input 
                    className='form-control'
                      autoComplete="off"     
                      id="player_lastname"
                      required
                    />
                </div>
              </div>
            </div>
            <div className='col-md-12 mb-2'>
                <div className='row'>
                  <div className='col-md-6'>
                    Año Nacimiento
                  </div>
                <div className='col-md-6'>
                  <input 
                    className='form-control'
                      autoComplete="off"     
                      id="player_year"
                      type="number"
                      min={1900}
                      max={2010}
                      required
                    />
                </div>
              </div>
            </div>
            <div className='col-md-12 mb-2'>
                <div className='row'>
                  <div className='col-md-6'>
                    Precio
                  </div>
                <div className='col-md-6'>
                  <input 
                    className='form-control'
                      autoComplete="off"
                      id="player_price"
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
                    Numero Jugador
                  </div>
                <div className='col-md-6'>
                  <input 
                    className='form-control'
                      autoComplete="off"
                      id="player_number"
                      type="number"
                      min={1}
                      max={99}
                      required
                    />
                </div>
              </div>
            </div>
            <div className='col-md-12 mb-2'>
                <div className='row'>
                  <div className='col-md-6'>
                    Posicion
                  </div>
                <div className='col-md-6'>
                  <input 
                    className='form-control'
                      autoComplete="off"
                      id="player_position"
                      required
                    />
                </div>
              </div>
            </div>
            <div className='col-md-12 mb-2'>
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
          {listPlayers.map((player) => (
              <>
              <div className='col-md-3' >
              <div className='card'>
                <div className='card-header'>
                    {player.first_name} {player.last_name}
                </div>
                <div className='card-body'>
                  <ul>
                    <li>Numero: {player.number}</li>
                    <li>Posicion: {player.position}</li>
                    <li>Precio: {player.price}</li>
                    <li>Año: {player.year}</li>
                  </ul>
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


export function EducationalText() {
  return (
    <>
     
    </>
  );
}
