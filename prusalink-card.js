class PrusaLinkCard extends HTMLElement {
  setConfig(config) {
    this.config = config;
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  render() {
    if (!this.config || !this._hass) return;

    const entity = this._hass.states[this.config.entity];
    const state = entity ? entity.state : 'Unavailable';
    const sensors = this.config.printer_sensors || {};

    let html = `
      <ha-card header="${this.config.title || 'PrusaLink Card'}">
        <style>
          .container {display: flex; justify-content: space-between; padding: 4px 0; font-size: 14px;}
          .sensor-label { color: var(--secondary-text-color); }
          .sensor-value { font-weight: bold; }
        </style>
        <div style="padding: 16px;">
          <p><strong>Entity:</strong> ${this.config.entity}</p>
          <p><strong>State:</strong> ${state}</p>
          <p><strong>Info:</strong> ${this.config.extra_info || 'No extra info'}</p>
        </div>   
    `;

    for (const [key, sensor] of Object.entries(sensors)) {
      const stateObj = this._hass.states[sensor.entity];
      const value = stateObj ? stateObj.state : 'Unavailable';
      const unit = sensor.unit || (stateObj?.attributes.unit_of_measurement || '');

      html += `
        <div class="container">
          <div class="sensor-label">${key.replace(/_/g, ' ')}</div>
          <div class="sensor-value">${value} ${unit}</div>
        </div>
      `;
    }

    html += `</div></ha-card>`;

    this.innerHTML = html;
  }


  getCardSize() {
    return 1;
  }
}

customElements.define('prusalink-card', PrusaLinkCard);
