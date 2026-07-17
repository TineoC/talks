<template>
  <div class="envs">
    <div class="env-col local">
      <div class="env-img-container">
        <img class="env-image" src="/environments/local.jpg" alt="Local environment" />
      </div>
      <div class="env-badge">01</div>
      <div class="env-label">Local</div>
      <div class="env-tag">Your laptop</div>
      <ul>
        <li>One machine</li>
        <li><code>docker run</code></li>
        <li>localhost only</li>
        <li>You are the ops team</li>
      </ul>
    </div>

    <div class="env-arrow" aria-hidden="true">→</div>

    <div class="env-col staging">
      <div class="env-img-container">
        <img class="env-image" src="/environments/staging.jpg" alt="Staging environment" />
      </div>
      <div class="env-badge">02</div>
      <div class="env-label">Staging</div>
      <div class="env-tag">Shared cluster</div>
      <ul>
        <li>Looks like prod</li>
        <li><code>kubectl apply</code></li>
        <li>Test traffic / CI</li>
        <li>Safe to break</li>
      </ul>
    </div>

    <div class="env-arrow" aria-hidden="true">→</div>

    <div class="env-col prod">
      <div class="env-img-container">
        <img class="env-image" src="/environments/prod.jpg" alt="Production environment" />
      </div>
      <div class="env-badge">03</div>
      <div class="env-label">Production</div>
      <div class="env-tag">Real users</div>
      <ul>
        <li>Replicas + probes</li>
        <li>Same YAML pattern</li>
        <li>RBAC · secrets · SLOs</li>
        <li>Blast radius matters</li>
      </ul>
    </div>
  </div>
</template>
