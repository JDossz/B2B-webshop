import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/main-dashboard",
    title: "Dashboard",
    rtlTitle: "لوحة القيادة",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/users",
    title: "Users",
    rtlTitle: "الرموز",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/database-tables",
    title: "Tables",
    rtlTitle: "خرائط",
    icon: "icon-puzzle-10",
    class: ""
  },
  {
    path: "/orders",
    title: "Orders",
    rtlTitle: "إخطارات",
    icon: "icon-align-center",
    class: ""
  },
  {
    path: "/statistics",
    title: "Statistics",
    rtlTitle: "ملف تعريفي للمستخدم",
    icon: "icon-atom",
    class: ""
  },
  {
    path: "/riports",
    title: "Riports",
    rtlTitle: "قائمة الجدول",
    icon: "icon-world",
    class: ""
  },
  {
    path: "/diary",
    title: "Diary",
    rtlTitle: "طباعة",
    icon: "icon-align-center",
    class: ""
  },
  // {
  //   path: "/rtl",
  //   title: "RTL Support",
  //   rtlTitle: "ار تي ال",
  //   icon: "icon-world",
  //   class: ""
  // }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
