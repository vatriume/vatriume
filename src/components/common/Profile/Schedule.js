import React from "react";

const ScheduleProfileService = () => {
  return (
    <div className="services">
      <h1>Services:</h1>
      <div className="schedule">
        <h2>Schedule</h2>
        <h4>Registrar credentials</h4>
        <form>
          <label htmlFor="registrar-email">E-mail:</label>
          <br />
          <input
            type="email"
            name="registrar-email"
            id="registrar-email"
            placeholder="example@nu.edu.kz"
          />
          <br />

          <label htmlFor="registrar-password">Password:</label>
          <br />
          <input
            type="password"
            name="registrar-password"
            id="registrar-password"
            placeholder="•••••••••••••"
          />
          <br />

          <input type="submit" name="registrar-submit" id="registrar-submit" />
        </form>
      </div>
    </div>
  );
};

export default ScheduleProfileService;
