import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-Discrepancy_Protocol',
  templateUrl: './Discrepancy_Protocol.component.html',
  styleUrls: ['./Discrepancy_Protocol.component.scss']
})
export class Discrepancy_ProtocolComponent implements OnInit {
  access_token: string;
  LLCOOKIE: string;
  shopId: string;
  active = false;
  data = {
    dost: "25.05.2020",
    nr: "Z0798",
    imie: "test",
    obj: [
      {
        dot: "SAP 0079742026",
        id: 1,
        table_obj: [
          {
            id: "10945828_1",
            indeks: "10945828",
            nazwa: "Gliz papierowsowe Golden WIND",
            termin: "",
            seria: "dfdfdsf",
            iiosc: 20,
            powod: ["BRAKT", "NADWT", "USZKT", "TERMP", "BLEDS"],
            zwrot: false,
            active: false
          },
          {
            id: "10945828_2",
            indeks: "10945828",
            nazwa: "Wino Mlody Panicz 15% 1L",
            termin: "",
            seria: "",
            iiosc: 20,
            powod: ["BRAKT", "NADWT", "USZKT", "TERMP", "BLEDS"],
            zwrot: true,
            active: false
          },
          {
            id: "10945828_3",
            indeks: "10945828",
            nazwa: "Liker Slodka Wisnia 38% 1L",
            termin: "",
            seria: "",
            iiosc: 3,
            powod: ["BRAKT", "NADWT", "USZKT", "TERMP", "BLEDS"],
            zwrot: true,
            active: false
          }
        ],
        comment: [
          "Tutaj pojawi sie tekst uwagi wpisany przez FR Tutaj pojawi sie tekst uwagi wpisany przez FR  Tutaj pojawi sie tekst uwagi wpisany przez FR ",
          "Tutaj pojawi sie tekst uwagi wpisany przez FR Tutaj pojawi sie tekst uwagi wpisany przez FR  Tutaj pojawi sie tekst uwagi wpisany przez FR "
        ]
      },

      {
        dot: "SAP 007974233",
        id: 2,
        table_obj: [
          {
            id: "10945828_4",
            indeks: "10945838",
            nazwa: "Mleko 1L",
            termin: "",
            seria: "",
            iiosc: 10,
            powod: ["BRAKT", "NADWT", "USZKT", "TERMP", "BLEDS"],
            zwrot: true,
            active: false
          },
          {
            id: "10945828_5",
            indeks: "10945828",
            nazwa: "Mleko 1L",
            termin: "",
            seria: "",
            iiosc: 20,
            powod: ["BRAKT", "NADWT", "USZKT", "TERMP", "BLEDS"],
            zwrot: false,
            active: false
          }
        ],
        comment: []
      },
      {
        dot: "SAP 0079742055",
        id: 3,
        table_obj: [
          {
            id: "10945828_6",
            indeks: "10945828",
            nazwa: "Gliz papierowsowe Golden WIND",
            termin: "",
            seria: "",
            iiosc: 20,
            powod: ["BRAKT", "NADWT", "USZKT", "TERMP", "BLEDS"],
            zwrot: false,
            active: false
          },
          {
            id: "10945828_7",
            indeks: "10945828",
            nazwa: "Wino Mlody Panicz 15% 1L",
            termin: "",
            seria: "",
            iiosc: 20,
            powod: ["BRAKT", "NADWT", "USZKT", "TERMP", "BLEDS"],
            zwrot: true,
            active: false
          },
          {
            id: "10945828_8",
            indeks: "10945828",
            nazwa: "Liker Slodka Wisnia 38% 1L",
            termin: "",
            seria: "",
            iiosc: 3,
            powod: ["BRAKT", "NADWT", "USZKT", "TERMP", "BLEDS"],
            zwrot: true,
            active: false
          }
        ],
        comment: []
      }
    ]
  };

  constructor(private activatedRouter: ActivatedRoute,) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(
      (params) => {
        this.access_token = params["access_token"] ? params["access_token"] : sessionStorage.getItem("access_token");
        this.shopId = params["shopId"] ? params["shopId"] : sessionStorage.getItem("shopId");
        if (this.access_token) {
          this.LLCOOKIE = this.access_token;
          sessionStorage.setItem('access_token', this.access_token);
        }
        if (this.shopId) {
          sessionStorage.setItem('shopId', this.shopId);
        }
      }
    )
  }

  checkList(event, id) {
    let powod = event.target.value;
    this.data.obj.find(val => {
        val.table_obj.find(el => {
          if (el.id === id) {
            if (powod === "BRAKT") {
              el.zwrot = true;
              el.active = true;
            }else if (powod === "NADWT") {
              el.zwrot = false;
            }else if (powod === "TERMP") {
              el.zwrot = true;
            }else if (powod === "USZKT") {
              el.zwrot = true;
              el.active = true;
            }else if (powod === "BLEDS") {
              el.zwrot = null;
            }
          }
        })
    })

  }
}
