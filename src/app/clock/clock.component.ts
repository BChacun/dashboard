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

  legend = ["","","","",""]

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

    let r : number = 0;

    var array = this.clockdata.value.split(",")/*JSON.parse(array_pipe);*/

    let size : number = array.length
    

    

    while (j<size) {
      if (array[j] != "n"){
        array[j]=Number(array[j])
        
      } else {
        j++;
        j++;
      }

      j++;
    }

    var curr_path = ""


    


    while (i < size) {
      
      if (array[i] == "n") {

        var path_current = document.querySelector('.data'+r); 
        
        if (path_current != null){
          
          
          path_current.setAttribute("d", curr_path); 
          path_current.setAttribute('stroke', curr_color);
          
          
        }


        var curr_path = "";
        
        r++;
        var curr_color = array[i+1];
        this.legend[r] += array[i+2];

        var legend_current = document.querySelector('.legend'+r); 
        if (legend_current != null){
          legend_current.setAttribute('style',"color:"+curr_color);  
        }
        



        i++;
        i++;
        i++;
        
      } else {

        curr_path += this.describeArc(20, 20, 19 - r*2, array[i], array[i+1]);


        
        i++;
        i++;
      }



      
    }

    
    var path_current = document.querySelector('.data'+r); 
        
      if (path_current != null){
          
          
          path_current.setAttribute("d", curr_path); 
          path_current.setAttribute('stroke', curr_color);
          
          
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
