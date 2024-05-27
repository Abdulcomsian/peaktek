export default function NavBar() {
  return (
    <nav class="dashboard-nav">
      <div class="welcome-box">
        <button class="btn btn-icon-close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </button>
        <div>
          <h2 class="dash-nav-title">@yield('title')</h2>
          <p class="welcome-text">Welcome Dr. Meg Summer! 👋</p>
        </div>
      </div>
      <div class="profile-box">
        <div class="notification-box">
          <img src="/assets/images/BellRinging.svg" alt="" />
          <span class="num-notification">1</span>
        </div>
        <div class="avatar-box">
          <img
            src="/assets/images/woman-doctor-wearing-lab-coat-with-stethoscope-isolated (2) 2.jpg"
            alt=""
          />
        </div>
      </div>
    </nav>
  );
}
