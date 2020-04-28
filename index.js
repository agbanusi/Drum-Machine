const banks=[[{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
{
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
{
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
{
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
{
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
{
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
{
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
{
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
{
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }],
  
  [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Chord-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' },
{
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Chord-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },
{
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Chord-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },
{
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Shaker',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' },
{
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' },
{
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' },
{
  keyCode: 90,
  keyTrigger: 'Z',
  id: 'Punchy-Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' },
{
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Side-Stick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },
{
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Snare',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' }]]

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state={
      bank:0,
      volume:0.5,
      display:'',
      color:'#BA68C8'
    }
    this.handleKeyPress=this.handleKeyPress.bind(this);
    this.clicked=this.clicked.bind(this);
    this.changeBank=this.changeBank.bind(this);
    this.volumeUp=this.volumeUp.bind(this);
    this.volumeDown=this.volumeDown.bind(this);
  }  
  componentDidMount(){
    document.addEventListener('keydown',this.handleKeyPress)
  }
  componentWillUnmount(){
    document.removeEventListener('keydown',this.handleKeyPress)
  }
  
  handleKeyPress(e){
    let x=this.props.sound[this.state.bank].map((i)=> i.id)
    let y =this.props.sound[this.state.bank].map((i)=> i.keyCode)
    let z = this.props.sound[this.state.bank].map((i)=> i.keyTrigger)
    let a = y.indexOf(e.keyCode)
    if(a>=0){
      let x = document.getElementById(z[a])
      x.volume=this.state.volume;
      x.play();
    }
    this.setState({
      display:x[a]
    })
  }
  
  clicked(event){
    let x = document.getElementById(event.target.name)
      x.volume=this.state.volume;
      x.play();
    this.setState({
      display:event.target.id
    })    
    }
    
  changeBank(){
    if(this.state.bank==0){
      this.setState({
      bank:1,
      color:'#4DB6AC'
      })
    }
    else{this.setState({
      bank:0,
      color:'#BA68C8'
      })}
    }
    volumeUp(){
      if(this.state.volume<0.9){
        this.setState({
        volume:this.state.volume+0.1
      })
      }
    }
    volumeDown(){
        if(this.state.volume>0.1){
          this.setState({
          volume:this.state.volume-0.1
          })
        }
      
    }
  render() {
      let d=this.props.sound[this.state.bank];
      return (
      <div className='start' id="drum-machine">
      <div className='box' id="display">
      <div className='buttons'>
      {d.map((i)=>
        <button id={i.id} key={i.keyCode} name={i.keyTrigger} className='drum-pad' onClick={this.clicked}><audio key={i.keyCode} className='clip' id={i.keyTrigger} src={i.url} ></audio>{i.keyTrigger}</button> 
        )}
       </div>
       <div className='controls'>
       <div className='vol'>
       <button onClick={this.volumeUp}>volume up</button>
       <button onClick={this.volumeDown}>volume down</button></div>
       <div className='text-board'><h5>{this.state.display}</h5></div>
       <button style={{backgroundColor:this.state.color}}className='change' onClick={this.changeBank}>Change Bank to {this.state.bank}</button>
       </div>
       </div>
      </div>
    );
    }
}

class App extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
  return(
    <Main sound={banks} />
  )}
}

ReactDOM.render(<App />, document.getElementById('root'));
