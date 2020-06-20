import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-part1',
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.scss']
})
export class Part1Component implements OnInit {

  @Input('title') title: string;

  constructor() { }

  ngOnInit(): void {
  }

  /** เมื่อมีการคลิก */
  onClickBtn() {
    this.title = this.title == 'Part 1' ? 'Part 1 Click' : 'Part 1';
  }

}
