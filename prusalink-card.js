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
    const sensors = this.config.temperature || {};
    const fans = this.config.fan || {};

    let html = `
      <ha-card header="${this.config.title || 'PrusaLink Card'}">
        <style>
          .container {display: grid; grid-auto-columns: minmax(0, 1fr); grid-auto-flow: column;}
          .container-item {text-align: center}
          .sensor-label { color: var(--secondary-text-color); }
          .sensor-value { font-weight: bold; }
          .ready-icon { color: var(--primary-color); }
          .heating-icon { color: var(--warning-color); }
          .spinning-icon { color: var(--warning-color); }
          .stall-icon { color: var(--warning-color); }
        </style>
        <div style="padding: 16px;">
          <p><strong>Entity:</strong> ${this.config.entity}</p>
          <p><strong>State:</strong> ${state}</p>
          <p><strong>Info:</strong> ${this.config.extra_info || 'No extra info'}</p>
          <div class="container">
    `;
      const hotendEntity = this._hass.states[fans.hotend];
      const enclosureEntity = this._hass.states[fans.enclosure];  

      const hotend = hotendEntity ? parseFloat(hotendEntity.state).toFixed(0) : NaN;
      const enclosure = enclosureEntity ? parseFloat(enclosureEntity.state).toFixed(0) : NaN;

      const hotendisTurning = isFinite(hotend) && hotend > 1;
      const hotendfanicon = hotendisTurning ? 'mdi:fan' : 'mdi:fan-off';

      const enclosureisTurning = isFinite(enclosure) && enclosure > 1;
      const enclosurefanicon = enclosureisTurning ? 'mdi:fan' : 'mdi:fan-off';


      html += `
        <div class="container-item">
          <div class="sensor-label">Hotend</div>
          <ha-icon icon="${hotendfanicon}"></ha-icon>
          <div class="sensor-value">${hotend} rpm</div>
        </div>
        <div class="container-item">
          <div class="sensor-label">Enclosure</div>
          <ha-icon icon="${enclosurefanicon}"></ha-icon>
          <div class="sensor-value">${enclosure} rpm</div>
        </div>
      `;


    for (const [key, sensor] of Object.entries(sensors)) {
      const actualEntity = this._hass.states[sensor.actual];
      const targetEntity = this._hass.states[sensor.target];
      const decimals = sensor.decimals ?? 1;

      const actual = actualEntity ? parseFloat(actualEntity.state).toFixed(decimals) : NaN;
      const target = targetEntity ? parseFloat(targetEntity.state).toFixed(decimals) : NaN;

      const unit = actualEntity?.attributes.unit_of_measurement || '°C';
      
      const icon = sensor.icon || 'mdi:thermometer';

      const isHeating = isFinite(actual) && isFinite(target) && actual < target-2.0;
      const iconClass = isHeating ? 'heating-icon' : 'ready-icon';

      html += `
        <div class="container-item">
          <div class="sensor-label">${target} ${unit}</div>
          <ha-icon icon="${icon}" class="${iconClass}"></ha-icon>
          <div class="sensor-value">${actual} ${unit}</div>
        </div>
      `;
    }
    html += `</div></div> </div></ha-card>`;

    this.innerHTML = html;
  }


  getCardSize() {
    return 1;
  }
}

customElements.define('prusalink-card', PrusaLinkCard);
