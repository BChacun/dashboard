import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
  
  
})







export class ClockComponent implements OnInit {

  rings : string = '';

  ring1 = "" /*this.describeArc(20, 20, 15, 0, 270)*/

  res = document.createElementNS('http://www.w3.org/2000/svg','path');

  clockdata = new FormControl();
  


  constructor(private sanitizer: DomSanitizer) { 
    
  }

  ngOnInit() {
      }


  Style() {

    /*return this.rings*/
  }

  /*
  On veut de la data de la forme :
  - string

  - pair de 2 représentant les durées

  ex :

 0,270,n,30,90

  */
  onSubmit() {
    

    

    let i : number = 0;

    let j : number = 0;

    let r : number = 1;

    var array = this.clockdata.value.split(",")/*JSON.parse(array_pipe);*/

    let size : number = array.length

    for (j=0; j<size; j++) {
      if (array[j] != "n"){
        array[j]=Number(array[j])
      } 
    }

    

    while (i < size) {
      console.log('it')
      if (array[i] == "n") {
        r++;
        this.rings += " "
        i++;
      } else {
        this.rings += this.describeArc(20, 20, 19 - r*2, array[i], array[i+1])
        console.log(this.rings)

        i++;
        i++;
      }



      
    }

    var path = document.querySelector(".data"); 
    console.log('GRPS TEZRZERZRAZ')
    if (path != null){
      console.log(this.rings)
      path.setAttribute("d", this.rings); 
    }
    
    
  
  }



  polarToCartesian(centerX:number, centerY:number, radius:number, angleInDegrees:number) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }
  
  describeArc(x:number, y:number, radius:number, startAngle:number, endAngle:number){
  
      var start = this.polarToCartesian(x, y, radius, endAngle);
      var end = this.polarToCartesian(x, y, radius, startAngle);
  
      var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
      var d = [
          "M", start.x, start.y, 
          "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
      ].join(" ");
  
      return d;       
  }

}
