class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionTime: 25,
      isSession: true,
      breakTime: 5,
      isBreak: false,
      initialMinutes: 25,
      initialSeconds: 0,
      currentMinutes: '',
      currentSeconds: '',
      isRunning: false };



    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);

  }

  componentDidMount() {
    this.setState({
      currentMinutes: this.state.initialMinutes,
      currentSeconds: this.state.initialSeconds });

  }
  incrementSession() {
    const prevState = this.state.sessionTime;
    if (this.state.isRunning || prevState > 59) return;else
    if (this.state.isSession) {//increase the time left on clock
      this.setState({
        currentMinutes: prevState + 1,
        currentSeconds: 0 });

    }
    this.setState({
      sessionTime: prevState + 1 });

  }
  decrementSession() {
    const prevState = this.state.sessionTime;
    if (this.state.isRunning || prevState < 2) return;else
    if (this.state.isSession) {//decrease the time left on clock
      this.setState({
        currentMinutes: prevState - 1,
        currentSeconds: 0 });

    }
    this.setState({
      sessionTime: prevState - 1 });

  }
  incrementBreak() {
    const prevState = this.state.breakTime;
    if (this.state.isRunning || prevState > 59) return;else
    if (this.state.isBreak) {//increase the time left on clock
      this.setState({
        currentMinutes: prevState + 1,
        currentSeconds: 0 });

    }
    this.setState({
      breakTime: prevState + 1 });

  }
  decrementBreak() {
    const prevState = this.state.breakTime;
    if (this.state.isRunning || prevState < 2) return;else
    if (this.state.isBreak) {//decrease the time left on clock
      this.setState({
        currentMinutes: prevState - 1,
        currentSeconds: 0 });

    }
    this.setState({
      breakTime: prevState - 1 });

  }

  startTimer() {
    const isRunning = this.state.isRunning;
    const initialMinutes = this.state.initialMinutes;
    const initialSeconds = this.state.initialSeconds;
    const currentMinutes = this.state.currentMinutes;
    const currentSeconds = this.state.currentSeconds;
    if (isRunning == true) {
      clearInterval(this.countdown);
      this.setState({ isRunning: false });
    }
    if (isRunning == false) {
      this.setState({ isRunning: true });
      this.countdown = setInterval(function () {
        if (this.state.currentMinutes == 0 && this.state.currentSeconds == 0) {//IF CURRMINUTES == 0 && SECONDS==0 SWITCH TO OTHER TIMER
          if (this.state.isSession) {
            this.setState({
              isSession: false,
              isBreak: true,
              currentMinutes: this.state.breakTime,
              currentSeconds: 1 // 1 IN ORDER TO SHOW E.G. 05:00, NOT 04:59 RIGHT AWAY 
            });
          } else
          if (this.state.isBreak) {
            this.setState({
              isSession: true,
              isBreak: false,
              currentMinutes: this.state.sessionTime,
              currentSeconds: 1 });

          }
          let audio = document.getElementById('beep'); //PLAY ALARM SOUND
          console.log("SHOULD PLAY");
          audio.play();
        }
        if (this.state.currentSeconds == 0) {//DECREMENT MINUTES WHEN TIMER REACHES 0 SECONDS
          this.setState({
            currentMinutes: this.state.currentMinutes - 1,
            currentSeconds: 59 });

          return;
        }
        this.setState({ //DECREMENT SECONDS
          currentSeconds: this.state.currentSeconds - 1 });

      }.bind(this), 1000);
    }
  }

  resetTimer() {
    clearInterval(this.countdown);
    let audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0; // RESETTING ALARM 
    this.setState({
      isRunning: false,
      isBreak: false,
      isSession: true,
      currentMinutes: this.state.initialMinutes,
      currentSeconds: 0,
      initialSeconds: 0,
      sessionTime: 25,
      breakTime: 5 });

  }

  render() {
    return (
      React.createElement("div", { id: "parent" },
      React.createElement("div", { id: "top-container" },
      React.createElement("div", { className: "break-session-timers" },
      React.createElement("div", { id: "break-label" }, "BREAK"),
      React.createElement("div", { className: "timers-buttons-parent" },
      React.createElement("button", { id: "break-decrement", onClick: this.decrementBreak }, "-"),
      React.createElement("div", { id: "break-length" }, this.state.breakTime),
      React.createElement("button", { id: "break-increment", onClick: this.incrementBreak }, "+"))),


      React.createElement("div", { className: "break-session-timers" },
      React.createElement("div", { id: "session-label" }, "SESSION"),
      React.createElement("div", { className: "timers-buttons-parent" },
      React.createElement("button", { id: "session-decrement", onClick: this.decrementSession }, "-"),
      React.createElement("div", { id: "session-length" }, this.state.sessionTime),
      React.createElement("button", { id: "session-increment", onClick: this.incrementSession }, "+")))),



      React.createElement("div", { id: "bottom-container" },
      React.createElement("div", { id: "timer-label" }, this.state.isSession ? "SESSION" : "BREAK"),
      React.createElement("div", { id: "time-left" }, this.state.currentMinutes < 10 ? "0" + this.state.currentMinutes : this.state.currentMinutes, ":", this.state.currentSeconds < 10 ? "0" + this.state.currentSeconds : this.state.currentSeconds),
      React.createElement("div", { className: "timer-start-reset-buttons" },
      React.createElement("button", { id: "start_stop", onClick: this.startTimer }, this.state.isRunning ? "PAUSE" : "START"),
      React.createElement("button", { id: "reset", onClick: this.resetTimer }, "RESET"))),


      React.createElement("audio", { id: "beep", src: "https://goo.gl/65cBl1" },
      React.createElement("source", { id: "audioSrc", src: "https://goo.gl/65cBl1", type: "audio" }))));



  }}


ReactDOM.render(React.createElement(App, null), document.getElementById("root"));