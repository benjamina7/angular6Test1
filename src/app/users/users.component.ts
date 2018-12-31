import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],

  animations: [
    trigger( // define a trigger below...
      'listStaggerTrigger1', // <- whatever name we want for this trigger
      [
        transition( // define an animation below...
          '* <=> *', // <- when should this animation take place?, from ANY state to ANY state
          [
            query( // set a rule here below...
              ':enter', // <- on enter, do the following...
              [
                style( { opacity: 0, transform: 'translateY(-150px)' }), // start hiddena and move this element around
                stagger( // then effect every subsequent element...
                  '200ms',
                  animate(
                    '550ms ease-out',
                    style( { opacity: 1, transform: 'translateY(0px)' })
                  )
                )
              ],
              { optional: true } // <- since the query has a selector for finding the elements to work on, setting this 
                                        //   opional: true makes sure the code does not blow up if it does not find any 
                                        //   elements matching the selector in the dom
            ),
            query(
              ':leave, .leaveTest', // <- on leave, do the following...
              animate(
                '900ms', 
                style( { opacity: 0 })),
              { optional: true }
            )
          ]
        )
      ]
    )
  ]
})
export class UsersComponent implements OnInit {

  users$: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getUsers().subscribe(
      // (data) => {
      //   this.users$ = data;
      // }
      data => this.users$ = data
    );
  }

}
