
 /**
  *This is used to model the time passed on the graph
  * 
  */
 export  class GraphTimer  {
   
   constructor(){
    this.maxTimer = 60;
    this.minTimer = 0;
    this.timer = 0;
    this.horizontalTick = 8;
   }
  
/**
 * This method is used to start the timer that keeps track
 * 
 * This is used to determine the x axis of the graph
 */
  beginTimer(){
    setInterval(()=>{

      ++this.timer;

      if(this.timer + 1 === this.maxTimer){
        this.maxTimer *= 2;
        this.horizontalTick *= 2;
      }

    },1000)
  }
  /**
   * This method returns the current number of seconds 
   * that have passed since the app started
   * @return {timer} the current second since the app started
   */
  getCurrentSeconds(){
    
    return this.timer;
  }
  /**
   * This usually represents at what time the graph starts. 
   * It usually contains 0 seconds 
   */
  getMinTimer(){
   return this.minTimer;
  }
  getMaxTimer(){
    return this.maxTimer;
  }

  /**
   * This method is used to figure out how many points should 
   * be drawn on the x axis to represent the time passed.
   */
  getHorizontalTick(){
    return this.horizontalTick;
  }
  stopTimer(){
      clearInterval(this.beginTimer());
    }

}


