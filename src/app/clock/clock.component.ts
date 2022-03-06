import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
  
  
})





export class ClockComponent implements OnInit {
  

  ring1 = this.describeArc(20, 20, 15, 0, 270)

  res = document.createElementNS('http://www.w3.org/2000/svg','path');
  


  constructor(private sanitizer: DomSanitizer) { 
    
  }

  ngOnInit() {
      }


  Style () {
    return this.ring1
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
