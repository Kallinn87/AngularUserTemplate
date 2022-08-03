import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {
  manuals = [
    {
      title: 'SmartFlow',
      subTitle: 'User manual',
      image: 'sf_card.png',
      text: 'The main SmartFlow user manual.',
      url: 'https://firebasestorage.googleapis.com/v0/b/vaki-smartflow.appspot.com/o/help%2FSmartFlow%20Manual%20full.pdf?alt=media&token=db2ab8db-2850-4cde-a5a5-7dd201c59b32'
    },
    {
      title: 'Pump 6" & 8"',
      subTitle: 'Electrical Shemati New',
      image: '6pump.png',
      text: 'The newest electrical shematic for the 6" and 8" pumps.',
      url: 'https://firebasestorage.googleapis.com/v0/b/vaki-smartflow.appspot.com/o/help%2F6_8_inch_Schematic_a3.pdf?alt=media&token=a91a6791-7325-4e1e-97b5-7096622c5081'
    },
    {
      title: 'Pump 10"',
      subTitle: 'Electrical Shematic - RS485',
      image: '10pump.png',
      text: 'The newest electrical shematic for the 10" pump, based on RS485',
      url: 'https://firebasestorage.googleapis.com/v0/b/vaki-smartflow.appspot.com/o/help%2F10%20inch%20pump%20rs485%20shematick.pdf?alt=media&token=85c2f2c2-6697-433b-93b9-57f722bb2e06'
    },
    {
      title: 'Pump 10"',
      subTitle: 'Electrical Shematic - Digital',
      image: '10pump.png',
      text: 'Older electrical shematic for the 10" pump, based on digital control',
      url: 'https://firebasestorage.googleapis.com/v0/b/vaki-smartflow.appspot.com/o/help%2F10_inch_shematic_new_vision.pdf?alt=media&token=5bfba3b2-e8d4-4772-add3-7612456acd4f'
    },
    {
      title: 'Pumps',
      subTitle: 'Remote',
      image: 'remote.JPG',
      text: 'VAKIs new pumps remote. How to program.',
      url: 'https://firebasestorage.googleapis.com/v0/b/vaki-smartflow.appspot.com/o/help%2FVAKI%20Fish%20Pump%20Remote%20and%20SmartPump.pdf?alt=media&token=83100f2e-232b-4806-b482-ce033c7dca14'
    },
    {
      title: 'Pumps',
      subTitle: 'User Manual',
      image: '10pump.png',
      text: 'User manual for all Smart Pumps.',
      url: 'https://firebasestorage.googleapis.com/v0/b/vaki-smartflow.appspot.com/o/help%2FPump_SmartFlow_manual.pdf?alt=media&token=9e5a1b0b-b296-4684-9f58-84079531c3b3'
    }
  ];

  goToLink(url: string) {
    window.open(url, "_blank");
  }
}
