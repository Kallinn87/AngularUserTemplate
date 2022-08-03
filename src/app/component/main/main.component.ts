import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  projects = [
    {
      title: 'Some Project',
      subTitle: 'User manual',
      image: '../../assets/img/bg1.png',
      text: 'It is a long established fact that a reader will be distracted by the readable content of a page.',
    },
    {
      title: 'Some Project',
      subTitle: 'User manual',
      image: '../../assets/img/bg2.png',
      text: 'when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal.',
    },
    {
      title: 'Some Project',
      subTitle: 'User manual',
      image: '../../assets/img/bg1.png',
      text: 'distribution of letters, as opposed to using , making it look like readable English.',
    },
    {
      title: 'Some Project',
      subTitle: 'User manual',
      image: '../../assets/img/bg2.png',
      text: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.',
    },
    {
      title: 'Some Project',
      subTitle: 'User manual',
      image: '../../assets/img/bg2.png',
      text: 'and a search for will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)',
    },

    
  ];

  goToLink(url: string) {
    window.open(url, "_blank");
  }
}
