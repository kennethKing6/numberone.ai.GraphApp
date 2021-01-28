/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
/* eslint-disable linebreak-style */
export const PERIOD = 20;
/**
*This is used to model the time passed on the graph
*/
export class GraphTimer {
  constructor() {
    this.timer = 0;
   
  }

  beginTimer(){
  
     setInterval(()=>{
      this.timer =  this.timer + 1;
     },1000)
      // console.log("timer " + this.timer)

   
  }
  /**
 * This method is used to start the timer that keeps track
 *
 * This is used to determine the x axis of the graph
 */
  getTime() {
    return  this.timer;
  }

  restart(){
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<timer Restarted>>>>>>>>>>>>>>>>>>>>")
    this.timer = 0;
  }
  shouldRestart(){
    return this.timer == 20000;
  }
  
}
