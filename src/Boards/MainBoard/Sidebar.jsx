import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div class="dashboard-sidebar">
      <div class="btn-close"></div>
      <div class="sidebar-logo">
        <img src="/assets/images/logo-svg.svg" alt="" />
      </div>
      <ul class="links sidebar-links">
        <li class="list-item">
          <img src="/assets/images/home-nav-icon.svg" alt="" />
          <a href="#" class="link">
            Dashboard
          </a>
        </li>
        <li class="list-item active">
          <img src="/assets/images/calender-nav-icon.svg" alt="" />
          <a href="#" class="link">
            Appointments
          </a>
        </li>
        <li class="list-item">
          <img src="/assets/images/availbility-nav-icon.svg" alt="" />
          <a href="#" class="link">
            Availability
          </a>
        </li>
        <li class="list-item">
          <img src="/assets/images/service-nav-icon.svg" alt="" />
          <a href="#" class="link">
            Services
          </a>
        </li>
        <li class="list-item">
          <img src="/assets/images/plan-nav-icon.svg" alt="" />
          <a href="#" class="link">
            Plans
          </a>
        </li>
        <li class="list-item">
          <img src="/assets/images/star-nav-icon.svg" alt="" />
          <a href="#" class="link">
            Reviews
          </a>
        </li>
        <li class="list-item">
          <img src="/assets/images/settings-sharp.svg" alt="" />
          <a href="#" class="link">
            Subscriptions
          </a>
        </li>
      </ul>
    </div>
  );
}
