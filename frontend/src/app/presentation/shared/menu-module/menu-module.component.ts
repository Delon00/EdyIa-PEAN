import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-module',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-module.component.html',
  styleUrl: './menu-module.component.scss'
})
export class MenuModuleComponent implements OnInit {
  isMenuModuleOpen: boolean = false;

  menuModule() {
    this.isMenuModuleOpen = !this.isMenuModuleOpen;
  }

  ngOnInit(): void {
  }
}
