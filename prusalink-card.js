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

    this.innerHTML = `
      <ha-card header="${this.config.title || 'PrusaLink Card'}">
        <div style="padding: 16px;">
          <p><strong>Entity:</strong> ${this.config.entity}</p>
          <p><strong>State:</strong> ${state}</p>
          <p><strong>Info:</strong> ${this.config.extra_info || 'No extra info'}</p>
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 1;
  }
}

customElements.define('prusalink-card', PrusaLinkCard);
